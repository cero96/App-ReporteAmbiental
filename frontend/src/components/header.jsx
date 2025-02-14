import { Link } from "react-router-dom"; // Importa el Link correcto de react-router-dom

const Header = () => {
  return (
    <header className="fixed-top bg-transparent py-3 w-100">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo y nombre de la aplicación */}
        <Link to="/" className="text-decoration-none">
          <h1 className="text-4xl fw-bold text-primary">
            Eco<span className="text-secondary">Check</span>
          </h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
