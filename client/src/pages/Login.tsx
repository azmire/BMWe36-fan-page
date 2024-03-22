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

  const handleLogIn = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("runs");
    event.preventDefault();
    console.log("runs?");
    if (!email || !password) {
      alert("Email or password is missing");
      return;
    } else {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("email", email);
      urlencoded.append("password", password);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow" as RequestRedirect,
      };
      try {
        console.log("fetching?");
        const response = await fetch(
          "http://localhost:9876/api/users/login",
          requestOptions
        );
        console.log(response);

        if (response.ok) {
          const result = await response.json();
          console.log("result :>> ", result);
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

  return (
    <>
      <Card
        className="h-100 shadow mx-auto p-5 mt-4"
        style={{ width: "22rem" }}
      >
        <Form onSubmit={handleLogIn}>
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
            // onClick={handleLogIn}
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
