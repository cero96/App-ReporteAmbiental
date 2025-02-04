// frontend/src/components/Home.jsx
import { Button } from 'react-bootstrap';

export function Home({ user, setUser }) {
  const handleLogout = () => {
    setUser(null); // Limpiar el estado del usuario
    localStorage.removeItem('token'); // Limpiar el token de localStorage
  };

  return (
    <div className="home-container">
      <div className="container text-center mt-5">
        <h1>¡Hola, {user ? user.name : 'Invitado'}!</h1>
        <p>Bienvenido a tu dashboard.</p>
        <Button variant="danger" onClick={handleLogout}>Cerrar sesión</Button>
      </div>
    </div>
  );
}
