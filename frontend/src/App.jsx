import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Auth from "./components/Auth";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import ApplianceDashboard from "./components/ApplianceDashboard";
import ApplianceForm from "./components/ApplianceForm";
import "@fortawesome/fontawesome-free/css/all.min.css";
import CoverParticles from "./components/CoverParticles";
import Header from "./components/header";
import CarbonFootprintCalculator from "./components/CarbonFootprintCalculator";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route
          path="/"
          element={
            <>
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              >
                <CoverParticles />
              </div>
              <Header />

              <div style={{ position: "relative", zIndex: 1 }}>
                <Auth />
              </div>
            </>
          }
        />

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
          path="/dashboard"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <ApplianceDashboard />
                <Footer />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/calculadora"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <CarbonFootprintCalculator />
                <Footer />
              </>
            </PrivateRoute>
          }
        />

        <Route
          path="/form"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <ApplianceForm />
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
