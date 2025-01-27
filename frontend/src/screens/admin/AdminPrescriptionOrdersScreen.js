import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Header from '../../components/Header';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { listPrescriptionOrders, updatePrescriptionOrderStatus } from '../../actions/pharmacyActions';
import { PRESCRIPTION_ORDER_STATUS_UPDATE_RESET } from '../../constants/pharmacyConstants';

const AdminPrescriptionOrdersScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const prescriptionOrderList = useSelector((state) => state.prescriptionOrderList);
  const { loading, error, orders } = prescriptionOrderList;

  const prescriptionOrderStatusUpdate = useSelector((state) => state.prescriptionOrderStatusUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = prescriptionOrderStatusUpdate;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    } else {
      dispatch(listPrescriptionOrders());
    }

    if (successUpdate) {
      dispatch({ type: PRESCRIPTION_ORDER_STATUS_UPDATE_RESET });
    }
  }, [dispatch, history, userInfo, successUpdate]);

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Badge bg="warning">Pending Review</Badge>;
      case 'approved':
        return <Badge bg="success">Approved</Badge>;
      case 'rejected':
        return <Badge bg="danger">Rejected</Badge>;
      case 'processing':
        return <Badge bg="info">Processing</Badge>;
      case 'shipped':
        return <Badge bg="primary">Shipped</Badge>;
      case 'delivered':
        return <Badge bg="success">Delivered</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    if (window.confirm('Are you sure you want to update this order status?')) {
      dispatch(updatePrescriptionOrderStatus(orderId, newStatus));
    }
  };

  const viewPrescription = (imagePath) => {
    window.open(`/uploads/prescriptions/${imagePath}`, '_blank');
  };

  return (
    <div className="admin-prescription-orders-screen">
      <Header />
      <Container className="py-5">
        <Card className="shadow-sm">
          <Card.Body>
            <Row className="align-items-center mb-4">
              <Col>
                <h2 className="text-primary mb-0">Prescription Orders Management</h2>
              </Col>
              <Col xs="auto">
                <Button
                  variant="primary"
                  onClick={() => history.push('/admin/prescription-orders/add')}
                  className="rounded-pill px-4"
                >
                  <i className="fas fa-plus me-2"></i>
                  Add New Order
                </Button>
              </Col>
            </Row>

            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : orders?.length === 0 ? (
              <Message variant="info">No prescription orders found.</Message>
            ) : (
              <div className="table-responsive">
                <Table hover className="align-middle table-borderless">
                  <thead className="bg-light">
                    <tr>
                      <th className="py-3">ORDER ID</th>
                      <th className="py-3">DATE</th>
                      <th className="py-3">USER</th>
                      <th className="py-3">MEDICATION</th>
                      <th className="py-3">QUANTITY</th>
                      <th className="py-3">STATUS</th>
                      <th className="py-3">PRESCRIPTION</th>
                      <th className="py-3">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.map((order) => (
                      <tr key={order._id} className="border-bottom">
                        <td className="py-3">
                          <span className="text-primary fw-bold">{order._id}</span>
                        </td>
                        <td className="py-3">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3">
                          {order.user?.name || 'N/A'}
                        </td>
                        <td className="py-3">
                          {order.medication?.name || 'N/A'}
                        </td>
                        <td className="py-3">
                          {order.quantity}
                        </td>
                        <td className="py-3">
                          {getStatusBadge(order.status)}
                        </td>
                        <td className="py-3">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => viewPrescription(order.prescriptionImage)}
                          >
                            View Prescription
                          </Button>
                        </td>
                        <td className="py-3">
                          <div className="d-flex gap-2">
                            {order.status === 'pending' && (
                              <>
                                <Button
                                  variant="success"
                                  size="sm"
                                  onClick={() => handleStatusUpdate(order._id, 'approved')}
                                >
                                  Approve
                                </Button>
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => handleStatusUpdate(order._id, 'rejected')}
                                >
                                  Reject
                                </Button>
                              </>
                            )}
                            {order.status === 'approved' && (
                              <Button
                                variant="info"
                                size="sm"
                                onClick={() => handleStatusUpdate(order._id, 'processing')}
                              >
                                Process
                              </Button>
                            )}
                            {order.status === 'processing' && (
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => handleStatusUpdate(order._id, 'shipped')}
                              >
                                Mark as Shipped
                              </Button>
                            )}
                            {order.status === 'shipped' && (
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => handleStatusUpdate(order._id, 'delivered')}
                              >
                                Mark as Delivered
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>

      <style>
        {`
          .admin-prescription-orders-screen {
            background-color: #f8f9fa;
            min-height: 100vh;
          }

          .table {
            background: white;
            border-radius: 10px;
          }

          .table thead th {
            font-weight: 600;
            color: #495057;
            border: none;
          }

          .table tbody tr {
            transition: all 0.3s ease;
          }

          .table tbody tr:hover {
            background-color: #f8f9fa;
          }

          .badge {
            padding: 8px 12px;
            font-weight: 500;
            border-radius: 30px;
          }

          .btn-sm {
            border-radius: 20px;
            padding: 0.4rem 1rem;
          }
        `}
      </style>
    </div>
  );
};

export default withRouter(AdminPrescriptionOrdersScreen); 