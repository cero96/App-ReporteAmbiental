import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // Importar axios

const Contacto = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/comments', {
        name,
        email,
        message,
      });
      setSuccess('Comentario enviado con éxito');
      setError('');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError('Error al enviar el comentario');
      setSuccess('');
    }
  };

  return (
    <div>
      <div className="container my-5">
        <h2 className="text-center text-green">Deja tus Comentarios</h2>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <p className="text-center">
              De esta manera con tu opinion mejoramos cada vez mas
            </p>

            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Ingresa tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Ingresa tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Mensaje</label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="4"
                  placeholder="Escribe tu mensaje"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-success w-100">Enviar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
