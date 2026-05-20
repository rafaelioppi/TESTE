import { useState } from 'react';

function App() {
  const [nome, setNome] = useState('');

  return (
    <div>
      <h1>Olá, {nome || "visitante"}!</h1>
      <input 
        value={nome} 
        onChange={(e) => setNome(e.target.value)} 
        placeholder="Digite seu nome"
      />
    </div>
  );
}

export default App;
