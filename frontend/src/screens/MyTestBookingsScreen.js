import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { listMyTestBookings, cancelTestBooking } from '../actions/testActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const MyTestBookingsScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const testBookingList = useSelector((state) => state.testBookingList);
  const { loading, error, bookings } = testBookingList;

  const testBookingCancel = useSelector((state) => state.testBookingCancel);
  const { loading: loadingCancel, error: errorCancel, success: successCancel } = testBookingCancel;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(listMyTestBookings());
    }
  }, [dispatch, history, userInfo, successCancel]);

  const handleCancel = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      dispatch(cancelTestBooking(bookingId));
    }
  };

  const getStatusBadge = (status) => {
    let variant;
    switch (status?.toLowerCase()) {
      case 'pending':
        variant = 'warning';
        break;
      case 'completed':
        variant = 'success';
        break;
      case 'cancelled':
        variant = 'danger';
        break;
      default:
        variant = 'secondary';
    }
    return <Badge bg={variant}>{status?.toUpperCase() || 'PENDING'}</Badge>;
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">My Test Bookings</h1>

      {loadingCancel && <Loader />}
      {errorCancel && <Message variant="danger">{errorCancel}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : bookings?.length === 0 ? (
        <Message>No bookings found</Message>
      ) : (
        <div className="table-responsive">
          <Table hover className="align-middle custom-table">
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Appointment Date</th>
                <th>Status</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings?.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.test?.name}</td>
                  <td>
                    {new Date(booking.appointmentDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                    <br />
                    <small className="text-muted">
                      {new Date(booking.appointmentDate).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </small>
                  </td>
                  <td>{getStatusBadge(booking.status)}</td>
                  <td>₹{booking.price}</td>
                  <td>
                    {booking.status?.toLowerCase() === 'pending' && (
                      <Button
                        variant="danger"
                        size="sm"
                        className="action-btn"
                        onClick={() => handleCancel(booking._id)}
                        disabled={loadingCancel}
                      >
                        Cancel
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <style>
        {`
          .custom-table {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .custom-table th {
            background: #f8f9fa;
            color: #2193b0;
            font-weight: 600;
            border-bottom: 2px solid #e9ecef;
          }

          .action-btn {
            border-radius: 20px;
            padding: 0.4rem 1rem;
            font-weight: 500;
            transition: all 0.3s ease;
          }

          .action-btn:hover {
            transform: translateY(-2px);
          }
        `}
      </style>
    </Container>
  );
};

export default withRouter(MyTestBookingsScreen); 