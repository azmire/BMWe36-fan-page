import { Container, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { MdAccountCircle } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";

function NavbarComponent() {
  return (
    <>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to={"/"}>
            e36
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-between"
            id="basic-navbar-nav"
          >
            <Nav>
              <Nav.Link as={Link} to={"/posts"}>
                Posts
              </Nav.Link>
              <Nav.Link as={Link} to={"/profile"}>
                Profile
              </Nav.Link>
              <Nav.Link as={Link} to={"/parts"}>
                Parts
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={Link} to={"/login"}>
                <MdAccountCircle size={30} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default NavbarComponent;
