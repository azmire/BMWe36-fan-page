import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import "../styles/ProfilePage.css";
import useFetch from "../hooks/useFetch";
import UserProfileData from "../Components/UserProfileData";

function Profile() {
  const url = "http://localhost:9876/api/posts/65e876004b4278bf07da6a29"; //fetching post for test only
  const { data, loading } = useFetch(url);

  if (loading) {
    return (
      <div className="d-flex justify-content-center ">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      <UserProfileData />
      {/* only cards posted by user */}
      <div className="background pt-3">
        <Container className="pb-3 ">
          <Row className="d-flex justify-content-center">
            <Col className="col-xl-6 pb-3">
              <Card>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>{data.description}</Card.Text>
                  <Card.Text>
                    <b>Production Year: </b>
                    {data.productionYear}
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-xl-6">
              <Card>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>{data.description}</Card.Text>
                  <Card.Text>
                    <b>Production Year: </b>
                    {data.productionYear}
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-xl-6">
              <Card>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>{data.description}</Card.Text>
                  <Card.Text>
                    <b>Production Year: </b>
                    {data.productionYear}
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Profile;
