// importa hooks do React para controlar estado e efeitos colaterais
import { useEffect, useState } from 'react';

// endpoint base usado pelo frontend para falar com o backend via proxy
const API_BASE = '/api/persons';

function App() {
  // estado que guarda as pessoas recebidas do backend
  const [people, setPeople] = useState([]);
  // estado dos campos do formulário de nome e email
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // estado de mensagem de erro para mostrar ao usuário
  const [error, setError] = useState('');
  // estado que indica se estamos editando uma pessoa existente
  const [editingId, setEditingId] = useState(null);

  // carrega a lista de pessoas do backend
  function loadPeople() {
    fetch(API_BASE)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // se veio uma lista, atualiza o estado
          setPeople(data);
        } else {
          // se a resposta não for uma lista, trata como erro
          setPeople([]);
          setError('Resposta inesperada do servidor.');
        }
      })
      .catch(() => setError('Não foi possível carregar os dados.'));
  }

  // executa loadPeople apenas uma vez quando o componente é montado
  useEffect(() => {
    loadPeople();
  }, []);

  // limpa os campos do formulário e sai do modo de edição
  function resetForm() {
    setName('');
    setEmail('');
    setEditingId(null);
  }

  // usa os dados da pessoa para preencher o formulário e ativar edição
  function handleEdit(person) {
    setName(person.name);
    setEmail(person.email);
    setEditingId(person.id);
    setError('');
  }

  // envia o formulário para criar ou atualizar uma pessoa
  function handleSubmit(event) {
    event.preventDefault();
    setError('');

    const payload = {
      name: name.trim(),
      email: email.trim(),
    };

    if (!payload.name || !payload.email) {
      setError('Preencha nome e email.');
      return;
    }

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_BASE}/${editingId}` : API_BASE;

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao salvar pessoa');
        }
        return response.json();
      })
      .then(() => {
        resetForm();
        loadPeople();
      })
      .catch(() => setError('Não foi possível salvar a pessoa.'));
  }

  // exclui uma pessoa pelo id
  function handleDelete(id) {
    fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 204) {
          if (editingId === id) {
            resetForm();
          }
          loadPeople();
        } else {
          throw new Error('Erro ao deletar');
        }
      })
      .catch(() => setError('Não foi possível excluir a pessoa.'));
  }

  // cancela o modo de edição e limpa o formulário
  function handleCancel() {
    resetForm();
  }

  return (
    <div className="app-container">
      <h1>Cadastro de Pessoas</h1>

      {/* formulário para criar ou editar pessoa */}
      <form onSubmit={handleSubmit} className="person-form">
        <div className="form-row">
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Nome"
          />
        </div>

        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
          />
        </div>

        <div className="form-actions">
          <button type="submit">{editingId ? 'Atualizar' : 'Salvar'}</button>
          {editingId && (
            <button type="button" onClick={handleCancel} className="cancel-button">
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* exibe mensagem de erro quando necessário */}
      {error && <div className="error">{error}</div>}

      <section>
        <h2>Lista de Pessoas</h2>
        {people.length === 0 ? (
          <p>Nenhuma pessoa cadastrada.</p>
        ) : (
          <ul className="person-list">
            {people.map((person) => (
              <li key={person.id} className="person-item">
                <div>
                  <strong>{person.name}</strong>
                  <p>{person.email}</p>
                </div>
                <div className="item-actions">
                  <button type="button" onClick={() => handleEdit(person)}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(person.id)} className="delete-button">
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
