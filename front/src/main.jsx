// arquivo de entrada do React no frontend
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './style.css';

// renderiza o componente App dentro do elemento HTML com id 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
