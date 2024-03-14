import { useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SelectProductionYear from "./SelectOptions";

declare type ModalProps = {
  placeholder: string;
};

function ModalComponent({ placeholder }: ModalProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Crate a new post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Card>
                  <Card.Img variant="top" src={placeholder}></Card.Img>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Write short description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="e.g.Original M-Technik package, rare M-rain seats..."
                      />
                    </Form.Group>
                  </Form>
                  <Card.Body className="pb-1">
                    <Card.Title>Your Car Card</Card.Title>
                    <Card.Text>
                      <SelectProductionYear />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Clancel
          </Button>
          <Button variant="primary">Post</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;
