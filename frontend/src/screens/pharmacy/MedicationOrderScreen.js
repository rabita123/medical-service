import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { withRouter } from 'react-router';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  getMedicationDetails,
  createPrescriptionOrder,
} from '../../actions/pharmacyActions';

const MedicationOrderScreen = ({ history }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'India',
  });

  const medicationDetails = useSelector((state) => state.medicationDetails);
  const { loading, error, medication } = medicationDetails;

  const prescriptionOrderCreate = useSelector(
    (state) => state.prescriptionOrderCreate
  );
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = prescriptionOrderCreate;

  useEffect(() => {
    dispatch(getMedicationDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (successCreate) {
      history.push('/pharmacy/orders');
    }
  }, [history, successCreate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPrescriptionFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('medicationId', id);
    formData.append('quantity', quantity);
    formData.append('address', shippingAddress.address);
    formData.append('city', shippingAddress.city);
    formData.append('postalCode', shippingAddress.postalCode);
    formData.append('country', shippingAddress.country);
    if (prescriptionFile) {
      formData.append('prescription', prescriptionFile);
    }
    dispatch(createPrescriptionOrder(formData));
  };

  return (
    <Container className="py-5">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Card className="mb-4 p-4">
                <h2 className="mb-4">Medication Details</h2>
                <div className="medication-info">
                  <h3>{medication?.name}</h3>
                  <p className="text-muted">{medication?.category}</p>
                  <p>{medication?.description}</p>
                  <h4 className="text-success">₹{medication?.price}</h4>
                  {medication?.requiresPrescription && (
                    <Alert variant="warning">
                      This medication requires a valid prescription
                    </Alert>
                  )}
                </div>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="p-4">
                <h2 className="mb-4">Place Order</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                    />
                  </Form.Group>

                  {medication?.requiresPrescription && (
                    <Form.Group className="mb-3">
                      <Form.Label>Upload Prescription</Form.Label>
                      <Form.Control
                        type="file"
                        onChange={handleFileChange}
                        accept=".jpg,.jpeg,.png,.pdf"
                        required
                      />
                      <Form.Text className="text-muted">
                        Accepted formats: JPG, JPEG, PNG, PDF
                      </Form.Text>
                    </Form.Group>
                  )}

                  <h4 className="mt-4 mb-3">Shipping Address</h4>
                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      value={shippingAddress.address}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          address: e.target.value,
                        })
                      }
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          city: e.target.value,
                        })
                      }
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                      type="text"
                      value={shippingAddress.postalCode}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          postalCode: e.target.value,
                        })
                      }
                      required
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button
                      type="submit"
                      variant="primary"
                      className="mt-3"
                      disabled={loadingCreate}
                    >
                      {loadingCreate ? 'Processing...' : 'Place Order'}
                    </Button>
                  </div>

                  {errorCreate && (
                    <Message variant="danger" className="mt-3">
                      {errorCreate}
                    </Message>
                  )}
                </Form>
              </Card>
            </Col>
          </Row>

          <style>
            {`
              .medication-info h3 {
                color: #2193b0;
                margin-bottom: 0.5rem;
              }

              .medication-info p {
                margin-bottom: 1rem;
              }

              .btn-primary {
                background: linear-gradient(45deg, #2193b0, #6dd5ed);
                border: none;
                border-radius: 25px;
                padding: 0.75rem;
                font-weight: 500;
                transition: all 0.3s ease;
              }

              .btn-primary:hover:not(:disabled) {
                background: linear-gradient(45deg, #1c7a94, #5bb8cc);
                transform: translateY(-2px);
              }

              .form-control {
                border-radius: 10px;
                padding: 0.75rem;
                border: 1px solid #ddd;
              }

              .form-control:focus {
                border-color: #2193b0;
                box-shadow: 0 0 0 0.2rem rgba(33, 147, 176, 0.25);
              }
            `}
          </style>
        </>
      )}
    </Container>
  );
};

export default withRouter(MedicationOrderScreen);