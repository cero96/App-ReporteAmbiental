// /src/components/Contacto.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Contacto = () => {
  return (
    <div>
      
      {/* Contenido de Contactos */}
      <div className="container my-5">
        <h2 className="text-center text-green">Contáctanos</h2>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <p className="text-center">
              Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos. Nuestro equipo estará encantado de ayudarte.
            </p>

            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="name" placeholder="Ingresa tu nombre" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo electrónico</label>
                <input type="email" className="form-control" id="email" placeholder="Ingresa tu correo electrónico" required />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Mensaje</label>
                <textarea className="form-control" id="message" rows="4" placeholder="Escribe tu mensaje" required></textarea>
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
