import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import useFetch from "../hooks/useFetch";
import { BiComment } from "react-icons/bi";
import LikeButton from "../Components/LikeButton";
import DislikeButton from "../Components/DislikeButton";

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
            <Container className="py-3" key={post._id}>
              <Row>
                <Col className="d-flex justify-content-center">
                  <Card className="w-50 align-items-center ">
                    <Card.Img variant="top" src={post.cardImage} />
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
                      <div className="d-flex justify-content-around">
                        <LikeButton />
                        <DislikeButton />
                        <Button
                          className="text-secondary text-decoration-none align-middle"
                          variant="link"
                        >
                          <BiComment />
                          Comment
                        </Button>
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
