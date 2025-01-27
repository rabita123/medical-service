import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { listSpecialists } from "../../actions/specialistActions";
import { listDoctors, listDoctorsBySpeciality } from "../../actions/doctorActions";
import { Container, Row, Col, Card } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Header from "../../components/Header";

const DoctorScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  const specialist = useSelector((state) => state.specialistList);
  const { loading: loadingSpecialists, error: errorSpecialists, specialists } = specialist;

  const doctorList = useSelector((state) => state.doctorList);
  const { loading: loadingDoctors, error: errorDoctors, doctors } = doctorList;

  const doctorListBySpecialist = useSelector((state) => state.doctorListBySpeciality);
  const { 
    loading: loadingSpecialtyDoctors, 
    error: errorSpecialtyDoctors, 
    doctors: specialtyDoctors 
  } = doctorListBySpecialist;

  useEffect(() => {
    dispatch(listSpecialists());
    dispatch(listDoctors());
  }, [dispatch]);

  const handleSpecialtyClick = (specialtyId) => {
    setSelectedSpecialty(specialtyId);
    dispatch(listDoctorsBySpeciality(specialtyId));
  };

  const handleShowAll = () => {
    setSelectedSpecialty(null);
  };

  const checkoutHandler = (id) => {
    history.push(`/login?redirect=booking-appointment/${id}`);
  };

  const displayedDoctors = selectedSpecialty ? specialtyDoctors : doctors;

  return (
    <div className="main-wrapper">
      <Header />

      <div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-12 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Find Doctors
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Find Doctors</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <Container fluid>
          <Row>
            <Col md={3}>
              <Card className="search-filter">
                <Card.Body>
                  <h4 className="mb-4">Filter by Specialty</h4>
                  <div className="specialty-list">
                    <div 
                      className={`specialty-item ${!selectedSpecialty ? 'active' : ''}`}
                      onClick={handleShowAll}
                    >
                      All Doctors
                    </div>
                    {loadingSpecialists ? (
                      <Loader />
                    ) : errorSpecialists ? (
                      <Message variant="danger">{errorSpecialists}</Message>
                    ) : (
                      specialists.map((specialty) => (
                        <div
                          key={specialty._id}
                          className={`specialty-item ${selectedSpecialty === specialty._id ? 'active' : ''}`}
                          onClick={() => handleSpecialtyClick(specialty._id)}
                        >
                          {specialty.name}
                        </div>
                      ))
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={9}>
              {(loadingDoctors || loadingSpecialtyDoctors) ? (
                <Loader />
              ) : (errorDoctors || errorSpecialtyDoctors) ? (
                <Message variant="danger">
                  {errorDoctors || errorSpecialtyDoctors}
                </Message>
              ) : displayedDoctors?.length === 0 ? (
                <Message>No doctors found</Message>
              ) : (
                <Row>
                  {displayedDoctors?.map((doctor) => (
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
                            <button
                              onClick={() => checkoutHandler(doctor._id)}
                              className="btn btn-primary btn-sm"
                            >
                              Book Appointment
                            </button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <style>
        {`
          .specialty-list {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .specialty-item {
            padding: 0.75rem 1rem;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            background: #f8f9fa;
          }

          .specialty-item:hover {
            background: #e9ecef;
          }

          .specialty-item.active {
            background: #2193b0;
            color: white;
          }

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
        `}
      </style>
    </div>
  );
};

export default withRouter(DoctorScreen);
