import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { listDoctorsProfile } from "../../actions/doctorProfileActions";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const DoctorProfileScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const doctorProfileList = useSelector((state) => state.doctorProfileList);
  const { loading, error, doctorsprofiles: doctor } = doctorProfileList;

  useEffect(() => {
    if (id) {
      dispatch(listDoctorsProfile(id));
    }
  }, [dispatch, id]);

  const checkoutHandler = (doctorId) => {
    if (!userInfo) {
      navigate(`/login?redirect=/booking-appointment/${doctorId}`);
    } else {
      navigate(`/booking-appointment/${doctorId}`);
    }
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
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/doctors">Doctors</Link>
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
        <div className="container">
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : !doctor ? (
            <Message variant="info">No doctor profile found</Message>
          ) : (
            <>
              <div className="card doctor-profile-card">
                <div className="card-body">
                  <div className="doctor-widget">
                    <div className="doc-info-left">
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
                      <div className="doc-info-cont">
                        <h4 className="doc-name mb-2">{doctor.name || 'Doctor'}</h4>
                        <p className="doc-speciality mb-2">{doctor.degree || 'Medical Professional'}</p>
                        {doctor.specialization && (
                          <p className="doc-department mb-3">
                            <img
                              src="/assets/img/specialities/specialities-05.png"
                              className="img-fluid me-2"
                              alt="Speciality"
                              style={{ width: '24px', height: '24px' }}
                            />
                            {doctor.specialization}
                          </p>
                        )}
                        <div className="clinic-details">
                          {doctor.location && (
                            <p className="doc-location mb-2">
                              <i className="fas fa-map-marker-alt me-2"></i>
                              {doctor.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="doc-info-right">
                      <div className="clini-infos">
                        <ul>
                          {doctor.fees && (
                            <li>
                              <i className="far fa-money-bill-alt me-2"></i>
                              <span className="info-title">Consultation Fee:</span>
                              <span className="info-value">{doctor.fees} BDT</span>
                            </li>
                          )}
                          {doctor.days && (
                            <li>
                              <i className="far fa-calendar-alt me-2"></i>
                              <span className="info-title">Available Days:</span>
                              <span className="info-value">{doctor.days}</span>
                            </li>
                          )}
                          {doctor.times && (
                            <li>
                              <i className="far fa-clock me-2"></i>
                              <span className="info-title">Consultation Hours:</span>
                              <span className="info-value">{doctor.times}</span>
                            </li>
                          )}
                        </ul>
                      </div>
                      <div className="clinic-booking">
                        <button
                          className="btn btn-primary apt-btn"
                          onClick={() => checkoutHandler(doctor._id)}
                        >
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="doctor-description">
                    <h5 className="card-title mb-3">About Doctor</h5>
                    <p className="mb-0">
                      {doctor.description || 'A dedicated healthcare professional committed to providing quality medical care to patients.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <h5 className="card-title mb-3">Services Offered</h5>
                  <div className="service-list">
                    <ul className="list-unstyled">
                      {doctor.services ? (
                        doctor.services.map((service, index) => (
                          <li key={index}>
                            <i className="fas fa-check-circle text-success me-2"></i>
                            {service}
                          </li>
                        ))
                      ) : (
                        <>
                          <li><i className="fas fa-check-circle text-success me-2"></i>General Consultation</li>
                          <li><i className="fas fa-check-circle text-success me-2"></i>Diagnosis & Treatment</li>
                          <li><i className="fas fa-check-circle text-success me-2"></i>Medical Prescriptions</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <style>
        {`
          .doctor-profile-card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
            margin-bottom: 25px;
          }

          .doctor-widget {
            display: flex;
            flex-wrap: wrap;
            gap: 30px;
          }

          .doc-info-left {
            flex: 1;
            min-width: 300px;
            display: flex;
            gap: 20px;
          }

          .doctor-img {
            width: 150px;
            height: 150px;
            overflow: hidden;
            border-radius: 10px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
          }

          .doctor-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .doc-info-cont {
            flex: 1;
          }

          .doc-name {
            color: #272b41;
            font-size: 1.5rem;
            font-weight: 600;
          }

          .doc-speciality {
            color: #757575;
            font-size: 1rem;
          }

          .doc-department {
            display: flex;
            align-items: center;
            color: #2193b0;
            font-weight: 500;
          }

          .doc-info-right {
            flex: 1;
            min-width: 300px;
          }

          .clini-infos ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .clini-infos li {
            position: relative;
            padding: 12px 0;
            border-bottom: 1px solid #f0f0f0;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .clini-infos li:last-child {
            border-bottom: none;
          }

          .clini-infos i {
            color: #2193b0;
            width: 20px;
          }

          .info-title {
            color: #757575;
            margin-right: 10px;
          }

          .info-value {
            color: #272b41;
            font-weight: 500;
          }

          .clinic-booking {
            margin-top: 20px;
          }

          .apt-btn {
            width: 100%;
            padding: 12px;
            font-size: 1rem;
            font-weight: 500;
            background: #2193b0;
            border: none;
            transition: all 0.3s ease;
          }

          .apt-btn:hover {
            background: #1c7a94;
            transform: translateY(-2px);
          }

          .service-list ul {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
          }

          .service-list li {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #272b41;
          }

          .breadcrumb-bar {
            background: linear-gradient(45deg, #2193b0, #6dd5ed);
            padding: 20px 0;
            margin-bottom: 30px;
          }

          .breadcrumb {
            margin: 0;
          }

          .breadcrumb-item a {
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
          }

          .breadcrumb-item.active {
            color: #fff;
          }

          .breadcrumb-title {
            color: #fff;
            margin: 5px 0 0;
            font-size: 1.75rem;
            font-weight: 500;
          }

          @media (max-width: 768px) {
            .doctor-widget {
              flex-direction: column;
              gap: 20px;
            }

            .doc-info-left {
              flex-direction: column;
              align-items: center;
              text-align: center;
            }

            .doc-info-right {
              width: 100%;
            }

            .service-list ul {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </div>
  );
};

export default DoctorProfileScreen;
