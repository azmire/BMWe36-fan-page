import { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { checkForId, checkForToken } = useContext(AuthContext);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      alert("Password doesn't match repeated password");
      return;
    } else {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("email", email);
      urlencoded.append("username", username);
      urlencoded.append("password", password);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow" as RequestRedirect,
      };
      try {
        const response = await fetch(
          "http://localhost:9876/api/users/register",
          requestOptions
        );

        if (response.ok) {
          const result = await response.json();
          console.log("result :>> ", result);

          const { token, id } = result;
          if (token) {
            localStorage.setItem("token", token);
            //setUser(true);
            checkForToken();
          }
          if (id) {
            localStorage.setItem("userId", id);
            console.log("_id :>> ", id);
            navigate(`/myProfile/${id}`);
          }
        }

        if (!response.ok) {
          const result = await response.json();
          console.log("result :>> ", result);
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
  };
  const navigate = useNavigate();

  return (
    <>
      <Container
        className="h-100 shadow mx-auto p-5 mt-4"
        style={{ width: "44rem" }}
      >
        <Form
          onSubmit={(e) => {
            handleRegister(e), checkForId();
          }}
        >
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
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control
              className="bg-light"
              type="password"
              id="repeatPassword"
              placeholder="Repeat Password"
              value={repeatPassword}
              autoComplete="off"
              onChange={(e) => setRepeatPassword(e.target.value)}
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
