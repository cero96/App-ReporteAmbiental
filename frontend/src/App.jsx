// frontend/src/App.jsx

import { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Formulario } from './components/Formulario';
import { Home } from './components/Home';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(import.meta.env.VITE_URL + '/login', { email, password });
      setUser(response.data.user);  // Guardamos el usuario en el estado
      localStorage.setItem('token', response.data.token);  // Guardamos el token en localStorage
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Formulario onLogin={handleLogin} />} />
        <Route path="/home" element={<Home user={user} setUser={setUser} />} />
      </Routes>
    </Router>
  );
};

export default App;
