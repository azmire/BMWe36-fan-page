import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

type User = {
  _id: string;
  email: string;
  username: string;
  password: string;
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = () => {
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow" as RequestRedirect,
    };

    fetch("http://localhost:9876/api/users/login", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };
  return (
    <>
      <Card
        className="h-100 shadow mx-auto p-5 mt-4"
        style={{ width: "22rem" }}
      >
        <Form /* onSubmit={handleSubmit} */>
          <div className="d-flex justify-content-center mb-3">
            <h3>Welcome back</h3>
          </div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className="bg-light"
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
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

          <Button
            className="d-grid col-12 mx-auto mt-4"
            variant="dark"
            type="submit"
            onClick={handleLogIn}
          >
            Log in
          </Button>

          <div className="mt-3">
            <h6 className="d-flex justify-content-center"> OR</h6>

            <Button className="d-grid col-12 mx-auto" variant="success">
              <Link className=" text-decoration-none text-light" to="/signup">
                Create Account
              </Link>
            </Button>
          </div>
        </Form>
      </Card>
    </>
  );
}

export default Login;
