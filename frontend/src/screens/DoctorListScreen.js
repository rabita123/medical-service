import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Form, Button, Badge } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { listDoctors } from '../actions/doctorActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const DoctorListScreen = () => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('');

  const dispatch = useDispatch();

  const doctorList = useSelector((state) => state.doctorList);
  const { loading, error, doctors } = doctorList;

  useEffect(() => {
    console.log('Dispatching listDoctors action');
    dispatch(listDoctors());
  }, [dispatch]);

  // Safely handle doctors array
  const safeDoctors = Array.isArray(doctors) ? doctors : [];
  console.log('Safe doctors array:', safeDoctors);

  const filteredDoctors = safeDoctors.filter(doctor =>
    (doctor?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor?.specialization?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!selectedSpeciality || doctor?.specialization === selectedSpeciality)
  );

  // Get unique specialities
  const uniqueSpecialities = Array.from(new Set(
    safeDoctors
      .map(doctor => doctor?.specialization)
      .filter(Boolean)
  ));

  const viewProfileHandler = (id) => {
    history.push(`/doctor/${id}`);
  };

  if (loading) {
    return (
      <Container className="py-5">
        <Loader />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Message variant="danger">
          {error}
          <br />
          <Button 
            variant="outline-primary" 
            className="mt-3"
            onClick={() => dispatch(listDoctors())}
          >
            Try Again
          </Button>
        </Message>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Find Doctors</h1>
      
      <Row className="mb-4">
        <Col md={6} className="mx-auto">
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search doctors by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              value={selectedSpeciality}
              onChange={(e) => setSelectedSpeciality(e.target.value)}
              className="speciality-select"
            >
              <option value="">All Specialities</option>
              {uniqueSpecialities.map((speciality) => (
                <option key={speciality} value={speciality}>
                  {speciality}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      {filteredDoctors.length === 0 ? (
        <Message>No doctors found</Message>
      ) : (
        <Row>
          {filteredDoctors.map((doctor) => (
            <Col key={doctor._id} sm={12} md={6} lg={4} className="mb-4">
              <Card className="h-100 doctor-card">
                <div className="doctor-image-container">
                  <Card.Img
                    variant="top"
                    src={doctor.image || '/assets/img/doctors/doctor-thumb-01.jpg'}
                    alt={doctor.name}
                    className="doctor-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/img/doctors/doctor-thumb-01.jpg';
                    }}
                  />
                  <div className="doctor-overlay">
                    <div className="doctor-quick-info">
                      <div className="quick-info-item">
                        <i className="fas fa-star"></i>
                        <span>{doctor.rating || '4.5'}</span>
                      </div>
                      <div className="quick-info-item">
                        <i className="fas fa-user-md"></i>
                        <span>{doctor.experience || '5+'} Years</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Card.Body>
                  <Card.Title className="doctor-name">{doctor.name}</Card.Title>
                  <div className="doctor-speciality">
                    <Badge bg="info" className="speciality-badge">
                      {doctor.specialization}
                    </Badge>
                  </div>
                  <div className="doctor-info">
                    <div className="info-item">
                      <i className="fas fa-graduation-cap"></i>
                      <span>{doctor.degree}</span>
                    </div>
                    <div className="info-item">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{doctor.location}</span>
                    </div>
                    <div className="info-item price">
                      <i className="fas fa-money-bill"></i>
                      <span>₹{doctor.fees} Consultation</span>
                    </div>
                  </div>
                  <div className="doctor-availability">
                    <small>
                      <i className="fas fa-clock text-success"></i>
                      {' Available '}{doctor.days}
                    </small>
                  </div>
                  <Button
                    variant="primary"
                    className="w-100 book-btn mt-3"
                    onClick={() => viewProfileHandler(doctor._id)}
                  >
                    View Profile
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <style>
        {`
          .doctor-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: none;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            background: white;
          }

          .doctor-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
          }

          .doctor-image-container {
            position: relative;
            height: 250px;
            overflow: hidden;
          }

          .doctor-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
          }

          .doctor-card:hover .doctor-image {
            transform: scale(1.05);
          }

          .doctor-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
            padding: 15px;
            transition: opacity 0.3s ease;
            opacity: 0;
          }

          .doctor-card:hover .doctor-overlay {
            opacity: 1;
          }

          .doctor-quick-info {
            display: flex;
            justify-content: space-between;
            color: white;
          }

          .quick-info-item {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 0.9rem;
          }

          .doctor-name {
            color: #272b41;
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }

          .doctor-speciality {
            margin-bottom: 1rem;
          }

          .speciality-badge {
            font-weight: 500;
            padding: 0.5rem 1rem;
            border-radius: 20px;
          }

          .doctor-info {
            margin: 1rem 0;
          }

          .info-item {
            display: flex;
            align-items: center;
            margin-bottom: 0.5rem;
            color: #757575;
            font-size: 0.9rem;
          }

          .info-item i {
            width: 20px;
            margin-right: 8px;
            color: #15558d;
          }

          .info-item.price {
            font-size: 1.1rem;
            font-weight: 600;
            color: #28a745;
          }

          .doctor-availability {
            color: #757575;
            font-size: 0.9rem;
          }

          .book-btn {
            background: linear-gradient(45deg, #15558d, #6dd5ed);
            border: none;
            padding: 0.75rem;
            font-weight: 500;
            border-radius: 25px;
            transition: all 0.3s ease;
          }

          .book-btn:hover {
            background: linear-gradient(45deg, #124a7b, #5bb8cc);
            transform: translateY(-2px);
          }

          .search-input, .speciality-select {
            border-radius: 25px;
            padding: 0.75rem 1.5rem;
            border: 1px solid #ddd;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
            margin-bottom: 1rem;
          }

          .search-input:focus, .speciality-select:focus {
            box-shadow: 0 4px 6px rgba(21, 85, 141, 0.2);
            border-color: #15558d;
          }
        `}
      </style>
    </Container>
  );
};

export default DoctorListScreen; 