// import React from "react";
// import { Navbar, Nav, Container, Button } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import useAuthUser from "react-auth-kit/hooks/useAuthUser";
// import useSignOut from "react-auth-kit/hooks/useSignOut";
// function NavigationBar() {
//   const navigate = useNavigate();
//   const auth = useAuthUser();
//   const signOut = useSignOut();
//   const handleLogout = () => {
//     signOut();
//     navigate("/logIn");
//   };

//   return (
//     <Navbar bg="dark" data-bs-theme="dark">
//       <Container>
//         <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
//         <Nav className="me-auto">
//           <Nav.Link as={Link} to="/howItWork">How it work</Nav.Link>
//           <Nav.Link as={Link} to="/manual">Manuals</Nav.Link>
//           <Nav.Link as={Link} to="/videos">videos</Nav.Link>
//         </Nav>
//         {
//           !auth? (""):(<Button variant="outline-light" onClick={handleLogout}>
//             Logout
//           </Button>)
//         }
        
//       </Container>
//     </Navbar>
//   );
// }

// export default NavigationBar;

"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import useSignOut from "react-auth-kit/hooks/useSignOut"
import styles from "./Header.module.css"

function NavigationBar() {
  const navigate = useNavigate()
  const auth = useAuthUser()
  const signOut = useSignOut()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    signOut()
    navigate("/logIn")
  }

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.brand}>
          <span className={styles.logoIcon}>●</span>
          <span className={styles.logoText}>Home</span>
        </Link>

        <button
          className={`${styles.menuToggle} ${isMenuOpen ? styles.active : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`${styles.navLinks} ${isMenuOpen ? styles.active : ""}`}>
         
          <Link to="/manual" className={styles.navLink} onClick={handleNavClick}>
            Manuals
          </Link>
          <Link to="/videos" className={styles.navLink} onClick={handleNavClick}>
            Videos
          </Link>
           <Link to="/howItWork" className={styles.navLink} onClick={handleNavClick}>
         About
          </Link>
        </div>

        <div className={styles.authSection}>
          {auth ? (
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  )
}

export default NavigationBar
