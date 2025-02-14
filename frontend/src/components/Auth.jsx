import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="container d-flex flex-column align-items-center min-vh-100">
      <div className="btn-group w-100 mb-4 d-flex">
        <button
          className={`btn ${
            activeTab === "login" ? "btn-primary" : "btn-outline-primary"
          } w-50`}
          onClick={() => setActiveTab("login")}
        >
          Login
        </button>
        <button
          className={`btn ${
            activeTab === "register" ? "btn-primary" : "btn-outline-primary"
          } w-50`}
          onClick={() => setActiveTab("register")}
        >
          Register
        </button>
      </div>

      <div className="w-100 d-flex justify-content-center">
        {activeTab === "login" ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default Auth;
