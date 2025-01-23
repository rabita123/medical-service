import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
        <div className="container">
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : !doctor ? (
            <Message variant="info">No doctor profile found</Message>
          ) : (
            <div className="card">
              <div className="card-body">
                <div className="doctor-widget">
                  <div className="doc-info-left">
                    <div className="doctor-img">
                      <img
                        src={doctor.image || '/assets/img/doctors/doctor-thumb-01.jpg'}
                        className="img-fluid"
                        alt="Doctor"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/assets/img/doctors/doctor-thumb-01.jpg';
                        }}
                      />
                    </div>
                    <div className="doc-info-cont">
                      <h4 className="doc-name">{doctor.name || 'Doctor'}</h4>
                      <p className="doc-speciality">{doctor.degree || 'Medical Professional'}</p>
                      {doctor.specialization && (
                        <p className="doc-department">
                          <img
                            src="/assets/img/specialities/specialities-05.png"
                            className="img-fluid"
                            alt="Speciality"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/assets/img/specialities/default.png';
                            }}
                          />
                          {doctor.specialization}
                        </p>
                      )}

                      <div className="clinic-details">
                        {doctor.location && (
                          <p className="doc-location">
                            <i className="fas fa-map-marker-alt"></i>{" "}
                            {doctor.location}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="doc-info-right">
                    <div className="clini-infos">
                      <ul>
                        {doctor.location && (
                          <li>
                            <i className="fas fa-map-marker-alt"></i>{" "}
                            {doctor.location}
                          </li>
                        )}
                        {doctor.fees && (
                          <li>
                            <i className="far fa-money-bill-alt"></i>{" "}
                            {doctor.fees} BDT{" "}
                          </li>
                        )}
                        {doctor.days && (
                          <li>
                            <i className="far fa-clock"></i>{" "}
                            Available: {doctor.days}
                          </li>
                        )}
                        {doctor.times && (
                          <li>
                            <i className="far fa-clock"></i>{" "}
                            Time: {doctor.times}
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
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorProfileScreen;
