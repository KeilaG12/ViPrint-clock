// /frontend/admin-panel/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import EmpleadosPage from './pages/EmpleadosPage';
import ChecadasPage from './pages/ChecadasPage';

// Componente simple para el Dashboard/Inicio
const DashboardPage = () => (
  <div style={{ padding: '20px' }}>
    <h1>Sistema de Checador ViPrint 📊</h1>
    <p>Bienvenido al Panel de Administración. Usa la navegación superior para gestionar empleados y revisar el historial de checadas.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/empleados" element={<EmpleadosPage />} />
        <Route path="/checadas" element={<ChecadasPage />} />
      </Routes>
    </Router>
  );
}

export default App;