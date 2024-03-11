import { Button, Col, Container, Form, Row } from "react-bootstrap";

function Signup() {
  // const handleChange = (e) => {
  //   setFormObject({
  //     ...formObject,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  return (
    <>
      <Container
        className="h-100 shadow mx-auto p-5 mt-4"
        style={{ width: "44rem" }}
      >
        <Form /* onSubmit={handleSubmit} */>
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
                  type="username"
                  placeholder="Enter username"
                  /* value={username}
              onChange={handleUsernameChange} */
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  className="bg-light"
                  type="email"
                  placeholder="Enter email"
                  /*  value={email}
              onChange={handleEmailChange} */
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
              type="password"
              placeholder="Password"
              id="password"
              /* value={password}
              onChange={handlePasswordChange} */
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control
              className="bg-light"
              type="password"
              id="repeatPassword"
              placeholder="Repeat Password"
              /* value={repeatPassword}
              onChange={handleRepeatPasswordChange} */
            />
          </Form.Group>

          <Button
            className="d-grid col-12 mx-auto mt-4"
            variant="success"
            type="submit"
            style={{ width: "22rem" }}
          >
            Create Account
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Signup;
