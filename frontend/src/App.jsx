// /src/App.jsx
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importamos los componentes de react-router-dom
import Navbar from './components/Navbar';
import Home from './components/Home';
import Contacto from './components/Contacto';
import Login from './components/Login';
import Register from './components/Register';
import Blog from './components/Blog';
import GoogleLogin from './components/GoogleLogin';

import Footer from './components/footer';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        {/* Definimos las rutas dentro de <Routes> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> 
          <Route path="/googleLogin" element={<GoogleLogin />} /> 
          <Route path="/blog" element={<Blog />} /> 
          <Route path="/footer" element={<Footer />} /> 
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
