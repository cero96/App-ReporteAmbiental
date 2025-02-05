// /src/components/Login.jsx
import React, { useState } from 'react';
import GoogleLogin from './GoogleLogin'; // Importar el componente GoogleLogin

const Login = () => {
  // Estado para almacenar los valores del formulario y el mensaje de error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto (recarga de página)

    // Validar si los campos están vacíos
    if (!email || !password) {
      setErrorMessage('Por favor, complete todos los campos');
      return;
    }

    // Configurar los datos a enviar al backend
    const data = { email, password };

    try {
      // Hacer la solicitud POST al backend
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      // Si el login es exitoso
      if (response.ok) {
        setErrorMessage(''); // Limpiar mensaje de error
        localStorage.setItem('token', result.token); // Guardar el token en localStorage
        alert('Login exitoso!'); // Notificar al usuario

        // Redirigir al usuario a la página principal
        window.location.href = '/'; // Redirige a la página principal
      } else {
        throw new Error(result.error || 'Error desconocido');
      }
    } catch (error) {
      setErrorMessage(error.message); // Mostrar el mensaje de error
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Iniciar sesión</h2>
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Actualiza el estado de email
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
              onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de password
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Iniciar sesión</button>
          <GoogleLogin /> 
          {errorMessage && (
          <p id="error-message" className="text-danger mt-3">{errorMessage}</p>
        )}
        </form>      
      </div>
    </div>
  );
};

export default Login;
