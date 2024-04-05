import { Card, Carousel, Col, Container, Row, Spinner } from "react-bootstrap";
import "../styles/ProfilePage.css";
import UserProfileData from "../Components/UserProfileData";
import { Data } from "../types/dataTypes";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

declare type ProfileTypes = {
  posts: ProfileData[];
};
declare type ProfileData = {
  avatar: string;
  imagePlaceholder: string;
  createdAt: string;
  username: string;
  _id: string;
  cardImage: string[];
  description: string;
  carModel: string;
  productionYear: string;
  engineCode: string;
};

function MyProfile() {
  const params = useParams();
  const id = params.id;

  const url = `http://localhost:9876/api/users/${id}`;

  console.log("url :>> ", url);
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
        {(data as unknown as ProfileTypes).posts &&
          (data as unknown as ProfileTypes).posts.map((post, i) => {
            return (
              <Container key={i} className="pb-3 ">
                <Row className="d-flex justify-content-center">
                  <Col className="col-xl-6">
                    <Card>
                      {/* <Card.Img variant="top" src={data.cardImage} /> */}
                      <Carousel fade>
                        {(post as unknown as ProfileData).cardImage &&
                          (post as unknown as ProfileData).cardImage.map(
                            (image, i) => {
                              return (
                                <Carousel.Item key={i} interval={9999999}>
                                  <Card.Img src={image} />
                                  <Carousel.Caption></Carousel.Caption>
                                </Carousel.Item>
                              );
                            }
                          )}
                      </Carousel>
                      <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                          {(post as unknown as Data).description}
                        </Card.Text>
                        <Card.Text>
                          <b>Car model: </b>
                          {(post as unknown as Data).carModel}
                        </Card.Text>
                        <Card.Text>
                          <b>Production Year: </b>
                          {(post as unknown as Data).productionYear}
                        </Card.Text>
                        <Card.Text>
                          <b>Engine code: </b>
                          {(post as unknown as Data).engineCode}
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
