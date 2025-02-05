// frontend/src/components/Formulario.jsx

import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Formulario({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Usamos el hook useNavigate para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(import.meta.env.VITE_URL + '/login', {
        email,
        password
      });

      const { token, user } = response.data;

      // Almacenamos el token y el usuario en el estado
      localStorage.setItem('token', token);
      onLogin(user);  // Llamamos a la función onLogin pasando el usuario completo

      // Redirigimos al home después de un login exitoso
      navigate('/home');
    } catch (error) {
      console.error('Error al iniciar sesión', error);
    }
  };

  return (
    <section className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg" style={{ width: '300px' }}>
        <h2 className="text-center mb-4">Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button type="submit" variant="primary">Ingresar</Button>
          </div>
        </Form>
      </Card>
    </section>
  );
}
