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
  /*  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch("http://localhost:9876/api/users/allusers", requestOptions)
        .then((response) => response.json())
        .then((result) => setUsers(result))
        .catch((error) => console.error(error));
    };
    fetchData();
  }, []);
  console.log("users :>> ", users); */
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
              type="email"
              placeholder="Enter email"
              /* value={email}
              onChange={handleEmailChange} */
            />
          </Form.Group>
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

          <Button
            className="d-grid col-12 mx-auto mt-4"
            variant="dark"
            type="submit"
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
