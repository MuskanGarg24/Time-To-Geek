import BlogNavbar from "../components/Navbar/BlogNavbar";
import { useState, useContext } from "react";
import { Context } from "../../context/Context";
import "./settingsPage.css";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function Settings() {
  const { user, dispatch } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [update, setUpdate] = useState(false);

  // navigate
  const navigate = useNavigate();

  // function to handle logout
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  // function to update account
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdate(false);
    const updatedUser = {
      email,
      password,
      userId: user._id,
    };
    try {
      let id = user._id;
      handleLogout();
      setUpdate(true);
      navigate("/login");
      await axios.put(
        "https://timetogeek.onrender.com/api/user/" + id,
        updatedUser
      );
    } catch (err) {
      console.log(err);
    }
  };

  // funtion to delete the account
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      handleLogout();
      await axios.delete(
        `https://timetogeek.onrender.com/api/user/${user._id}`,
        { data: { userId: user._id } }
      );
      navigate("/register");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <BlogNavbar></BlogNavbar>
      <Container>
        <h1 className="text-dark mt-3 p-3 text-center">My Account</h1>
        <Row className="mt-3">
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg"
          >
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Update Email Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Set New Email Address"
                  onChange={handleEmail}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Update Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Set New Password"
                  onChange={handlePassword}
                />
              </Form.Group>
              <div className="d-grid">
                <Button variant="primary" className="btn-btn" type="submit">
                  Update My Account
                </Button>
              </div>
              <div className="alertMessage">
                {update && <span>Updated Successfully!</span>}
              </div>
            </Form>
          </Col>
        </Row>
        <div className="mt-2 mb-2 p-1 text-center">
          <Button variant="danger" type="submit" onClick={handleLogout}>
            LOGOUT
          </Button>
        </div>
        <div className="mt-2 mb-2 p-1 text-center">
          <Button variant="danger" type="submit" onClick={handleDelete}>
            DELETE MY ACCOUNT
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Settings;
