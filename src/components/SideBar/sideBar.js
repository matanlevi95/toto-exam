import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SideBar() {
  const expand = false;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar expand={expand} className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" onClick={handleClose}>
            Clothing
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-${expand}`}
            onClick={handleShow}
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
            show={show} // <-- controlled
            onHide={handleClose} // <-- controlled
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/" onClick={handleClose}>
                  Home
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/clothing-selector"
                  onClick={handleClose}
                >
                  Clothing Selector
                </Nav.Link>
                <Nav.Link as={Link} to="/saved-clothing" onClick={handleClose}>
                  Saved Clothing
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
