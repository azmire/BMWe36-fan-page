import { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SelectOptions from "./SelectOptions";
import "../styles/UploadImageButton.css";

declare type ModalProps = {
  placeholder: string;
};

function ModalComponent({ placeholder }: ModalProps) {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [description, setDescription] = useState("");
  const [caption, setCaption] = useState("");
  const [year, setYear] = useState<string | null>("");
  const [engine, setEngine] = useState<string | null>("");
  const [model, setModel] = useState<string | null>("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCreateCard = () => {
    const formdata = new FormData();
    if (image && model && year && engine && caption) {
      formdata.append("cardImage", image);
      formdata.append("description", description);
      formdata.append("caption", caption);
      formdata.append("carModel", model);
      formdata.append("productionYear", year);
      formdata.append("engineCode", engine);
    }
    //posting data to a user collection
    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow" as RequestRedirect,
    };

    fetch("http://localhost:9876/api/posts/addpost", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    console.log("model :>> ", model);
    console.log("year :>> ", year);
    console.log("engine :>> ", engine);
  }, [model, year, engine]);

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
                  <input
                    type="file"
                    id="actual-button"
                    name="image"
                    onChange={handleImageUpload}
                    className="pb-3"
                  />
                  {/* <Button
                    variant="secondary"
                    className="w-50 d-flex align-items-start justify-content-start"
                  >
                    <label htmlFor="actual-btn">
                      <MdAddAPhoto />
                    </label>
                  </Button> */}
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Write caption</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={1}
                        placeholder="e.g.BMW 323i 125kW"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                      />
                      <Form.Label>Write short description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="e.g.Original M-Technik package, rare M-rain seats..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                  <Card.Body className="pb-1">
                    <Card.Text>
                      <SelectOptions
                        setYear={setYear}
                        setEngine={setEngine}
                        setModel={setModel}
                      />
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
          <Button variant="primary" onClick={handleCreateCard}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;
