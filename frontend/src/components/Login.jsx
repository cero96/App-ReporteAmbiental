import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage('Por favor, complete todos los campos');
      return;
    }

    const data = { email, password };

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setErrorMessage('');
        localStorage.setItem('token', result.token); // Guarda el token JWT
        alert('Login exitoso!');
        window.location.href = '/'; // Redirige a la página principal
      } else {
        throw new Error(result.error || 'Error desconocido');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    setErrorMessage('');
  }, [email, password]);

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4 text-success">Iniciar Sesión</h2>
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Ingresar</button>
          {errorMessage && (
            <p id="error-message" className="text-danger mt-3">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
