import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { getDoctorDetails } from '../actions/doctorActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const DoctorScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const doctorDetails = useSelector((state) => state.doctorDetails);
  const { loading, error, doctor } = doctorDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(getDoctorDetails(match.params.id));
    }
  }, [dispatch, history, userInfo, match]);

  const bookAppointmentHandler = () => {
    history.push(`/booking-appointment/${match.params.id}`);
  };

  return (
    <div className="main-wrapper">
      <div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-12 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Doctor Profile
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Doctor Profile</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <Container>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : !doctor ? (
            <Message variant="info">No doctor profile found</Message>
          ) : (
            <Row>
              <Col md={6}>
                <Card>
                  <Card.Body>
                    <div className="doctor-img mb-3">
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
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <h3>{doctor.name}</h3>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Specialization:</strong> {doctor.specialization}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Degree:</strong> {doctor.degree}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Location:</strong> {doctor.location}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Consultation Fee:</strong> {doctor.fees} BDT
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card>
                  <Card.Body>
                    <h4 className="mb-4">Schedule & Availability</h4>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Available Days:</Col>
                          <Col>
                            <strong>{doctor.days}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Timings:</Col>
                          <Col>
                            <strong>{doctor.times}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Button
                          onClick={bookAppointmentHandler}
                          className="btn-block"
                          type="button"
                        >
                          Book Appointment
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </div>
  );
};

export default withRouter(DoctorScreen); 