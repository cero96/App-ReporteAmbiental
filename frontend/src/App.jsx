// /src/App.jsx
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import Home from './components/Home';
import Contacto from './components/Contacto';
import Blog from './components/Blog';
import Auth from './components/Auth';
import Footer from './components/footer';

function App() {
  return (
    <Router>
      <Navbar /> {/* Componente de navegación */}
      <Routes>
        <Route path="/" element={<Auth />} /> {/* Ruta principal para el login y registro */}
        <Route path="/home" element={<Home />} /> {/* Ruta de inicio */}
        <Route path="/contacto" element={<Contacto />} /> {/* Ruta de contacto */}
        <Route path="/blog" element={<Blog />} /> {/* Ruta del blog */}
      </Routes>
      <Footer /> {/* Componente de pie de página */}
    </Router>
  );
}

export default App;
