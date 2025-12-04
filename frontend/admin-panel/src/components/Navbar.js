import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
// Asegúrate de que esta ruta sea correcta para tu logo
import ViPrintLogo from '../assets/logo vip.png'; 

const AppNavbar = () => {
  return (
    // Clase 'custom-navbar' para el degradado y el tamaño
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar p-3"> 
      <Container>
        
        {/* Marca de la Navbar con el Logo */}
        <Navbar.Brand>
            <img
                src={ViPrintLogo}
                alt="ViPrint Publicidad Logo"
                height="30" 
                className="d-inline-block align-top me-2" 
            />
            Checador Admin
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            {/* Los Nav.Link necesitan la clase 'flip-link' para el efecto */}
            
            <LinkContainer to="/">
              {/* Envolvemos el texto con un <span> para poder hacer el flip */}
              <Nav.Link className="flip-link"><span>🏠 Dashboard</span></Nav.Link>
            </LinkContainer>
            
            <LinkContainer to="/empleados">
              <Nav.Link className="flip-link"><span>👥 Gestión de Empleados</span></Nav.Link>
            </LinkContainer>
            
            <LinkContainer to="/checadas">
              <Nav.Link className="flip-link"><span>⏱️ Historial de Checadas</span></Nav.Link>
            </LinkContainer>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;