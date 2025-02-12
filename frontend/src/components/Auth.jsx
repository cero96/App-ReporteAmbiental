// /src/components/Auth.jsx

import React, { useState } from 'react';
import Login from './Login';  // Asegúrate de que esto apunta al componente Login correctamente
import Register from './Register';  // Asegúrate de que esto apunta al componente Register correctamente
import GoogleLogin from './GoogleLogin'; // Este es el componente de login con Google

const Auth = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="d-flex justify-content-between w-100">
        <div style={{ width: '45%' }}>
          <Login />
        </div>
        <div style={{ width: '45%' }}>
          <Register />
        </div>
      </div>
    </div>
  );
};

export default Auth;

