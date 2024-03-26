import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
import useFetch from "../hooks/useFetch";
import LikeButton from "../Components/LikeButton";
import CommentSection from "../Components/CommentSection";
import { useState } from "react";
import PostCardModal from "../Components/PostCardModal";

function Posts() {
  const url = "http://localhost:9876/api/posts/allposts"; //fetching all posts from db
  const { data, loading } = useFetch(url);

  // const [display, setDisplay] = useState("d-none");

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
                    <Carousel fade>
                      {post.cardImage.map((image) => {
                        return (
                          <Carousel.Item interval={9999999}>
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
                      <div className="d-flex justify-content-around border-bottom">
                        <Card.Text>Likes: {post.like}</Card.Text>

                        <Card.Text>Comments:</Card.Text>
                      </div>
                      <div className="d-flex justify-content-around">
                        <div>
                          <LikeButton //like buton component
                            likeButtonDisabled={post.likeButtonDisabled}
                          />
                        </div>
                        <PostCardModal props={post} />
                      </div>
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
