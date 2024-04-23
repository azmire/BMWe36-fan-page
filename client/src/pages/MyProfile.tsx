import { Card, Carousel, Col, Container, Row, Spinner } from "react-bootstrap";
import "../styles/ProfilePage.css";
import UserProfileData from "../Components/UserProfileData";

import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { ProfileData, ProfileTypes } from "../types/dataTypes";

function MyProfile() {
  const params = useParams();
  const id = params.id;

  const url = `http://localhost:9876/api/users/${id}`;

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
      <UserProfileData /> {/* header image, profile image */}
      {/* only cards posted by user */}
      <div className="background pt-3">
        {(data as ProfileTypes).posts &&
          (data as ProfileTypes).posts.map((post: ProfileData, i) => {
            return (
              <Container key={i} className="pb-3 ">
                <Row className="d-flex justify-content-center">
                  <Col className="col-xl-6">
                    <Card>
                      <Carousel fade>
                        {post.cardImage &&
                          post.cardImage.map((image, i) => {
                            return (
                              <Carousel.Item key={i} interval={9999999}>
                                <Card.Img src={image} />
                                <Carousel.Caption></Carousel.Caption>
                              </Carousel.Item>
                            );
                          })}
                      </Carousel>
                      <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>{post.description}</Card.Text>
                        <Card.Text>
                          <b>Car model: </b>
                          {post.carModel}
                        </Card.Text>
                        <Card.Text>
                          <b>Production Year: </b>
                          {post.productionYear}
                        </Card.Text>
                        <Card.Text>
                          <b>Engine code: </b>
                          {post.engineCode}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
            );
          })}
      </div>
    </>
  );
}

export default MyProfile;
