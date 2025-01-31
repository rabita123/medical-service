import React, { useState, useEffect } from 'react';
import axios from '../../config/axios';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { listMedications, createPrescriptionOrder } from '../../actions/pharmacyActions';
import { PRESCRIPTION_ORDER_CREATE_RESET } from '../../constants/pharmacyConstants';

const AddPrescriptionOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [medication, setMedication] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [prescriptionImage, setPrescriptionImage] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [uploading, setUploading] = useState(false);

  const userLogin = useSelector((state) => {
    console.log('User login state:', state.userLogin);
    return state.userLogin;
  });
  const { userInfo } = userLogin;

  const medicationList = useSelector((state) => {
    console.log('Medication list state:', state.medicationList);
    return state.medicationList || { loading: false, medications: [] };
  });
  const { loading: loadingMedications, error: errorMedications, medications = [] } = medicationList;

  const prescriptionOrderCreate = useSelector((state) => state.prescriptionOrderCreate);
  const { loading, error, success } = prescriptionOrderCreate;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    dispatch(listMedications());
  }, [dispatch, navigate, userInfo]);

  const uploadFileHandler = async (e) => {
    console.log('Starting file upload');
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post('/api/upload/prescription', formData, config);
      console.log('Upload successful:', data);
      setPrescriptionImage(data);
      setUploading(false);
    } catch (error) {
      console.error('Upload error:', error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createPrescriptionOrder({
      medication,
      quantity,
      prescriptionImage,
      deliveryAddress,
    }));
    navigate('/prescription-orders');
  };

  console.log('Rendering component with medications:', medications);

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h2 className="mb-0">Add New Prescription Order</h2>
            </Card.Header>
            <Card.Body>
              {loading && <Loader />}
              {error && <Message variant="danger">{error}</Message>}

              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Medication</Form.Label>
                  {loadingMedications ? (
                    <Loader />
                  ) : errorMedications ? (
                    <Message variant="danger">{errorMedications}</Message>
                  ) : (
                    <Form.Select
                      value={medication}
                      onChange={(e) => setMedication(e.target.value)}
                      required
                      className="form-control-lg"
                    >
                      <option value="">Choose Medication...</option>
                      {medications.map((med) => (
                        <option key={med._id} value={med._id}>
                          {med.name}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    className="form-control-lg"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Upload Prescription</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={uploadFileHandler}
                    required
                    className="form-control-lg"
                  />
                  {uploading && <Loader />}
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Delivery Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    required
                    className="form-control-lg"
                    placeholder="Enter complete delivery address"
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg"
                    disabled={loading || uploading}
                  >
                    {loading ? 'Creating Order...' : 'Create Order'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddPrescriptionOrderScreen; 