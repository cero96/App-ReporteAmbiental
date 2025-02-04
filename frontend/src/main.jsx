import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Aquí es donde importas tu componente principal

// Aquí se monta la aplicación en el DOM dentro del contenedor con id 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
