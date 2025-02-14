import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { TypeAnimation } from "react-type-animation";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div
      className="min-vh-100 bg-transparent"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: "1",
        overflowY: "auto",
      }}
    >
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="container-fluid">
          <div className="row g-0">
            {/* Columna de la animación y texto */}
            <div className="col-md-6 d-flex align-items-center justify-content-center p-5">
              <div className="text-blue text-center text-md-start">
                <h1 className="mb-4 display-4 fw-bold text-primary">
                  Descubre tu impacto, <br />
                  <TypeAnimation
                    sequence={[
                      "Mide tu huella de carbono",
                      1000,
                      "Compara el consumo de tus artículos",
                      1000,
                      "Recibe reportes detallados",
                      1000,
                      "Y contribuye a un planeta más verde",
                      1000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    style={{ color: "#93BEF1" }}
                  />
                </h1>

                <p className="lead mb-4 fw-bold">
                  Bienvenido a EcoCheck, una plataforma que te ayuda a medir y
                  reducir tu huella de carbono.
                </p>

                <p className="mb-4">
                  EcoCheck te permite conocer el impacto ambiental de tus
                  electrodomésticos, generar reportes detallados y comparar el
                  consumo de energía. Contribuye a un planeta más verde y toma
                  decisiones informadas para un futuro sostenible.
                </p>
              </div>
            </div>

            {/* Columna del formulario de autenticación */}
            <div className="col-md-6 d-flex align-items-center justify-content-center p-5">
              <div
                className="card shadow-lg p-4 bg-light"
                style={{ width: "100%", maxWidth: "500px" }}
              >
                <div className="card-body">
                  {/* Botones de Login y Register */}
                  <div className="d-grid gap-2 d-md-flex justify-content-md-center mb-4">
                    <button
                      className={`btn ${
                        activeTab === "login"
                          ? "btn-primary"
                          : "btn-outline-primary"
                      } flex-grow-1 me-md-2`}
                      onClick={() => setActiveTab("login")}
                    >
                      Login
                    </button>
                    <button
                      className={`btn ${
                        activeTab === "register"
                          ? "btn-primary"
                          : "btn-outline-primary"
                      } flex-grow-1 ms-md-2`}
                      onClick={() => setActiveTab("register")}
                    >
                      Register
                    </button>
                  </div>

                  {/* Contenido dinámico (Login o Register) */}
                  <div className="mt-3">
                    {activeTab === "login" ? <Login /> : <Register />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
