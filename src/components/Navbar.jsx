import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function AppNavbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard" className="fw-bold text-warning">
          🎮 GameGearHub
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/explore">Explore</Nav.Link>
            <Nav.Link as={Link} to="/devices">My Devices</Nav.Link>
            <Nav.Link as={Link} to="/create-device">List Device</Nav.Link>
            <Nav.Link as={Link} to="/my-rentals">My Rentals</Nav.Link>
            <Nav.Link as={Link} to="/manage-requests">Manage Requests</Nav.Link>
          </Nav>
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/profile" className="me-3">Profile</Nav.Link>
            <Button variant="outline-light" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;

