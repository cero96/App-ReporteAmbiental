// App.jsx
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar'; 
import Home from './components/Home';     
import Contacto from './components/contacto';

function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <Contacto />
    </div>
  );
}

export default App;
