import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { listPrescriptionOrders } from '../../actions/pharmacyActions';

const PrescriptionOrderListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const prescriptionOrderList = useSelector((state) => state.prescriptionOrderList);
  const { loading, error, orders } = prescriptionOrderList;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(listPrescriptionOrders());
    }
  }, [dispatch, navigate, userInfo]);

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

  return (
    <div className="prescription-orders-screen">
      <Header />
      <Container className="py-5">
        <Card className="shadow-sm">
          <Card.Body>
            <h2 className="text-primary mb-4">My Prescription Orders</h2>

            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : orders?.length === 0 ? (
              <Message variant="info">You have no prescription orders yet.</Message>
            ) : (
              <div className="table-responsive">
                <Table hover className="align-middle table-borderless">
                  <thead className="bg-light">
                    <tr>
                      <th className="py-3">ORDER ID</th>
                      <th className="py-3">DATE</th>
                      <th className="py-3">MEDICATION</th>
                      <th className="py-3">QUANTITY</th>
                      <th className="py-3">STATUS</th>
                      <th className="py-3">NOTE</th>
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
                          {order.medication.name}
                        </td>
                        <td className="py-3">
                          {order.quantity}
                        </td>
                        <td className="py-3">
                          {getStatusBadge(order.status)}
                        </td>
                        <td className="py-3">
                          {order.note && (
                            <span className="text-muted">{order.note}</span>
                          )}
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
          .prescription-orders-screen {
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
        `}
      </style>
    </div>
  );
};

export default PrescriptionOrderListScreen; 