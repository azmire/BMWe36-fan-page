import {
  Card,
  Carousel,
  Col,
  Container,
  Image,
  Nav,
  Row,
  Spinner,
} from "react-bootstrap";
import LikeCommentSection from "../Components/LikeCommentSection";
import { Key, useEffect, useState } from "react";
import ProtectedRoute from "../Components/ProtectedRoute";
import { FetchedData } from "../types/dataTypes";
import { Link } from "react-router-dom";

function Posts() {
  const url = "http://localhost:9876/api/posts/allposts"; //fetching all posts from db
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FetchedData[] | []>([]);
  const userId = localStorage.getItem("userId");
  const [fetchTrigger, setFetchTrigger] = useState(true);

  const retriggerFetch = () => {
    setFetchTrigger(true);
  };

  const getData = async (urlToFetch: string) => {
    setLoading(true);

    const requestOptions = {
      method: "GET",
      redirect: "follow" as RequestRedirect,
    };
    try {
      const response = await fetch(urlToFetch, requestOptions);
      if (response.ok) {
        const result = (await response.json()) as FetchedData[];
        setData(result);
      }
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
    } finally {
      setLoading(false);
      setFetchTrigger(false);
    }
  };
  useEffect(() => {
    if (fetchTrigger) {
      getData(url);
    }
  }, [fetchTrigger]);

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
        data.map((post, i) => {
          console.log("post :>> ", post);
          return (
            <Container key={post._id} className="py-3">
              <Row>
                <Col className="d-flex justify-content-center">
                  <Card className="w-50 align-items-center ">
                    <Nav.Link
                      as={Link}
                      to={
                        post.author._id == userId
                          ? `/myProfile/${userId}`
                          : `/otherUserProfile/${post.author._id}`
                      }
                      className="ms-3 me-auto p-2 border-bottom"
                    >
                      <Image
                        //user image rounded
                        style={{ height: "3vh", width: "3vh", border: "5px" }}
                        src={post.author.avatar}
                        roundedCircle
                      />
                      <b>{post.author.username}</b>
                    </Nav.Link>

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
                      <ProtectedRoute>
                        <div>
                          <LikeCommentSection //like button component
                            liked={post.liked}
                            postId={post._id}
                            numOfComments={post.comments.length}
                            usersWhoLiked={post.usersWhoLiked}
                            props={post}
                            triggerFetch={retriggerFetch}
                          />
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
