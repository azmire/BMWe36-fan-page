import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

function Posts() {
  return (
    <>
      <Container className="py-3">
        <Row>
          <Col className="d-grid gap-3">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Posts;
