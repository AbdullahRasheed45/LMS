"use client";

import { Avatar } from "antd";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";

// Define a custom class for the Navbar
const navbarStyle = {
  backgroundColor: "#cfa2e8", // Change this to your desired greyish black color
  color: "white", // Optionally, change text color to white for better visibility
};

export default function Header() {
  return (
    <Navbar
      collapseOnSelect
      expand="xl"
      className="container-fluid"
      style={navbarStyle}
    >
      <Container fluid>
        <Navbar.Brand
          href="/"
          className="main-logotext-color fs-bold fs-3 d-flex align-items-center gap-2"
        >
          <Avatar src="/images/logo.png" /> Tech Vibes
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              className="fs-6 text-dark text-decoration-none me-4"
              href="#features"
            >
              Home
            </Nav.Link>
            <Nav.Link
              className="fs-6 text-dark text-decoration-none me-4"
              href="/courses"
            >
              Courses
            </Nav.Link>
            <Nav.Link
              className="fs-6 text-dark text-decoration-none me-4"
              href="#pricing"
            >
              Tutorials
            </Nav.Link>
            {/* <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
            <Nav.Link
              className="fs-6 text-dark text-decoration-none me-4"
              href="/signup"
            >
              Sign Up
            </Nav.Link>
            <Nav.Link
              className="fs-6 text-dark text-decoration-none me-4"
              eventKey={2}
              href="/login"
            >
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
