import { Card, Carousel, Col, Container, Row, Spinner } from "react-bootstrap";
import useFetch from "../hooks/useFetch";
import LikeButton from "../Components/LikeButton";
import CommentButton from "../Components/CommentButton";
import CommentSection from "../Components/CommentSection";
import { useState } from "react";

function Posts() {
  const url = "http://localhost:9876/api/posts/allposts"; //fetching all posts from db
  const { data, loading } = useFetch(url);

  //const [display, setDisplay] = useState("d-none"); //sends value to comment section
  const [display, setDisplay] = useState("d-none");
  const [clickedPostId, setClickedPostId] = useState<string | null>(""); //which comment button is being clicked

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
                        <LikeButton
                          likeButtonDisabled={post.likeButtonDisabled}
                        />

                        <CommentButton
                          setDisplay={setDisplay}
                          id={post._id} //sending value to each post comment button
                          setClickedPostId={setClickedPostId} //returning value from comment btn clicked
                          display={display}
                        />
                      </div>
                      <div>
                        <CommentSection
                          display={display} //receieving value from comment button
                          comments={post.comments} //array of fetched comments
                          clickedPostId={clickedPostId} //receieving clickedPostId from comment btn
                          id={post._id}
                        />
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
