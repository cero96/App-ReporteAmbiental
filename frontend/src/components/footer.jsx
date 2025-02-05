const Footer = () => {
    return (
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Sobre Nosotros</h4>
            <p>Comprometidos con la sostenibilidad ambiental</p>
          </div>
          
          <div className="footer-section">
            <h4>Contacto</h4>
            <p>Email: info@reporteambiental.com</p>
            <p>Teléfono: +593 987654321</p>
          </div>
          
          <div className="footer-section">
            <h4>Enlaces Rápidos</h4>
            <ul>
              <li><a href="/politica-privacidad">Política de Privacidad</a></li>
              <li><a href="/terminos">Términos de Servicio</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 App-Reporte-Ambiental. Todos los derechos reservados.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;