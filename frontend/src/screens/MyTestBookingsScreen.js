import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, Button, Badge, Modal, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { listMyTestBookings, cancelTestBooking, rescheduleTestBooking } from '../actions/testActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const MyTestBookingsScreen = () => {
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [modalError, setModalError] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const testBookingList = useSelector((state) => state.testBookingList);
  const { loading, error, bookings } = testBookingList;

  const testBookingCancel = useSelector((state) => state.testBookingCancel);
  const {
    loading: cancelLoading,
    error: cancelError,
    success: cancelSuccess,
  } = testBookingCancel;

  const testBookingReschedule = useSelector((state) => state.testBookingReschedule);
  const {
    loading: rescheduleLoading,
    error: rescheduleError,
    success: rescheduleSuccess,
  } = testBookingReschedule;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(listMyTestBookings());
    }
  }, [dispatch, history, userInfo]);

  useEffect(() => {
    if (rescheduleSuccess) {
      history.push('/reschedule-success');
    }
  }, [rescheduleSuccess, history]);

  const handleCancel = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      dispatch(cancelTestBooking(bookingId));
    }
  };

  const handleReschedule = (booking) => {
    setSelectedBooking(booking);
    setShowRescheduleModal(true);
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    if (!newDate || !newTime) {
      setModalError('Please select both date and time');
      return;
    }

    const combinedDateTime = new Date(`${newDate}T${newTime}`);
    if (combinedDateTime < new Date()) {
      setModalError('Please select a future date and time');
      return;
    }

    dispatch(rescheduleTestBooking(selectedBooking._id, combinedDateTime.toISOString()));
    setShowRescheduleModal(false);
    setSelectedBooking(null);
    setNewDate('');
    setNewTime('');
    setModalError(null);
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <Badge bg="warning">Pending</Badge>;
      case 'Confirmed':
        return <Badge bg="success">Confirmed</Badge>;
      case 'Completed':
        return <Badge bg="info">Completed</Badge>;
      case 'Cancelled':
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <Badge bg="warning">Pending</Badge>;
      case 'Completed':
        return <Badge bg="success">Paid</Badge>;
      case 'Failed':
        return <Badge bg="danger">Failed</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">My Test Bookings</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : bookings?.length === 0 ? (
        <Message>No test bookings found</Message>
      ) : (
        <>
          {cancelError && <Message variant="danger">{cancelError}</Message>}
          {rescheduleError && <Message variant="danger">{rescheduleError}</Message>}
          
          <div className="table-responsive booking-table">
            <Table hover className="align-middle">
              <thead>
                <tr>
                  <th>Test Name</th>
                  <th>Appointment Date</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings?.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.test.name}</td>
                    <td>
                      {new Date(booking.appointmentDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td>{getStatusBadge(booking.status)}</td>
                    <td>{getPaymentStatusBadge(booking.paymentStatus)}</td>
                    <td>₹{booking.price}</td>
                    <td>
                      {booking.status === 'Pending' && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="cancel-btn"
                          onClick={() => handleCancel(booking._id)}
                          disabled={cancelLoading}
                        >
                          {cancelLoading ? 'Canceling...' : 'Cancel'}
                        </Button>
                      )}
                      {booking.status === 'Confirmed' && (
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="reschedule-btn"
                          onClick={() => handleReschedule(booking)}
                          disabled={rescheduleLoading}
                        >
                          {rescheduleLoading ? 'Rescheduling...' : 'Reschedule'}
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </>
      )}

      <Modal show={showRescheduleModal} onHide={() => setShowRescheduleModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reschedule Test Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalError && <Message variant="danger">{modalError}</Message>}
          <Form onSubmit={handleRescheduleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Select New Date</Form.Label>
              <Form.Control
                type="date"
                min={getTomorrowDate()}
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Select New Time</Form.Label>
              <Form.Control
                type="time"
                min="09:00"
                max="17:00"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                Available time slots: 9:00 AM to 5:00 PM
              </Form.Text>
            </Form.Group>

            <div className="d-grid">
              <Button type="submit" className="reschedule-submit-btn">
                Confirm Reschedule
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <style>
        {`
          .booking-table {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 1rem;
          }

          .table {
            margin-bottom: 0;
          }

          .table th {
            border-top: none;
            color: #2193b0;
            font-weight: 600;
            padding: 1rem;
          }

          .table td {
            padding: 1rem;
            vertical-align: middle;
          }

          .badge {
            padding: 0.5rem 1rem;
            font-weight: 500;
            font-size: 0.85rem;
          }

          .cancel-btn, .reschedule-btn {
            border-radius: 20px;
            padding: 0.4rem 1rem;
            font-weight: 500;
            transition: all 0.3s ease;
          }

          .cancel-btn:hover:not(:disabled) {
            background-color: #dc3545;
            color: white;
          }

          .reschedule-btn:hover:not(:disabled) {
            background-color: #2193b0;
            color: white;
          }

          .reschedule-submit-btn {
            background: linear-gradient(45deg, #2193b0, #6dd5ed);
            border: none;
            padding: 0.75rem;
            font-weight: 500;
            border-radius: 8px;
            transition: all 0.3s ease;
          }

          .reschedule-submit-btn:hover {
            background: linear-gradient(45deg, #1c7a94, #5bb8cc);
            transform: translateY(-2px);
          }

          tr {
            transition: all 0.3s ease;
          }

          tr:hover {
            background-color: rgba(33, 147, 176, 0.05) !important;
          }
        `}
      </style>
    </Container>
  );
};

export default MyTestBookingsScreen; 