import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import { getTestDetails, bookTest } from '../actions/testActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const TestBookingScreen = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [formError, setFormError] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const testDetails = useSelector((state) => state.testDetails);
  const { loading, error, test } = testDetails;

  const testBooking = useSelector((state) => state.testBooking);
  const { loading: bookingLoading, success: bookingSuccess, error: bookingError } = testBooking;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
  }, [userInfo, history]);

  useEffect(() => {
    console.log('Fetching test details for ID:', id);
    dispatch(getTestDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (bookingSuccess) {
      history.push('/booking-success');
    }
  }, [bookingSuccess, history]);

  useEffect(() => {
    if (error) {
      console.error('Error loading test details:', error);
    }
    if (test) {
      console.log('Test details loaded:', test);
    }
  }, [error, test]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!appointmentDate || !appointmentTime) {
      setFormError('Please select both date and time');
      return;
    }

    if (!patientName || !patientEmail || !patientPhone || !patientAge || !patientGender) {
      setFormError('Please fill in all patient details');
      return;
    }

    const combinedDateTime = new Date(`${appointmentDate}T${appointmentTime}`);
    const bookingData = {
      appointmentDate: combinedDateTime.toISOString(),
      patientName,
      patientEmail,
      patientPhone,
      patientAge: Number(patientAge),
      patientGender
    };

    console.log('Sending booking data:', bookingData);
    dispatch(bookTest(id, bookingData));
  };

  // Get tomorrow's date as minimum date
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (loading) {
    return (
      <Container className="py-5">
        <Loader />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Message variant="danger">
          {error}. Please try refreshing the page or contact support if the issue persists.
        </Message>
      </Container>
    );
  }

  if (!test) {
    return (
      <Container className="py-5">
        <Message>Test not found. Please try again or contact support.</Message>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        <Col md={6} className="mx-auto">
          <Card className="booking-card">
            <Card.Body>
              <h2 className="text-center mb-4">Book Health Test</h2>
              
              <div className="test-details mb-4">
                <h3 className="test-name">{test.name}</h3>
                <p className="test-category">
                  Category: {test.category_id?.category_name || 'General'}
                </p>
                <p className="test-price">Price: ₹{test.price}</p>
                {test.description && (
                  <p className="test-description">{test.description}</p>
                )}
                {test.duration && (
                  <p className="test-duration">Duration: {test.duration} minutes</p>
                )}
                {test.report_time && (
                  <p className="test-report">Report Time: {test.report_time} hours</p>
                )}
              </div>

              {formError && (
                <Message variant="danger">{formError}</Message>
              )}

              {bookingError && (
                <Message variant="danger">{bookingError}</Message>
              )}

              <Form onSubmit={handleSubmit}>
                <h4 className="mb-3">Patient Details</h4>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    required
                    min="0"
                    max="150"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value)}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Control>
                </Form.Group>

                <h4 className="mb-3">Appointment Details</h4>
                <Form.Group className="mb-3">
                  <Form.Label>Select Date</Form.Label>
                  <Form.Control
                    type="date"
                    min={getTomorrowDate()}
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Select Time</Form.Label>
                  <Form.Control
                    type="time"
                    min="09:00"
                    max="17:00"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    required
                  />
                  <Form.Text className="text-muted">
                    Available time slots: 9:00 AM to 5:00 PM
                  </Form.Text>
                </Form.Group>

                <div className="d-grid">
                  <Button
                    type="submit"
                    className="book-btn"
                    disabled={bookingLoading}
                  >
                    {bookingLoading ? 'Processing...' : 'Confirm Booking'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <style>
        {`
          .booking-card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          }

          .test-details {
            background: rgba(33, 147, 176, 0.05);
            padding: 1.5rem;
            border-radius: 10px;
            margin: -1rem -1rem 1.5rem -1rem;
          }

          .test-name {
            color: #2193b0;
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
          }

          .test-category {
            color: #666;
            font-size: 1rem;
            margin-bottom: 0.5rem;
          }

          .test-price {
            font-size: 1.25rem;
            font-weight: 600;
            color: #28a745;
            margin-bottom: 0;
          }

          .book-btn {
            background: linear-gradient(45deg, #2193b0, #6dd5ed);
            border: none;
            padding: 1rem;
            font-weight: 500;
            border-radius: 8px;
            transition: all 0.3s ease;
          }

          .book-btn:hover:not(:disabled) {
            background: linear-gradient(45deg, #1c7a94, #5bb8cc);
            transform: translateY(-2px);
          }

          .book-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }

          h4 {
            color: #2193b0;
            font-weight: 600;
          }

          .form-control {
            border-radius: 8px;
            padding: 0.75rem;
            border: 1px solid #ddd;
          }

          .form-control:focus {
            border-color: #2193b0;
            box-shadow: 0 0 0 0.2rem rgba(33, 147, 176, 0.25);
          }
        `}
      </style>
    </Container>
  );
};

export default TestBookingScreen; 