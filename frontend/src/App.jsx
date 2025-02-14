import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Contacto from './components/Contacto';
import Auth from './components/Auth';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import ApplianceDashboard from './components/ApplianceDashboard';  // Importar el nuevo componente
import ApplianceForm from './components/ApplianceForm';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Auth />} />

        {/* Rutas protegidas */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Navbar />
              <Home />
              <Footer />
            </PrivateRoute>
          }
        />

        <Route
          path="/contacto"
          element={
            <PrivateRoute>
              <Navbar />
              <Contacto />
              <Footer />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"  // Nueva ruta protegida para el panel de electrodomésticos
          element={
            <PrivateRoute>
              <Navbar />
              <ApplianceDashboard />
              <Footer />
            </PrivateRoute>
          }
        />

        <Route
          path="/form"  // Nueva ruta protegida para el formulario de electrodomésticos
          element={
            <PrivateRoute>
              <Navbar />
              <ApplianceForm />
              <Footer />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
