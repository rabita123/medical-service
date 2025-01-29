import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { createPrescriptionOrder } from '../../actions/pharmacyActions';

const PrescriptionOrderScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [selectedMedication, setSelectedMedication] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [prescriptionImage, setPrescriptionImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const medicationList = useSelector((state) => state.medicationList);
  const { loading, error, medications } = medicationList;

  const prescriptionCreate = useSelector((state) => state.prescriptionCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = prescriptionCreate;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    if (successCreate) {
      history.push('/prescription-success');
    }
  }, [history, userInfo, successCreate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPrescriptionImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('medication', selectedMedication);
    formData.append('quantity', quantity);
    formData.append('prescriptionImage', prescriptionImage);
    formData.append('shippingAddress', JSON.stringify({
      address,
      city,
      postalCode,
      country,
      deliveryInstructions
    }));

    dispatch(createPrescriptionOrder(formData));
    history.push('/success-page');
  };

  return (
    <div className="prescription-order-screen">
      <Header />
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow-sm">
              <Card.Body className="p-4">
                <h2 className="text-primary mb-4">Order Prescribed Medication</h2>
                
                {loadingCreate && <Loader />}
                {errorCreate && <Message variant="danger">{errorCreate}</Message>}

                <Form onSubmit={submitHandler}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Select Medication</Form.Label>
                        <Form.Select
                          value={selectedMedication}
                          onChange={(e) => setSelectedMedication(e.target.value)}
                          required
                          className="rounded-pill"
                        >
                          <option value="">Choose medication...</option>
                          {medications?.filter(med => med.requiresPrescription).map((med) => (
                            <option key={med._id} value={med._id}>
                              {med.name} - ${med.price}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Quantity</Form.Label>
                        <Form.Control
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          required
                          className="rounded-pill"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">Upload Prescription</Form.Label>
                    <div className="prescription-upload-area p-4 rounded border">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                        className="d-none"
                        id="prescription-upload"
                      />
                      <label htmlFor="prescription-upload" className="upload-label">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Prescription preview"
                            className="img-preview"
                          />
                        ) : (
                          <div className="upload-placeholder">
                            <i className="fas fa-upload mb-2"></i>
                            <span>Click to upload prescription</span>
                          </div>
                        )}
                      </label>
                    </div>
                  </Form.Group>

                  <h4 className="text-primary mb-3">Delivery Information</h4>
                  
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Street Address</Form.Label>
                        <Form.Control
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          required
                          className="rounded-pill"
                          placeholder="Enter your street address"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">City</Form.Label>
                        <Form.Control
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                          className="rounded-pill"
                          placeholder="Enter city"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Postal Code</Form.Label>
                        <Form.Control
                          type="text"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          required
                          className="rounded-pill"
                          placeholder="Enter postal code"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Country</Form.Label>
                        <Form.Control
                          type="text"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          required
                          className="rounded-pill"
                          placeholder="Enter country"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">Delivery Instructions (Optional)</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={deliveryInstructions}
                      onChange={(e) => setDeliveryInstructions(e.target.value)}
                      className="rounded"
                      placeholder="Add any special delivery instructions"
                    />
                  </Form.Group>

                  <Alert variant="info" className="mb-4">
                    <i className="fas fa-info-circle me-2"></i>
                    Your prescription will be reviewed by our pharmacist before processing the order.
                  </Alert>

                  <div className="d-grid">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="rounded-pill"
                      disabled={loadingCreate}
                    >
                      {loadingCreate ? 'Processing...' : 'Place Order'}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <style>
        {`
          .prescription-order-screen {
            background-color: #f8f9fa;
            min-height: 100vh;
          }

          .prescription-upload-area {
            background: #fff;
            border: 2px dashed #dee2e6;
            transition: all 0.3s ease;
          }

          .prescription-upload-area:hover {
            border-color: #0d6efd;
          }

          .upload-label {
            display: block;
            cursor: pointer;
            margin: 0;
            text-align: center;
          }

          .upload-placeholder {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #6c757d;
          }

          .upload-placeholder i {
            font-size: 2rem;
          }

          .img-preview {
            max-width: 100%;
            max-height: 200px;
            object-fit: contain;
          }

          .form-control, .form-select {
            padding: 0.75rem 1.25rem;
            border-color: #e9ecef;
          }

          .form-control:focus, .form-select:focus {
            border-color: #0d6efd;
            box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.15);
          }

          .alert {
            border-radius: 10px;
          }

          .btn-primary {
            padding: 0.75rem 2rem;
          }
        `}
      </style>
    </div>
  );
};

export default PrescriptionOrderScreen; 