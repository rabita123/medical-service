import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { listMedications } from '../../actions/pharmacyActions';

const PharmacyScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();

  const medicationList = useSelector((state) => state.medicationList);
  const { loading, error, medications } = medicationList;

  useEffect(() => {
    dispatch(listMedications());
  }, [dispatch]);

  const filteredMedications = medications?.filter(
    (medication) =>
      medication.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === '' || medication.category === category)
  );

  const categories = medications
    ? [...new Set(medications.map((med) => med.category))]
    : [];

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Online Pharmacy</h1>

      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search medications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="category-select"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {filteredMedications?.map((medication) => (
            <Col key={medication._id} sm={12} md={6} lg={4} xl={3}>
              <Card className="mb-4 medication-card">
                <Card.Body>
                  <Card.Title className="medication-name">
                    {medication.name}
                  </Card.Title>
                  <Card.Text className="medication-category">
                    {medication.category}
                  </Card.Text>
                  <Card.Text className="medication-description">
                    {medication.description}
                  </Card.Text>
                  <Card.Text className="medication-price">
                    ₹{medication.price}
                  </Card.Text>
                  {medication.requiresPrescription ? (
                    <div className="prescription-badge">
                      Requires Prescription
                    </div>
                  ) : null}
                  <div className="d-grid">
                    <Link
                      to={`/pharmacy/order/${medication._id}`}
                      className="btn btn-primary mt-3"
                    >
                      Order Now
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <style>
        {`
          .medication-card {
            height: 100%;
            border: none;
            border-radius: 15px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
          }

          .medication-card:hover {
            transform: translateY(-5px);
          }

          .medication-name {
            color: #2193b0;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }

          .medication-category {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 1rem;
          }

          .medication-description {
            color: #444;
            font-size: 0.95rem;
            margin-bottom: 1rem;
          }

          .medication-price {
            color: #28a745;
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }

          .prescription-badge {
            background: #ffeeba;
            color: #856404;
            padding: 0.25rem 0.5rem;
            border-radius: 20px;
            font-size: 0.8rem;
            display: inline-block;
            margin-bottom: 1rem;
          }

          .search-input, .category-select {
            border-radius: 25px;
            padding: 0.75rem 1.5rem;
            border: 1px solid #ddd;
          }

          .search-input:focus, .category-select:focus {
            border-color: #2193b0;
            box-shadow: 0 0 0 0.2rem rgba(33, 147, 176, 0.25);
          }

          .btn-primary {
            background: linear-gradient(45deg, #2193b0, #6dd5ed);
            border: none;
            border-radius: 25px;
            padding: 0.75rem;
            font-weight: 500;
            transition: all 0.3s ease;
          }

          .btn-primary:hover {
            background: linear-gradient(45deg, #1c7a94, #5bb8cc);
            transform: translateY(-2px);
          }
        `}
      </style>
    </Container>
  );
};

export default PharmacyScreen; 