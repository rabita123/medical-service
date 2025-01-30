import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./TestsScreen.css";

const TestsScreen = () => {
  return (
    <div className="content">
      <Container>
        <div className="category-select mb-4">
          <select className="form-select" defaultValue="">
            <option value="">All Categories</option>
          </select>
        </div>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="test-card">
              <div className="test-image">
                <img
                  src="/assets/img/lab-image.jpg"
                  alt="Complete Blood Count"
                  className="card-img-top"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/img/medical-system.jpeg";
                  }}
                />
              </div>
              <Card.Body>
                <Card.Title>Complete Blood Countssss (CBC)</Card.Title>
                <Card.Text>
                  A blood test that evaluates the three major types of blood cells: red blood cells, white blood cells, and platelets.
                </Card.Text>
                <div className="test-details">
                  <p><strong>Category:</strong> Blood Tests</p>
                  <p><strong>Price:</strong> ₹800</p>
                  <p><strong>Duration:</strong> 30 minutes</p>
                  <p><strong>Report Time:</strong> 24 hours</p>
                </div>
                <Button variant="info" className="book-now-btn w-100">Book Now</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="test-card">
              <div className="test-image">
                <img
                  src="/assets/img/img-04.jpg"
                  alt="Lipid Profile"
                  className="card-img-top"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/img/medical-system.jpeg";
                  }}
                />
              </div>
              <Card.Body>
                <Card.Title>Lipid Profile</Card.Title>
                <Card.Text>
                  Measures different types of cholesterol and triglycerides in your blood to assess heart health.
                </Card.Text>
                <div className="test-details">
                  <p><strong>Category:</strong> Blood Tests</p>
                  <p><strong>Price:</strong> ₹1200</p>
                  <p><strong>Duration:</strong> 20 minutes</p>
                  <p><strong>Report Time:</strong> 24 hours</p>
                </div>
                <Button variant="info" className="book-now-btn w-100">Book Now</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="test-card">
              <div className="test-image">
                <img
                  src="/assets/img/medical-system.jpeg"
                  alt="Thyroid Function Test"
                  className="card-img-top"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/img/img-04.jpg";
                  }}
                />
              </div>
              <Card.Body>
                <Card.Title>Thyroid Function Test</Card.Title>
                <Card.Text>
                  Checks how well your thyroid gland is working by measuring thyroid hormone levels.
                </Card.Text>
                <div className="test-details">
                  <p><strong>Category:</strong> Hormone Tests</p>
                  <p><strong>Price:</strong> ₹1500</p>
                  <p><strong>Duration:</strong> 25 minutes</p>
                  <p><strong>Report Time:</strong> 48 hours</p>
                </div>
                <Button variant="info" className="book-now-btn w-100">Book Now</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TestsScreen; 