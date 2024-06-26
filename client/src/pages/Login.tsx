import { useContext, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { baseUrl } from "../utils/baseUrl";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { checkForId, checkForToken } = useContext(AuthContext);

  const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        const response = await fetch(
          `${baseUrl}/api/users/login`,
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
            navigate("/posts");
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
      <Card
        className="h-100 shadow mx-auto p-5 mt-4"
        style={{ width: "22rem" }}
      >
        <Form
          onSubmit={(e) => {
            handleLogIn(e), checkForId();
          }}
        >
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
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
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
