import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HouseDoorFill, PeopleFill, MegaphoneFill } from 'react-bootstrap-icons';

function NavigationBar() {
  return (
    <Navbar bg="light" variant="light" className="navbar-custom d-none d-lg-block">
      <Container>
        <Navbar.Brand as={Link} to="/"><strong>every pay</strong></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="icon-text"><HouseDoorFill /> 매출 기록</Nav.Link>
            <Nav.Link as={Link} to="/customers" className="icon-text"><PeopleFill /> 고객 관리</Nav.Link>
            <Nav.Link as={Link} to="/marketing" className="icon-text"><MegaphoneFill /> 마케팅</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;