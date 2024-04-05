import { Key, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BiComment } from "react-icons/bi";
import { FetchedData } from "../types/dataTypes";
import { Card, Carousel, Col, Container, Image, Row } from "react-bootstrap";
import CommentSection from "./CommentSection";
import { useNavigate } from "react-router-dom";

declare type PostCardModalTypes = {
  props: FetchedData;
  isLiked: boolean;
  triggerFetch: () => void;
};

function PostCardModal({ props, isLiked, triggerFetch }: PostCardModalTypes) {
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState("d-block");

  const handleClose = () => {
    setShow(false);
    triggerFetch();
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        className="text-secondary text-decoration-none align-middle"
        variant="link"
        onClick={handleShow}
      >
        <BiComment />
        Comments
      </Button>

      <Modal className="modal-lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <div>
            <Image
              //user image rounded
              style={{ height: "3vh", width: "3vh", border: "5px" }}
              src={props.author.avatar}
              roundedCircle
            />
            <b>{props.author.username}</b>
          </div>
        </Modal.Header>

        <Container key={props._id} className="py-3">
          <Row>
            <Col className="d-flex justify-content-center">
              <Card className="w-100 align-items-center ">
                <Carousel fade>
                  {props.cardImage.map((image) => {
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
                  <Card.Title>{props.caption}</Card.Title>
                  <Card.Text>{props.description}</Card.Text>
                  <Card.Text>
                    <b>Car model:</b> {props.carModel}
                  </Card.Text>
                  <Card.Text>
                    <b>Production year:</b> {props.productionYear}
                  </Card.Text>
                  <Card.Text className="border-bottom mb-1">
                    <b>Engine Type:</b> {props.engineCode}
                  </Card.Text>

                  <div className="d-flex text-secondary align-items-center justify-content-around">
                    <div>
                      {props.usersWhoLiked.length == 0
                        ? "No likes yet"
                        : props.usersWhoLiked.length == 1 && isLiked
                        ? "You like this"
                        : props.usersWhoLiked.length == 1
                        ? props.usersWhoLiked.map((user) => {
                            return user.username + " likes this";
                          })
                        : props.usersWhoLiked.length >= 2
                        ? props.usersWhoLiked[0].username +
                          " and " +
                          (props.usersWhoLiked.length - 1) +
                          " other like this"
                        : 0}
                    </div>
                    <Button
                      className="text-secondary text-decoration-none align-middle"
                      variant="link"
                      onClick={() => {
                        display == "d-block"
                          ? setDisplay("d-none")
                          : setDisplay("d-block");
                      }}
                    >
                      <BiComment />
                      Comments
                    </Button>
                  </div>
                  <CommentSection
                    display={display} //receieving value from comment button-show/hide comment section
                    comments={props.comments} //array of fetched comments
                    postId={props._id}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Modal>
    </>
  );
}

export default PostCardModal;
