import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "black", color: "gray" }}>
      <Container>
        <Row>
          <Col md={4} className="text-center py-3">
            <h5>About Us</h5>
            <p>
              We are a company that sells high-quality products at affordable
              prices. We are located in the heart of the city. We are open 24/7.
              We are here to serve you. We are ProShop.
            </p>
          </Col>
          <Col md={4} className="text-center py-3">
            <h5>Contact Us</h5>
            <p>Email: info@proshop.com</p>
            <p>Phone: 555-555-5555</p>
          </Col>
          <Col md={4} className="text-center py-3">
            <h5>Follow Us</h5>
            <p>Facebook</p>
            <p>Twitter</p>
            <p>Instagram</p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
            <p>ProShop &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
