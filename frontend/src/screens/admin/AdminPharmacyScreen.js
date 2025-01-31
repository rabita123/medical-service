import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Row, Col, Modal, Form, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { listMedications, createMedication } from '../../actions/pharmacyActions';
import { MEDICATION_CREATE_RESET } from '../../constants/pharmacyConstants';
import Header from '../../components/Header';

const AdminPharmacyScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [manufacturer, setManufacturer] = useState('');
  const [dosageForm, setDosageForm] = useState('');
  const [strength, setStrength] = useState('');
  const [requiresPrescription, setRequiresPrescription] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const medicationList = useSelector((state) => state.medicationList);
  const { loading, error, medications } = medicationList;

  const medicationCreate = useSelector((state) => state.medicationCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = medicationCreate;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    } else {
      dispatch(listMedications());
    }

    if (successCreate) {
      dispatch({ type: MEDICATION_CREATE_RESET });
      setShowModal(false);
      resetForm();
    }
  }, [dispatch, navigate, userInfo, successCreate]);

  const resetForm = () => {
    setName('');
    setDescription('');
    setCategory('');
    setPrice(0);
    setStockQuantity(0);
    setManufacturer('');
    setDosageForm('');
    setStrength('');
    setRequiresPrescription(false);
  };

  const handleClose = () => {
    setShowModal(false);
    resetForm();
  };

  const handleShow = () => setShowModal(true);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createMedication({
        name,
        description,
        category,
        price: Number(price),
        stockQuantity: Number(stockQuantity),
        manufacturer,
        dosageForm,
        strength,
        requiresPrescription,
      })
    );
  };

  return (
    <div className="admin-pharmacy-screen">
      <Header />
      <Container fluid className="px-4 py-4">
        <Card className="shadow-sm">
          <Card.Body>
            <Row className='align-items-center mb-4'>
              <Col>
                <h2 className="text-primary mb-0">Pharmacy Management</h2>
              </Col>
              <Col className='text-end'>
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={handleShow}
                  className="rounded-pill shadow-sm"
                >
                  <i className='fas fa-plus me-2'></i> Add New Medication
                </Button>
              </Col>
            </Row>

            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <div className="table-responsive">
                <Table hover className="align-middle table-borderless custom-table">
                  <thead className="bg-light">
                    <tr>
                      <th className="py-3">ID</th>
                      <th className="py-3">NAME</th>
                      <th className="py-3">CATEGORY</th>
                      <th className="py-3">PRICE</th>
                      <th className="py-3">STOCK</th>
                      <th className="py-3">PRESCRIPTION</th>
                      <th className="py-3">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medications?.map((medication) => (
                      <tr key={medication._id} className="border-bottom">
                        <td className="py-3">{medication._id}</td>
                        <td className="py-3 fw-bold">{medication.name}</td>
                        <td className="py-3">
                          <span className="badge bg-info text-white">
                            {medication.category}
                          </span>
                        </td>
                        <td className="py-3">${medication.price}</td>
                        <td className="py-3">
                          <span className={`badge ${medication.stockQuantity > 0 ? 'bg-success' : 'bg-danger'}`}>
                            {medication.stockQuantity}
                          </span>
                        </td>
                        <td className="py-3">
                          {medication.requiresPrescription ? (
                            <span className="badge bg-warning">Required</span>
                          ) : (
                            <span className="badge bg-success">Not Required</span>
                          )}
                        </td>
                        <td className="py-3">
                          <div className="d-flex gap-2">
                            <Button
                              variant='outline-primary'
                              className='btn-sm rounded-pill'
                              onClick={() => navigate(`/admin/medication/${medication._id}/edit`)}
                            >
                              <i className='fas fa-edit'></i>
                            </Button>
                            <Button
                              variant='outline-danger'
                              className='btn-sm rounded-pill'
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this medication?')) {
                                  // Add delete functionality here
                                }
                              }}
                            >
                              <i className='fas fa-trash'></i>
                            </Button>
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

        <Modal show={showModal} onHide={handleClose} size="lg" centered>
          <Modal.Header closeButton className="border-0 pb-0">
            <Modal.Title className="text-primary">Add New Medication</Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-0">
            <Form onSubmit={submitHandler}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId='name'>
                    <Form.Label className="text-muted fw-bold">Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="rounded-pill"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId='category'>
                    <Form.Label className="text-muted fw-bold">Category</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter category'
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                      className="rounded-pill"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId='description'>
                <Form.Label className="text-muted fw-bold">Description</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={3}
                  placeholder='Enter description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="rounded"
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId='price'>
                    <Form.Label className="text-muted fw-bold">Price</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='Enter price'
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      className="rounded-pill"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId='stockQuantity'>
                    <Form.Label className="text-muted fw-bold">Stock Quantity</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='Enter stock quantity'
                      value={stockQuantity}
                      onChange={(e) => setStockQuantity(e.target.value)}
                      required
                      className="rounded-pill"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId='manufacturer'>
                    <Form.Label className="text-muted fw-bold">Manufacturer</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter manufacturer'
                      value={manufacturer}
                      onChange={(e) => setManufacturer(e.target.value)}
                      required
                      className="rounded-pill"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId='dosageForm'>
                    <Form.Label className="text-muted fw-bold">Dosage Form</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter dosage form'
                      value={dosageForm}
                      onChange={(e) => setDosageForm(e.target.value)}
                      required
                      className="rounded-pill"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group className="mb-3" controlId='strength'>
                    <Form.Label className="text-muted fw-bold">Strength</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter strength'
                      value={strength}
                      onChange={(e) => setStrength(e.target.value)}
                      required
                      className="rounded-pill"
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="d-flex align-items-center">
                  <Form.Group className="mb-3" controlId='requiresPrescription'>
                    <Form.Check
                      type='checkbox'
                      label='Requires Prescription'
                      checked={requiresPrescription}
                      onChange={(e) => setRequiresPrescription(e.target.checked)}
                      className="custom-checkbox"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex justify-content-end gap-2">
                <Button 
                  variant="light" 
                  onClick={handleClose}
                  className="rounded-pill px-4"
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  type="submit"
                  className="rounded-pill px-4"
                >
                  Add Medication
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>

      <style>
        {`
          .admin-pharmacy-screen {
            background-color: #f8f9fa;
            min-height: 100vh;
          }

          .custom-table {
            background: white;
            border-radius: 10px;
          }

          .custom-table thead th {
            font-weight: 600;
            color: #495057;
            border: none;
          }

          .custom-table tbody tr {
            transition: all 0.3s ease;
          }

          .custom-table tbody tr:hover {
            background-color: #f8f9fa;
          }

          .badge {
            padding: 8px 12px;
            font-weight: 500;
            border-radius: 30px;
          }

          .btn-sm {
            width: 32px;
            height: 32px;
            padding: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .custom-checkbox .form-check-input:checked {
            background-color: #0d6efd;
            border-color: #0d6efd;
          }

          .form-control {
            padding: 0.75rem 1.25rem;
            border-color: #e9ecef;
          }

          .form-control:focus {
            border-color: #0d6efd;
            box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.15);
          }

          .modal-content {
            border: none;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>
    </div>
  );
};

export default AdminPharmacyScreen; 