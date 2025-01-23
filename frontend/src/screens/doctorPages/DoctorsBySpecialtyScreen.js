import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { listDoctorsBySpeciality } from '../../actions/doctorActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Header from '../../components/Header';

const DoctorsBySpecialtyScreen = () => {
  const dispatch = useDispatch();
  const { specialty } = useParams();

  const doctorListBySpecialist = useSelector((state) => state.doctorListBySpeciality);
  const { loading, error, doctors } = doctorListBySpecialist;

  useEffect(() => {
    dispatch(listDoctorsBySpeciality(specialty));
  }, [dispatch, specialty]);

  const formatSpecialtyName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className="main-wrapper">
      <Header />

      <div className="breadcrumb-bar">
        <Container fluid>
          <Row className="align-items-center">
            <Col md={12}>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/doctors">Doctors</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {formatSpecialtyName(specialty)}
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">
                {formatSpecialtyName(specialty)} Specialists
              </h2>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="content">
        <Container>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : doctors?.length === 0 ? (
            <Message>No doctors found for this specialty</Message>
          ) : (
            <Row>
              {doctors?.map((doctor) => (
                <Col key={doctor._id} md={6} lg={4} className="mb-4">
                  <Card className="doctor-card h-100">
                    <div className="doctor-img">
                      <img
                        src={doctor.image || '/assets/img/doctors/doctor-thumb-01.jpg'}
                        className="img-fluid"
                        alt={doctor.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/assets/img/doctors/doctor-thumb-01.jpg';
                        }}
                      />
                    </div>
                    <Card.Body>
                      <h4 className="doctor-name">{doctor.name}</h4>
                      <p className="doctor-speciality">{doctor.specialization}</p>
                      <div className="doctor-details">
                        {doctor.degree && (
                          <p className="mb-2">
                            <i className="fas fa-graduation-cap"></i> {doctor.degree}
                          </p>
                        )}
                        {doctor.fees && (
                          <p className="mb-2">
                            <i className="fas fa-money-bill-alt"></i> Fees: {doctor.fees} BDT
                          </p>
                        )}
                        {doctor.location && (
                          <p className="mb-2">
                            <i className="fas fa-map-marker-alt"></i> {doctor.location}
                          </p>
                        )}
                        {doctor.days && (
                          <p className="mb-2">
                            <i className="fas fa-calendar-alt"></i> Available: {doctor.days}
                          </p>
                        )}
                        {doctor.times && (
                          <p className="mb-2">
                            <i className="fas fa-clock"></i> Times: {doctor.times}
                          </p>
                        )}
                      </div>
                      <div className="doctor-actions mt-3">
                        <Link
                          to={`/doctor/${doctor._id}`}
                          className="btn btn-outline-primary btn-sm me-2"
                        >
                          View Profile
                        </Link>
                        <Link
                          to={`/booking-appointment/${doctor._id}`}
                          className="btn btn-primary btn-sm"
                        >
                          Book Appointment
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </div>

      <style>
        {`
          .doctor-card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
          }

          .doctor-card:hover {
            transform: translateY(-5px);
          }

          .doctor-img {
            height: 200px;
            overflow: hidden;
            border-radius: 15px 15px 0 0;
          }

          .doctor-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .doctor-name {
            color: #2193b0;
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }

          .doctor-speciality {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 1rem;
          }

          .doctor-details p {
            color: #555;
            font-size: 0.9rem;
          }

          .doctor-details i {
            width: 20px;
            color: #2193b0;
          }

          .doctor-actions {
            display: flex;
            gap: 0.5rem;
          }

          .btn-outline-primary {
            color: #2193b0;
            border-color: #2193b0;
          }

          .btn-outline-primary:hover {
            background: #2193b0;
            color: white;
          }

          .btn-primary {
            background: #2193b0;
            border-color: #2193b0;
          }

          .btn-primary:hover {
            background: #1c7a94;
            border-color: #1c7a94;
          }

          .breadcrumb-bar {
            background-color: #2193b0;
            padding: 15px 0;
            margin-bottom: 40px;
          }

          .breadcrumb {
            background: transparent;
            margin: 0;
          }

          .breadcrumb-item a {
            color: #fff;
            opacity: 0.7;
          }

          .breadcrumb-item.active {
            color: #fff;
          }

          .breadcrumb-title {
            color: #fff;
            margin: 0;
            font-size: 1.75rem;
          }
        `}
      </style>
    </div>
  );
};

export default DoctorsBySpecialtyScreen; 