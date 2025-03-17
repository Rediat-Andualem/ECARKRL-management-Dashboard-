import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
function NavigationBar() {
  const navigate = useNavigate();
  const auth = useAuthUser();
  const signOut = useSignOut();
  const handleLogout = () => {
    signOut();
    navigate("/logIn");
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">How it work</Nav.Link>
          <Nav.Link as={Link} to="/features">Manuals</Nav.Link>
          <Nav.Link as={Link} to="/pricing">videos</Nav.Link>
        </Nav>
        {
          !auth? (""):(<Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>)
        }
        
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
