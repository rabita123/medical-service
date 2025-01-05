import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCalendarCheck } from 'react-icons/fa';

const RescheduleSuccessScreen = () => {
  return (
    <Container className="py-5">
      <div className="text-center">
        <Card className="success-card mx-auto">
          <Card.Body>
            <div className="success-icon">
              <FaCalendarCheck size={60} />
            </div>
            <h2 className="success-title">Rescheduling Confirmed!</h2>
            <p className="success-message">
              Your test appointment has been successfully rescheduled. You can view your
              updated booking details in the My Test Bookings section.
            </p>
            <div className="mt-4">
              <Link to="/my-test-bookings">
                <Button variant="primary" className="action-btn">
                  View My Bookings
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
            color: #2193b0;
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
            background: linear-gradient(45deg, #2193b0, #6dd5ed);
            border: none;
          }

          .action-btn:hover {
            transform: translateY(-2px);
            background: linear-gradient(45deg, #1c7a94, #5bb8cc);
          }
        `}
      </style>
    </Container>
  );
};

export default RescheduleSuccessScreen; 