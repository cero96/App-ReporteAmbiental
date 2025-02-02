import React from 'react';

export function Home({ user, setUser }) {
  const handleLogout = () => {
    setUser(null); // Vaciamos el estado de user al hacer logout
  };

  return (
    <div className="home-container">
      <div className="container text-center mt-5">
        <h1 className="display-3 title" id="mainTitle">
          ¡Hola, {user}!
        </h1>
        <p className="lead">Revisa el reporte de tus electrodomésticos.</p>
        <p className="lead">
          "Te ofrecemos una comparación con equipos amigables con el medio
          ambiente"
        </p>

        <div className="mt-4">
          <button onClick={handleLogout} className="btn btn-lg btn-primary">
            Salir
          </button>
        </div>
      </div>
    </div>
  );
}
