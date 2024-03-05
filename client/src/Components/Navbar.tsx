import { Container, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { MdAccountCircle } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";

function NavbarComponent() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to={"/"}>
            e36
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/posts"}>
              Posts
            </Nav.Link>
            <Nav.Link as={Link} to={"/profile"}>
              Profile
            </Nav.Link>
            <Nav.Link as={Link} to={"/parts"}>
              Parts
            </Nav.Link>
            <Nav.Link as={Link} to={"/login"}>
              <MdAccountCircle />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default NavbarComponent;
