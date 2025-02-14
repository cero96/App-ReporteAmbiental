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

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Auth />} />
        
        {/* Rutas protegidas */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/contacto"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <Contacto />
                <Footer />
              </>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
