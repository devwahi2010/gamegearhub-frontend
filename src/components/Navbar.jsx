// src/components/Navbar.jsx
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import '../styles/Navbar.css';

function AppNavbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard">
          <img src="/logo.png" alt="GameGearHub logo" className="navbar-logo me-2" />
          GameGearHub
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/explore">Explore</Nav.Link>
            <Nav.Link as={Link} to="/devices">My Devices</Nav.Link>
            <Nav.Link as={Link} to="/create-device">List Device</Nav.Link>
            <Nav.Link as={Link} to="/my-rentals">My Rentals</Nav.Link>
            <Nav.Link as={Link} to="/manage-requests">Manage Requests</Nav.Link>
            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
          </Nav>
          <Button variant="outline-light" size="sm" onClick={logout}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;

