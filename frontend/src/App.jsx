// /src/App.jsx
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importamos los componentes de react-router-dom
import Navbar from './components/Navbar';
import Home from './components/Home';
import Contacto from './components/Contacto';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        {/* Definimos las rutas dentro de <Routes> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
