import {
  Card,
  Carousel,
  Col,
  Container,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import useFetch from "../hooks/useFetch";
import LikeButton from "../Components/LikeButton";
import { Key } from "react";
import PostCardModal from "../Components/PostCardModal";
import ProtectedRoute from "../Components/ProtectedRoute";

function Posts() {
  const url = "http://localhost:9876/api/posts/allposts"; //fetching all posts from db
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
      {data &&
        data.map((post) => {
          console.log("post :>> ", post);

          return (
            <Container key={post._id} className="py-3">
              <Row>
                <Col className="d-flex justify-content-center">
                  <Card className="w-50 align-items-center ">
                    <div className="ms-3 me-auto p-2 border-bottom">
                      <Image
                        //user image rounded
                        style={{ height: "3vh", width: "3vh", border: "5px" }}
                        src={post.author.avatar}
                        roundedCircle
                      />
                      <b>{post.author.username}</b>
                    </div>
                    <Carousel fade>
                      {post.cardImage.map((image) => {
                        return (
                          <Carousel.Item
                            key={image as unknown as Key}
                            interval={9999999}
                          >
                            <Card.Img src={image as unknown as string} />
                            <Carousel.Caption></Carousel.Caption>
                          </Carousel.Item>
                        );
                      })}
                    </Carousel>

                    <Card.Body className="pb-1 w-100">
                      <Card.Title>{post.caption}</Card.Title>
                      <Card.Text>{post.description}</Card.Text>
                      <Card.Text>
                        <b>Car model:</b> {post.carModel}
                      </Card.Text>
                      <Card.Text>
                        <b>Production year:</b> {post.productionYear}
                      </Card.Text>
                      <Card.Text className="border-bottom mb-1">
                        <b>Engine Type:</b> {post.engineCode}
                      </Card.Text>
                      <div className="d-flex justify-content-around border-bottom  ">
                        <Card.Text className="mb-1">
                          Likes: {post.like}
                        </Card.Text>

                        <Card.Text>Comments:</Card.Text>
                      </div>
                      <ProtectedRoute>
                        <div className="d-flex justify-content-around">
                          <div>
                            <LikeButton //like buton component
                              likeButtonDisabled={post.likeButtonDisabled}
                            />
                          </div>
                          <PostCardModal props={post} />
                        </div>
                      </ProtectedRoute>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          );
        })}
    </>
  );
}

export default Posts;
