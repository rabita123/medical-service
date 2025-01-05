import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const BookingSuccessScreen = () => {
  return (
    <Container className="py-5">
      <div className="text-center">
        <Card className="success-card mx-auto">
          <Card.Body>
            <div className="success-icon">
              <FaCheckCircle size={60} />
            </div>
            <h2 className="success-title">Booking Confirmed!</h2>
            <p className="success-message">
              Your test has been booked successfully. You can view your booking details
              in the My Test Bookings section.
            </p>
            <div className="mt-4">
              <Link to="/my-test-bookings">
                <Button variant="primary" className="action-btn me-3">
                  View My Bookings
                </Button>
              </Link>
              <Link to="/tests">
                <Button variant="outline-primary" className="action-btn">
                  Book Another Test
                </Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>

      <style>
        {`
          .success-card {
            max-width: 500px;
            border: none;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            padding: 2rem;
          }

          .success-icon {
            color: #28a745;
            margin-bottom: 1.5rem;
          }

          .success-title {
            color: #2193b0;
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 1rem;
          }

          .success-message {
            color: #666;
            font-size: 1.1rem;
            margin-bottom: 1.5rem;
          }

          .action-btn {
            padding: 0.75rem 1.5rem;
            font-weight: 500;
            border-radius: 25px;
            transition: all 0.3s ease;
          }

          .action-btn:hover {
            transform: translateY(-2px);
          }

          .btn-primary {
            background: linear-gradient(45deg, #2193b0, #6dd5ed);
            border: none;
          }

          .btn-primary:hover {
            background: linear-gradient(45deg, #1c7a94, #5bb8cc);
          }

          .btn-outline-primary {
            border-color: #2193b0;
            color: #2193b0;
          }

          .btn-outline-primary:hover {
            background-color: #2193b0;
            border-color: #2193b0;
            color: white;
          }
        `}
      </style>
    </Container>
  );
};

export default BookingSuccessScreen; 