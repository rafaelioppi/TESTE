import { useEffect, useState } from 'react';

const API_BASE = '/api/persons';

function App() {
  const [people, setPeople] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);

  function loadPeople() {
    fetch(API_BASE)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPeople(data);
        } else {
          setPeople([]);
          setError('Resposta inesperada do servidor.');
        }
      })
      .catch(() => setError('Não foi possível carregar os dados.'));
  }

  useEffect(() => {
    loadPeople();
  }, []);

  function resetForm() {
    setName('');
    setEmail('');
    setEditingId(null);
  }

  function handleEdit(person) {
    setName(person.name);
    setEmail(person.email);
    setEditingId(person.id);
    setError('');
  }

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

  function handleCancel() {
    resetForm();
  }

  return (
    <div className="app-container">
      <h1>Cadastro de Pessoas</h1>

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
