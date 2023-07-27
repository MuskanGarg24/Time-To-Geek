import "./Login.css";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch } = useContext(Context);

  function changeWindow() {
    window.location.replace("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "https://timetogeek.onrender.com/api/auth/login",
        {
          username: userRef.current.value,
          password: passwordRef.current.value,
        }
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
    changeWindow();
  };

  return (
    <div>
      <Container>
        <h1 className="text-success mt-5 p-3 text-center">TimeToGeek</h1>
        <Row className="mt-5">
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg"
          >
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  ref={userRef}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={passwordRef}
                />
              </Form.Group>
              <div className="d-grid">
                <Button variant="success" className="btn-btn" type="submit">
                  Login
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
        <p className="text-success mt-2 p-1 text-center registerLink ">
          Not Registered?{" "}
          <span className="register">
            <Link to="/register" className="link">
              Register Here!
            </Link>
          </span>
        </p>
      </Container>
    </div>
  );
}

export default Login;
