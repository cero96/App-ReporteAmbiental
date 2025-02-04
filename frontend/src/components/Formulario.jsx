// frontend/src/components/Formulario.jsx
import { useState } from 'react';
import axios from 'axios';
import { Button, Card, Form } from 'react-bootstrap';

export function Formulario({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      });

      const { token, user } = response.data;

      // Almacenar el token y el usuario en el estado
      localStorage.setItem('token', token);
      setUser(user.name);

      // Redirigir a la página de inicio (Home)
      window.location.href = '/home';
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
