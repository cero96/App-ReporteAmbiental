// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    const data = { email, password };

    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Error desconocido");
      }

      const result = await response.json();

      if (result.token) {
        localStorage.setItem("token", result.token);
        alert("¡Inicio de sesión exitoso!");
        navigate("/home");
      } else {
        throw new Error("Token no recibido. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      setErrorMessage(error.message || "Ocurrió un error.");
    }
  };

  return (
    <div className="tab-content">
      <div className="tab-pane fade show active">
        <form onSubmit={handleSubmit}>
          <div className="text-center mb-3">
            <p>Sign in with:</p>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-facebook-f"></i>
            </button>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-google"></i>
            </button>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-twitter"></i>
            </button>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-github"></i>
            </button>
          </div>

          <p className="text-center">or:</p>

          <div className="mb-4">
            <input
              type="email"
              className="form-control"
              placeholder="Email or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="row mb-4">
            <div className="col-md-6 d-flex justify-content-center">
              <input
                className="form-check-input"
                type="checkbox"
                id="loginCheck"
                defaultChecked
              />
              <label className="form-check-label ms-2" htmlFor="loginCheck">
                {" "}
                Remember me{" "}
              </label>
            </div>
            <div className="col-md-6 d-flex justify-content-center">
              <a href="#!">Forgot password?</a>
            </div>
          </div>

          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          <button type="submit" className="btn btn-primary btn-block mb-4">
            Sign in
          </button>

          <div className="text-center">
            <p>
              Not a member? <a href="#!">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
