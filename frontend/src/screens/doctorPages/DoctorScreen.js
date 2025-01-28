import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { listDoctors } from '../../actions/doctorActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const DoctorScreen = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const doctorList = useSelector((state) => state.doctorList);
  const { loading, error, doctors } = doctorList;

  useEffect(() => {
    console.log('Dispatching listDoctors action');
    dispatch(listDoctors());
  }, [dispatch]);

  // Debug logging
  useEffect(() => {
    console.log('Doctor List State:', { loading, error, doctors });
  }, [loading, error, doctors]);

  // Filter doctors based on search and specialty
  const filteredDoctors = doctors?.filter(doctor => {
    const matchesSearch = searchTerm === '' || 
      doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty === '' || 
      doctor.specialization === selectedSpecialty;
    
    return matchesSearch && matchesSpecialty;
  }) || [];

  // Get unique specialties
  const specialties = [...new Set(doctors?.map(doctor => doctor.specialization).filter(Boolean) || [])];

  return (
    <div className="main-wrapper">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <Container>
          <Row className="align-items-center">
            <Col md={12}>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    Find Doctors
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Find Doctors</h2>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Page Content */}
      <div className="content">
        <Container>
          {/* Search and Filter Section */}
          <Row className="mb-4">
            <Col md={6} lg={4}>
              <div className="search-box">
                <Form.Control
                  type="text"
                  placeholder="Search doctors by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <i className="fas fa-search search-icon"></i>
              </div>
            </Col>
            <Col md={6} lg={4}>
              <Form.Select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="specialty-select"
              >
                <option value="">All Specialties</option>
                {specialties.map((specialty, index) => (
                  <option key={index} value={specialty}>{specialty}</option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          {/* Doctors List */}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : !doctors || doctors.length === 0 ? (
            <Message>No doctors found</Message>
          ) : (
            <>
              <Row className="doctors-count mb-4">
                <Col>
                  <h3>
                    {filteredDoctors.length} {filteredDoctors.length === 1 ? 'Doctor' : 'Doctors'} Found
                  </h3>
                </Col>
              </Row>
              <Row>
                {filteredDoctors.map((doctor) => (
                  <Col key={doctor._id} md={6} lg={4} className="mb-4">
                    <Card className="doctor-card">
                      <Card.Body>
                        <div className="doctor-img-wrapper">
                          <div className="doctor-img">
                            <img
                              src={doctor.image || '/assets/img/doctors/doctor-thumb-01.jpg'}
                              alt={doctor.name}
                              className="img-fluid"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/assets/img/doctors/doctor-thumb-01.jpg';
                              }}
                            />
                          </div>
                          {doctor.isAvailable && (
                            <span className="available-badge">
                              <i className="fas fa-check-circle"></i> Available
                            </span>
                          )}
                        </div>
                        <div className="doctor-content">
                          <h4 className="doctor-name">{doctor.name}</h4>
                          <p className="doctor-speciality">{doctor.specialization}</p>
                          <div className="doctor-info">
                            {doctor.degree && (
                              <p><i className="fas fa-graduation-cap"></i> {doctor.degree}</p>
                            )}
                            {doctor.experience && (
                              <p><i className="fas fa-clock"></i> {doctor.experience} Years Experience</p>
                            )}
                            {doctor.location && (
                              <p><i className="fas fa-map-marker-alt"></i> {doctor.location}</p>
                            )}
                            {doctor.fees && (
                              <p><i className="fas fa-money-bill"></i> {doctor.fees} BDT</p>
                            )}
                          </div>
                          <div className="doctor-action">
                            <Link to={`/doctor/${doctor._id}`} className="btn btn-primary">
                              View Profile
                            </Link>
                            <Link to={`/booking-appointment/${doctor._id}`} className="btn btn-outline-primary">
                              Book Appointment
                            </Link>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Container>
      </div>

      <style>
        {`
          .breadcrumb-bar {
            background: linear-gradient(45deg, #2193b0, #6dd5ed);
            padding: 30px 0;
            margin-bottom: 40px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          }

          .breadcrumb {
            background: transparent;
            margin: 0;
            padding: 0;
          }

          .breadcrumb-item a {
            color: #fff;
            opacity: 0.8;
            text-decoration: none;
            transition: opacity 0.3s;
          }

          .breadcrumb-item a:hover {
            opacity: 1;
          }

          .breadcrumb-item.active {
            color: #fff;
          }

          .breadcrumb-title {
            color: #fff;
            margin: 10px 0 0;
            font-size: 2rem;
            font-weight: 600;
          }

          .search-box {
            position: relative;
          }

          .search-input {
            padding: 12px 20px;
            padding-right: 40px;
            border-radius: 8px;
            border: 1px solid #e0e0e0;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }

          .search-icon {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #2193b0;
          }

          .specialty-select {
            padding: 12px 20px;
            border-radius: 8px;
            border: 1px solid #e0e0e0;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }

          .doctors-count h3 {
            color: #272b41;
            font-size: 1.5rem;
            font-weight: 600;
          }

          .doctor-card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            overflow: hidden;
          }

          .doctor-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
          }

          .doctor-img-wrapper {
            position: relative;
            margin-bottom: 20px;
          }

          .doctor-img {
            width: 140px;
            height: 140px;
            margin: 0 auto;
            border-radius: 50%;
            overflow: hidden;
            border: 4px solid #fff;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          }

          .doctor-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .available-badge {
            position: absolute;
            bottom: 0;
            right: 50%;
            transform: translateX(50%);
            background: #28a745;
            color: #fff;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.8rem;
            display: flex;
            align-items: center;
            gap: 5px;
          }

          .doctor-content {
            text-align: center;
            padding: 0 15px;
          }

          .doctor-name {
            color: #272b41;
            font-size: 1.3rem;
            font-weight: 600;
            margin: 15px 0 10px;
          }

          .doctor-speciality {
            color: #2193b0;
            font-size: 1rem;
            font-weight: 500;
            margin-bottom: 20px;
          }

          .doctor-info {
            text-align: left;
            margin-bottom: 20px;
          }

          .doctor-info p {
            color: #555;
            font-size: 0.9rem;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
          }

          .doctor-info i {
            color: #2193b0;
            width: 20px;
            margin-right: 10px;
          }

          .doctor-action {
            display: flex;
            gap: 10px;
            margin-top: 25px;
          }

          .doctor-action .btn {
            flex: 1;
            padding: 10px;
            border-radius: 8px;
            font-weight: 500;
            transition: all 0.3s ease;
          }

          .btn-primary {
            background: #2193b0;
            border-color: #2193b0;
          }

          .btn-primary:hover {
            background: #1a7a8e;
            border-color: #1a7a8e;
          }

          .btn-outline-primary {
            color: #2193b0;
            border-color: #2193b0;
          }

          .btn-outline-primary:hover {
            background: #2193b0;
            color: #fff;
          }

          .content {
            padding: 40px 0;
            min-height: calc(100vh - 200px);
            background: #f8f9fa;
          }

          @media (max-width: 768px) {
            .doctor-action {
              flex-direction: column;
            }
            
            .search-box, .specialty-select {
              margin-bottom: 15px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default DoctorScreen;
