import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
// 1. IMPORTAR EL LOGO
import ViPrintLogo from '../assets/logo vip.png'; 

const AppNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* 2. USAR EL LOGO EN EL BRAND */}
        <Navbar.Brand>
            <img
                src={ViPrintLogo}
                alt="ViPrint Publicidad Logo"
                height="30" // Define la altura (puedes ajustarla)
                className="d-inline-block align-top me-2" // d-inline-block y espacio a la derecha
            />
            Checador Admin
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            <LinkContainer to="/">
              <Nav.Link>🏠 Dashboard</Nav.Link>
            </LinkContainer>
            
            <LinkContainer to="/empleados">
              <Nav.Link>👥 Gestión de Empleados</Nav.Link>
            </LinkContainer>
            
            <LinkContainer to="/checadas">
              <Nav.Link>⏱️ Historial de Checadas</Nav.Link>
            </LinkContainer>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// Recuerda renombrar la exportación para evitar conflictos si usaste AppNavbar en App.js
export default AppNavbar;