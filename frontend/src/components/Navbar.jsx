import React from "react";
import { Link } from "react-router-dom"; // Importamos Link desde react-router-dom

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" id="navbar">
      <div className="container">
        <div className="container d-flex justify-content-between align-items-center">
          {/* Logo y nombre de la aplicación */}
          <Link to="/" className="text-decoration-none">
            <h1 className="text-4xl fw-bold text-primary">
              Eco<span className="text-secondary">Check</span>
            </h1>
          </Link>
        </div>{" "}
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
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/calculadora">
                Comentarios
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/form">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
