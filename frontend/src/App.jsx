// App.jsx
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar'; // Asegúrate de que la ruta sea correcta
import Home from './components/Home';     // Asegúrate de que la ruta sea correcta

function App() {
  return (
    <div>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
