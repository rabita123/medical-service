import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, Container } from "react-bootstrap";
import { getDoctorDetails } from "../../actions/doctorActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Header from '../../components/Header';

const DoctorProfileScreen = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const doctorDetails = useSelector((state) => state.doctorDetails);
  const { loading, error, doctor } = doctorDetails;

  useEffect(() => {
    if (!id) {
      history.push('/doctors');
    } else {
      dispatch(getDoctorDetails(id));
    }
  }, [dispatch, id, history]);

  const handleBookAppointment = () => {
    history.push(`/booking-appointment/${id}`);
  };

  // Sample detailed doctor data (you should replace this with actual data from your backend)
  const doctorData = {
    ...doctor,
    bio: doctor?.bio || `Dr. ${doctor?.name || 'John Smith'} is a highly qualified and experienced medical professional specializing in ${doctor?.specialization || 'medicine'}. With years of dedicated service in healthcare, they are committed to providing exceptional patient care and staying at the forefront of medical advancements.`,
    education: doctor?.education || [
      {
        degree: "Doctor of Medicine (MD)",
        institution: "Harvard Medical School",
        year: "2010"
      },
      {
        degree: "Residency in Internal Medicine",
        institution: "Massachusetts General Hospital",
        year: "2013"
      },
      {
        degree: "Fellowship in Cardiology",
        institution: "Johns Hopkins Hospital",
        year: "2015"
      }
    ],
    specialties: doctor?.specialties || [
      "General Medicine",
      "Cardiology",
      "Internal Medicine",
      "Critical Care"
    ],
    experience: doctor?.experience || [
      {
        position: "Senior Cardiologist",
        hospital: "City General Hospital",
        duration: "2015 - Present",
        description: "Leading the cardiology department and managing complex cardiac cases"
      },
      {
        position: "Consultant Physician",
        hospital: "Medical Center",
        duration: "2013 - 2015",
        description: "Provided comprehensive patient care and conducted medical research"
      }
    ],
    awards: doctor?.awards || [
      "Excellence in Medical Service Award (2019)",
      "Best Physician of the Year (2018)",
      "Research Excellence Award (2017)"
    ],
    publications: doctor?.publications || [
      {
        title: "Advanced Cardiac Care Techniques",
        journal: "Medical Science Journal",
        year: "2020"
      },
      {
        title: "Modern Approaches in Internal Medicine",
        journal: "Healthcare Review",
        year: "2019"
      }
    ]
  };

  if (loading) return (
    <>
      <Header />
      <Container className="py-5">
        <Loader />
      </Container>
    </>
  );

  if (error) return (
    <>
      <Header />
      <Container className="py-5">
        <Message variant="danger">{error}</Message>
      </Container>
    </>
  );

  if (!doctor) return (
    <>
      <Header />
      <Container className="py-5">
        <Message>Doctor not found</Message>
      </Container>
    </>
  );

  return (
    <>
      <Header />
      <Container className="py-5">
        <Row>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Img
                variant="top"
                src={doctorData.image || 'https://via.placeholder.com/300x300?text=Doctor'}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x300?text=Doctor';
                }}
                alt={doctorData.name}
                className="doctor-profile-img"
              />
              <Card.Body className="text-center">
                <Card.Title as="h3">{doctorData.name || 'Doctor Name'}</Card.Title>
                <Card.Subtitle className="mb-3 text-muted">
                  {doctorData.specialization || 'Specialization'}
                </Card.Subtitle>
                <Button
                  variant="primary"
                  className="w-100 mb-2"
                  onClick={handleBookAppointment}
                >
                  Book Appointment
                </Button>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Contact Information</Card.Title>
                <ListGroup variant="flush">
                  {doctorData.email && (
                    <ListGroup.Item>
                      <i className="fas fa-envelope me-2"></i>
                      {doctorData.email}
                    </ListGroup.Item>
                  )}
                  {doctorData.phone && (
                    <ListGroup.Item>
                      <i className="fas fa-phone me-2"></i>
                      {doctorData.phone}
                    </ListGroup.Item>
                  )}
                  {doctorData.address && (
                    <ListGroup.Item>
                      <i className="fas fa-map-marker-alt me-2"></i>
                      {doctorData.address}
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Awards & Recognition</Card.Title>
                <ListGroup variant="flush">
                  {doctorData.awards.map((award, index) => (
                    <ListGroup.Item key={index}>
                      <i className="fas fa-award me-2 text-warning"></i>
                      {award}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>About</Card.Title>
                <Card.Text>{doctorData.bio}</Card.Text>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Specializations</Card.Title>
                <div className="d-flex flex-wrap gap-2">
                  {doctorData.specialties.map((specialty, index) => (
                    <span key={index} className="badge bg-primary">
                      {specialty}
                    </span>
                  ))}
                </div>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Education</Card.Title>
                <ListGroup variant="flush">
                  {doctorData.education.map((edu, index) => (
                    <ListGroup.Item key={index}>
                      <h6>{edu.degree}</h6>
                      <p className="text-muted mb-0">
                        {edu.institution} ({edu.year})
                      </p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Professional Experience</Card.Title>
                <ListGroup variant="flush">
                  {doctorData.experience.map((exp, index) => (
                    <ListGroup.Item key={index}>
                      <h6>{exp.position}</h6>
                      <p className="text-muted mb-1">{exp.hospital} | {exp.duration}</p>
                      <p className="mb-0">{exp.description}</p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <Card.Title>Publications</Card.Title>
                <ListGroup variant="flush">
                  {doctorData.publications.map((pub, index) => (
                    <ListGroup.Item key={index}>
                      <h6>{pub.title}</h6>
                      <p className="text-muted mb-0">
                        {pub.journal} ({pub.year})
                      </p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <style>
        {`
          .doctor-profile-img {
            height: 300px;
            object-fit: cover;
          }

          .badge {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }

          .card {
            border: none;
            box-shadow: 0 0 15px rgba(0,0,0,0.1);
            margin-bottom: 1.5rem;
          }

          .list-group-item {
            border: none;
            padding: 1rem 0;
          }

          .list-group-item:not(:last-child) {
            border-bottom: 1px solid rgba(0,0,0,0.1);
          }

          .btn-primary {
            padding: 0.75rem 1.5rem;
            font-weight: 600;
          }

          h6 {
            color: #2193b0;
            font-weight: 600;
          }

          .text-muted {
            color: #6c757d !important;
          }

          .card-title {
            color: #1a2980;
            font-weight: 700;
            margin-bottom: 1.5rem;
          }
        `}
      </style>
    </>
  );
};

export default DoctorProfileScreen;
