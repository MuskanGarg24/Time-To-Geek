import "./Footer.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Footer() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const name = "TimeToGeek";
  return (
    <div className="footContainer">
      <Container fluid>
        <Row className="mt-3 p-1">
          <Col className="sm-12 md-4 lg-4">
            <div className="foot">
              <p className="footer">{name}</p>
            </div>
          </Col>
          <Col className="sm-12 md-4 lg-4">
            <div className="foot"></div>
          </Col>
          <Col className="sm-12 md-4 lg-4">
            <div className="foot">
              <p className="footer">Copyright {year}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Footer;
