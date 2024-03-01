import { Col, Container, Image, Row } from "react-bootstrap";
import "../styles/ProfilePage.css";

function Profile() {
  return (
    <>
      {/* user profile header image container*/}
      <Container className="d-grid align-items-top justify-content-center">
        <Row>
          <Col sm={12}>
            <Image
              style={{ width: "80vw", height: "50vh" }}
              src="src/assets/e36-silhouette.jpeg"
              fluid
            />
          </Col>
        </Row>
      </Container>

      {/* user profile container */}
      <Container className="d-grid justify-content-center justify-content-md-start px-5 ">
        <Row>
          <Col className=" ms-5">
            <Image
              className="profile-image"
              style={{ height: "40vh", width: "40vh" }}
              src="src/assets/e36-silhouette.jpeg"
              roundedCircle
            />
          </Col>
        </Row>
        <Row>
          <Col className="mx-5 px-5 px-md-4 mt-3">
            <h2>Anđelo Žmire</h2>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile;
