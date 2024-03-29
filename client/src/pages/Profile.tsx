import { Card, Carousel, Col, Container, Row, Spinner } from "react-bootstrap";
import "../styles/ProfilePage.css";
import useFetch from "../hooks/useFetch";
import UserProfileData from "../Components/UserProfileData";
import { Data } from "../types/dataTypes";

declare type ProfileTypes = {
  description: string;
  cardImage: string[];
};

function Profile() {
  const url = "http://localhost:9876/api/posts/65f45124d9f9cdc131d14583"; //fetching post for test only
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
        <Container className="pb-3 ">
          <Row className="d-flex justify-content-center">
            <Col className="col-xl-6">
              <Card>
                {/* <Card.Img variant="top" src={data.cardImage} /> */}
                <Carousel fade>
                  {(data as unknown as ProfileTypes).cardImage &&
                    (data as unknown as ProfileTypes).cardImage.map((image) => {
                      return (
                        <Carousel.Item interval={9999999}>
                          <Card.Img src={image} />
                          <Carousel.Caption></Carousel.Caption>
                        </Carousel.Item>
                      );
                    })}
                </Carousel>
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>{(data as unknown as Data).description}</Card.Text>
                  <Card.Text>
                    <b>Car model: </b>
                    {(data as unknown as Data).carModel}
                  </Card.Text>
                  <Card.Text>
                    <b>Production Year: </b>
                    {(data as unknown as Data).productionYear}
                  </Card.Text>
                  <Card.Text>
                    <b>Engine code: </b>
                    {(data as unknown as Data).engineCode}
                  </Card.Text>
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
