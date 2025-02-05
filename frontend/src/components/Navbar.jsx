// /src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link desde react-router-dom

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" id="navbar">
      <div className="container">
        <a className="navbar-brand" href="#">EcoCheck</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link> {/* Usamos Link en lugar de <a> */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link> {/* Usamos Link en lugar de <a> */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Registro</Link> {/* Usamos Link en lugar de <a> */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">Comentarios</Link> {/* Usamos Link en lugar de <a> */}
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
