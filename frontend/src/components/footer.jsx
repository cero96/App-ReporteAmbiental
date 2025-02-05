import React from 'react';

const Footer = () => {
  return (
    <footer className=" text-black py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h4>Sobre Nosotros</h4>
            <p>Comprometidos con la sostenibilidad ambiental</p>
          </div>
          
          <div className="col-md-4 mb-3">
            <h4>Contacto</h4>
            <p>Email: info@reporteambiental.com</p>
            <p>Teléfono: +593 987654321</p>
          </div>
          
          <div className="col-md-4 mb-3">
            <h4>Enlaces Rápidos</h4>
            <ul className="list-unstyled">
              <li><a href="/politica-privacidad" className="text-white">Política de Privacidad</a></li>
              <li><a href="/terminos" className="text-white">Términos de Servicio</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom text-center mt-4">
          <p className="mb-0">&copy; 2025 App-Reporte-Ambiental. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
