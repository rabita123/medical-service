import React, { useEffect } from 'react';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listAllTestBookings, cancelTestBooking, completeTestBooking } from '../../actions/testActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const AdminBookingsScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const testBookingList = useSelector((state) => state.testBookingList);
  const { loading, error, bookings } = testBookingList;

  const testBookingCancel = useSelector((state) => state.testBookingCancel);
  const { loading: loadingCancel, error: errorCancel, success: successCancel } = testBookingCancel;

  const testBookingComplete = useSelector((state) => state.testBookingComplete);
  const { loading: loadingComplete, error: errorComplete, success: successComplete } = testBookingComplete;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    } else {
      dispatch(listAllTestBookings());
    }
  }, [dispatch, navigate, userInfo, successCancel, successComplete]);

  const handleCancel = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      dispatch(cancelTestBooking(bookingId));
    }
  };

  const handleComplete = (bookingId) => {
    if (window.confirm('Are you sure you want to mark this booking as completed?')) {
      dispatch(completeTestBooking(bookingId));
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
    <Container fluid className="py-4">
      <div className="admin-content-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">Test Bookings Management</h1>
        </div>

        {(loadingCancel || loadingComplete) && <Loader />}
        {errorCancel && <Message variant="danger">{errorCancel}</Message>}
        {errorComplete && <Message variant="danger">{errorComplete}</Message>}

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
                  <th>Booking ID</th>
                  <th>Test Details</th>
                  <th>Patient Details</th>
                  <th>Contact Info</th>
                  <th>Appointment</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings?.map((booking) => (
                  <tr key={booking._id}>
                    <td>
                      <small className="text-muted">{booking._id}</small>
                    </td>
                    <td>
                      <div>
                        <strong>{booking.test?.name || 'Test not found'}</strong>
                        {booking.test?.category_id?.category_name && (
                          <div>
                            <small className="text-muted">
                              Category: {booking.test.category_id.category_name}
                            </small>
                          </div>
                        )}
                        <div>
                          <small className="text-success">₹{booking.price}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <strong>{booking.patientName}</strong>
                        <div>
                          <small className="text-muted">
                            {booking.patientAge} years, {booking.patientGender}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <small>{booking.patientEmail}</small>
                        <div>
                          <small>{booking.patientPhone}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        {new Date(booking.appointmentDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                        <div>
                          <small className="text-muted">
                            {new Date(booking.appointmentDate).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td>{getStatusBadge(booking.status)}</td>
                    <td>
                      {booking.status?.toLowerCase() === 'pending' && (
                        <div className="d-flex gap-2">
                          <Button
                            variant="success"
                            size="sm"
                            className="action-btn"
                            onClick={() => handleComplete(booking._id)}
                            disabled={loadingComplete}
                          >
                            Complete
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="action-btn"
                            onClick={() => handleCancel(booking._id)}
                            disabled={loadingCancel}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>

      <style>
        {`
          .admin-content-container {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .custom-table {
            margin-bottom: 0;
          }

          .custom-table th {
            background: #f8f9fa;
            color: #2193b0;
            font-weight: 600;
            border-bottom: 2px solid #e9ecef;
            white-space: nowrap;
          }

          .custom-table td {
            vertical-align: middle;
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

          .gap-2 {
            gap: 0.5rem;
          }

          .table-responsive {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }

          @media (max-width: 768px) {
            .admin-content-container {
              padding: 1rem;
            }
          }
        `}
      </style>
    </Container>
  );
};

export default AdminBookingsScreen; 