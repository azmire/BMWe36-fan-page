import { useContext } from "react";
import { Container, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function NavbarComponent() {
  const { user, logout } = useContext(AuthContext);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  let link = "";
  let navIcon = <MdAccountCircle title="Login" size={30} />;
  if (!user) {
    link = "/login";
  }
  if (user) {
    navIcon = (
      <MdLogout
        onClick={() => {
          logout(), navigate("/");
        }}
        title="Logout"
        size={30}
      />
    );
  }
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
              <Nav.Link as={Link} to={`/myProfile/${userId}`}>
                MyProfile
              </Nav.Link>
              <Nav.Link as={Link} to={"/parts"}>
                Parts
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={Link} to={link}>
                {navIcon}
                {/* <MdAccountCircle size={30} /> */}
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
