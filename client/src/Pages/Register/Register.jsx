import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);

  // Password validation function
  const isPasswordValid = (password) => {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+[\]{};':"\\|,.<>?]/;

    return (
      password.length >= 8 &&
      uppercaseRegex.test(password) &&
      lowercaseRegex.test(password) &&
      numberRegex.test(password) &&
      specialCharRegex.test(password)
    );
  };

  // replace the window function
  function replaceWindow(userId) {
    window.location.replace(`/verifyOTP/${userId}`);
  }

  // register function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(false);
    const res = {
      username,
      email,
      password,
    };
    if (!isPasswordValid(password)) {
      setErr(true);
      return;
    }
    try {
      const response = await axios.post("/auth/register", res);
      const userId = response.data.data.userId;
      replaceWindow(userId);
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };

  return (
    <div>
      <Container>
        <h1 className="text-success mt-5 p-3 text-center">TimeToGeek</h1>
        <Row className="mt-3">
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg"
          >
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <div className="d-grid">
                <Button variant="success" className="btn-btn" type="submit">
                  Register
                </Button>
              </div>
              {err && (
                <span className="text-dark mt-2 p-1 text-center">
                  Error while SignUp...Choose Correct Credentials!!!
                </span>
              )}
            </Form>
          </Col>
        </Row>
        <p className="text-success mt-2 p-1 text-center registerLink ">
          Already Registered?{" "}
          <span className="register">
            <Link to="/login" className="link">
              Login Here!
            </Link>
          </span>
        </p>
      </Container>
    </div>
  );
}

export default Register;
