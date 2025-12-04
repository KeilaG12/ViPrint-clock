// /frontend/admin-panel/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px 20px', background: '#333', color: 'white' }}>
      <Link to="/" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>
        🏠 Dashboard
      </Link>
      <Link to="/empleados" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>
        👥 Gestión de Empleados
      </Link>
      <Link to="/checadas" style={{ color: 'white', textDecoration: 'none' }}>
        ⏱️ Historial de Checadas
      </Link>
    </nav>
  );
};

export default Navbar;