import {
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import ModalComponent from "./CreateCardModal";
import useFetch from "../hooks/useFetch";
import { UserData } from "../types/dataTypes";
import { MdAddAPhoto } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function UserProfileData() {
  const { userId } = useContext(AuthContext);
  console.log("userId :>> ", userId);

  const url = `http://localhost:9876/api/users/${userId}`; //logged in user profile data
  let { data } = useFetch(url) as unknown as UserData;
  const { logout } = useContext(AuthContext);
  console.log("data :>> ", data);

  return (
    <div>
      {/* user profile header image container */}
      <div>
        <div className="d-grid align-items-top justify-content-center">
          <Row>
            <Col sm={12}>
              <Image
                style={{ width: "80vw", height: "50vh" }}
                src={data.imagePlaceholder}
                fluid
              />
            </Col>
          </Row>
          <Button className="add-cover-photo">
            <MdAddAPhoto size={30} />
            <div className="ps-2">Change image</div>
          </Button>
        </div>

        {/* user profile body container */}
        <Container className="d-grid justify-content-center justify-content-md-start px-5">
          <Row>
            <Col>
              <Image
                className="profile-image " //user image rounded
                style={{ height: "35vh", width: "35vh" }}
                src={data.avatar}
                roundedCircle
              />
              <Button
                variant="secondary"
                className="add-image-button rounded-circle"
              >
                <MdAddAPhoto size={40} />
              </Button>
              <div className="d-flex justify-content-center">
                <h2>{data.username}</h2>
              </div>
            </Col>
          </Row>

          {/* edit profile navbar */}
          <Row>
            <Navbar bg="light" data-bs-theme="light">
              <Container>
                <Nav className="me-auto fw-bold">
                  <Nav.Link>My posts</Nav.Link>
                  <Nav.Link>Features</Nav.Link>
                  <Nav.Link>Edit</Nav.Link>
                </Nav>
              </Container>
            </Navbar>
            <Button onClick={logout}>LogOut</Button>
          </Row>
        </Container>
      </div>

      <div className="background pt-3">
        <Container>
          <Row>
            <Col xs lg="4">
              <Card className="h-100">
                <Card.Header>
                  <b>User info</b>
                </Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>From: Sinj, Croatia</ListGroup.Item>
                  <ListGroup.Item>Member since {data.createdAt}</ListGroup.Item>
                  <ListGroup.Item>
                    Member of BMW oldtimer club CRO
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col lg="8">
              <Card>
                <Card.Header as="h5">
                  <b>Add a new card</b>
                </Card.Header>
                <Card.Body>
                  <Card.Title>
                    Click the button below to add a new card with your car info
                  </Card.Title>
                  <Card.Text>
                    You have just finished Your new prject? Share it with us!
                    Upload some photos and give us short description about Your
                    car.
                  </Card.Text>
                  <ModalComponent placeholder={data.imagePlaceholder} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default UserProfileData;
