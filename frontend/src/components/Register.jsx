// /src/components/Register.jsx
import React, { useState, useEffect } from 'react';

const Register = () => {
  // Estados para los valores del formulario y el mensaje de error
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Validar que los campos no estén vacíos
    if (!username || !email || !password) {
      setErrorMessage('Por favor, complete todos los campos');
      return;
    }

    // Validación adicional para el formato del correo electrónico
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Por favor, ingrese un correo electrónico válido');
      return;
    }

    // Validación para la longitud de la contraseña
    if (password.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    // Crear el objeto con los datos del formulario
    const data = { name: username, email, password };

    try {
      // Enviar la solicitud POST al servidor
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      // Si el registro es exitoso
      if (response.ok) {
        setErrorMessage(''); // Limpiar el mensaje de error
        alert('Registro exitoso!'); // Mostrar un mensaje de éxito
        window.location.href = '/login'; // Redirigir a la página de login
      } else {
        throw new Error(result.error || 'Error desconocido');
      }
    } catch (error) {
      setErrorMessage(error.message); // Mostrar el mensaje de error
    }
  };

  // Limpiar el mensaje de error cuando el usuario cambie los campos
  useEffect(() => {
    setErrorMessage('');
  }, [username, email, password]);

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4 text-success">Crear Cuenta</h2>
        <form id="registerForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Nombre de usuario</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Actualizar el estado de username
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Actualizar el estado de email
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
              onChange={(e) => setPassword(e.target.value)} // Actualizar el estado de password
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Registrar</button>
          {errorMessage && (
            <p id="error-message" className="text-danger mt-3">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
