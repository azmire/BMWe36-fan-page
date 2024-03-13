import {
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

function UserProfileData() {
  const url = "http://localhost:9876/api/users/65f1b6fd6b25fbf48f8fa44f";
  const { data, loading } = useFetch(url);
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
                src="src/assets/e36-silhouette.jpeg"
                fluid
              />
            </Col>
          </Row>
        </div>

        {/* user profile body container */}
        <Container className="d-grid justify-content-center justify-content-md-start px-5">
          <Row>
            <Col>
              <Image
                className="profile-image" //user image rounded
                style={{ height: "35vh", width: "35vh" }}
                src="src/assets/e36-silhouette.jpeg"
                roundedCircle
              />
              <div className="d-flex justify-content-center">
                <h2>Anđelo Žmire</h2>
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
                  <ListGroup.Item>Member since March 2024.</ListGroup.Item>
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
                  <ModalComponent />
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
