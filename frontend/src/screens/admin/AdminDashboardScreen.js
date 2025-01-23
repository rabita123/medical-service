import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUsers, FaVials, FaCalendarCheck, FaPrescriptionBottleAlt, FaPills } from 'react-icons/fa';

const AdminDashboardScreen = () => {
  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      <Row className="g-4">
        <Col md={4}>
          <Link to="/admin/users" className="text-decoration-none">
            <Card className="dashboard-card h-100">
              <Card.Body className="text-center">
                <div className="icon-container mb-3">
                  <FaUsers className="dashboard-icon" />
                </div>
                <Card.Title>Manage Users</Card.Title>
                <Card.Text>
                  View and manage user accounts and permissions
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/admin/tests" className="text-decoration-none">
            <Card className="dashboard-card h-100">
              <Card.Body className="text-center">
                <div className="icon-container mb-3">
                  <FaVials className="dashboard-icon" />
                </div>
                <Card.Title>Manage Tests</Card.Title>
                <Card.Text>
                  Add, edit, and manage available health tests
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/admin/bookings" className="text-decoration-none">
            <Card className="dashboard-card h-100">
              <Card.Body className="text-center">
                <div className="icon-container mb-3">
                  <FaCalendarCheck className="dashboard-icon" />
                </div>
                <Card.Title>Manage Bookings</Card.Title>
                <Card.Text>
                  View and manage test bookings and appointments
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/admin/pharmacy" className="text-decoration-none">
            <Card className="dashboard-card h-100">
              <Card.Body className="text-center">
                <div className="icon-container mb-3">
                  <FaPills className="dashboard-icon" />
                </div>
                <Card.Title>Pharmacy Management</Card.Title>
                <Card.Text>
                  Manage medications and inventory
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/admin/prescription-orders" className="text-decoration-none">
            <Card className="dashboard-card h-100">
              <Card.Body className="text-center">
                <div className="icon-container mb-3">
                  <FaPrescriptionBottleAlt className="dashboard-icon" />
                </div>
                <Card.Title>Prescription Orders</Card.Title>
                <Card.Text>
                  Review and manage prescription orders and deliveries
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>

      <style>
        {`
          .dashboard-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: none;
            border-radius: 15px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .dashboard-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          }

          .icon-container {
            background: linear-gradient(45deg, #2193b0, #6dd5ed);
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
          }

          .dashboard-icon {
            font-size: 2rem;
            color: white;
          }

          .card-title {
            color: #2193b0;
            font-weight: 600;
            margin-bottom: 1rem;
          }

          .card-text {
            color: #666;
          }
        `}
      </style>
    </Container>
  );
};

export default AdminDashboardScreen; 