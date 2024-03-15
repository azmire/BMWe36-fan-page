import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [image, setImage] = useState<File | undefined>(undefined);

  // const handleImageUpload = (e) => {
  //   setImage(e.target.files[0]);
  // };

  const handleRegister = () => {
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("username", username);
    formdata.append("password", password);
    // if (image) {
    //   formdata.append("avatar", image);
    // }

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow" as RequestRedirect,
    };

    fetch("http://localhost:9876/api/users/register", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };
  return (
    <>
      <Container
        className="h-100 shadow mx-auto p-5 mt-4"
        style={{ width: "44rem" }}
      >
        <Form>
          <div className="d-flex justify-content-start">
            <h2>Create an account</h2>
          </div>
          <div className="d-flex justify-content-start text-muted">
            <p>Fast and simple</p>
          </div>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  className="bg-light"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  className="bg-light"
                  type="text"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="bg-light"
              type="text"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control
              className="bg-light"
              type="text"
              id="repeatPassword"
              placeholder="Repeat Password"
              /* value={repeatPassword}
              onChange={handleRepeatPasswordChange} */
            />
          </Form.Group>
          {/* <input type="file" name="image" onChange={handleImageUpload} /> */}
          <Button
            className="d-grid col-12 mx-auto mt-4"
            variant="success"
            type="submit"
            style={{ width: "22rem" }}
            onClick={handleRegister}
          >
            Create Account
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Signup;
