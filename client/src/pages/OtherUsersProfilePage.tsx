import {
  Card,
  Carousel,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import "../styles/ProfilePage.css";
import useFetch from "../hooks/useFetch";
import { Data, FetchedData } from "../types/dataTypes";
import { useParams } from "react-router-dom";

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

function OtherUsersProfileProfilePage() {
  const { id } = useParams();

  const url = `http://localhost:9876/api/users/${id}`;
  const { data, loading } = useFetch(url);
  console.log("data from other user:>> ", data);

  if (loading) {
    return (
      <div className="d-flex justify-content-center ">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      {/* user profile header image container */}
      <div>
        <div className="d-grid align-items-top justify-content-center">
          <Row>
            <Col sm={12}>
              <Image
                style={{ width: "80vw", height: "50vh" }}
                src={(data as unknown as Data).imagePlaceholder}
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
                className="profile-image " //user image rounded
                style={{ height: "35vh", width: "35vh" }}
                src={(data as unknown as Data).avatar}
                roundedCircle
              />
              {/* <Button
                className="add-image-button badge rounded-circle"
                variant="secondary"
                //onChange={(e) => uploadImage(e)}
              >
                <MdAddAPhoto size={40} />
              </Button> */}

              <div className="d-flex justify-content-center">
                <h2>{(data as unknown as Data).username}</h2>
              </div>
            </Col>
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
                  <ListGroup.Item>
                    Member since {(data as unknown as Data).createdAt}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Member of BMW oldtimer club CRO
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* only cards posted by user */}
      <div className="background pt-3">
        {(data as unknown as ProfileTypes).posts &&
          (data as unknown as ProfileTypes).posts.map((post) => {
            return (
              <Container className="pb-3 ">
                <Row className="d-flex justify-content-center">
                  <Col className="col-xl-6">
                    <Card>
                      {/* <Card.Img variant="top" src={data.cardImage} /> */}
                      <Carousel fade>
                        {(post as unknown as ProfileData).cardImage &&
                          (post as unknown as ProfileData).cardImage.map(
                            (image) => {
                              return (
                                <Carousel.Item interval={9999999}>
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

export default OtherUsersProfileProfilePage;
