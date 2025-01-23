import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

const PrescriptionSuccessScreen = () => {
  return (
    <div className="prescription-success-screen">
      <Header />
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="text-center shadow-sm">
              <Card.Body className="p-5">
                <div className="success-icon mb-4">
                  <i className="fas fa-check-circle text-success"></i>
                </div>
                <h2 className="text-success mb-4">Order Placed Successfully!</h2>
                <p className="text-muted mb-4">
                  Your prescription order has been received and is being reviewed by our pharmacist.
                  We will notify you once your order has been approved and is ready for delivery.
                </p>
                <div className="d-grid gap-3">
                  <Link to="/prescription-orders">
                    <Button variant="outline-primary" size="lg" className="rounded-pill w-100">
                      View My Orders
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button variant="primary" size="lg" className="rounded-pill w-100">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <style>
        {`
          .prescription-success-screen {
            background-color: #f8f9fa;
            min-height: 100vh;
          }

          .success-icon {
            font-size: 5rem;
            color: #28a745;
          }

          .card {
            border: none;
            border-radius: 15px;
          }

          .btn {
            padding: 0.75rem 2rem;
          }
        `}
      </style>
    </div>
  );
};

export default PrescriptionSuccessScreen; 