import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listDoctorsProfile } from "../../actions/doctorProfileActions";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { CommonLoading } from "react-loadingg";

const DoctorProfileScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (match.params.id) {
      dispatch(listDoctorsProfile(match.params.id));
    }
  }, [dispatch, match]);

  const doctorProfileList = useSelector((state) => state.doctorProfileList);
  const { loading, error, doctorsprofiles } = doctorProfileList;

  const checkoutHandler = (id) => {
    history.push(`/login?redirect=booking-appointment/${id}`);
  };

  console.log('Current doctor profile state:', doctorProfileList);

  return (
    <div>
      <Header />

      {/* <!-- Breadcrumb --> */}
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
      {/* <!-- /Breadcrumb --> */}

      {/* <!-- Page Content --> */}
      <div className="content">
        <div className="container">
          {loading ? (
            <CommonLoading />
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : !doctorsprofiles ? (
            <div className="alert alert-info">No doctor profile found</div>
          ) : (
            /* <!-- Doctor Widget --> */
            <div className="card">
              <div className="card-body">
                <div className="doctor-widget">
                  <div className="doc-info-left">
                    <div className="doctor-img">
                      <img
                        src={doctorsprofiles.image || '/assets/img/doctors/doctor-thumb-01.jpg'}
                        className="img-fluid"
                        alt="Doctor"
                      />
                    </div>
                    <div className="doc-info-cont">
                      <h4 className="doc-name">{doctorsprofiles.name || 'Doctor'}</h4>
                      <p className="doc-speciality">{doctorsprofiles.degree || 'Medical Professional'}</p>
                      {doctorsprofiles.specialization && (
                        <p className="doc-department">
                          <img
                            src="/assets/img/specialities/specialities-05.png"
                            className="img-fluid"
                            alt="Speciality"
                          />
                          {doctorsprofiles.specialization}
                        </p>
                      )}

                      <div className="clinic-details">
                        {doctorsprofiles.location && (
                          <p className="doc-location">
                            <i className="fas fa-map-marker-alt"></i>{" "}
                            {doctorsprofiles.location} -{" "}
                            <a href="javascript:void(0);">Get Directions</a>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="doc-info-right">
                    <div className="clini-infos">
                      <ul>
                        {doctorsprofiles.location && (
                          <li>
                            <i className="fas fa-map-marker-alt"></i>{" "}
                            {doctorsprofiles.location}
                          </li>
                        )}
                        {doctorsprofiles.fees && (
                          <li>
                            <i className="far fa-money-bill-alt"></i>{" "}
                            {doctorsprofiles.fees} BDT{" "}
                          </li>
                        )}
                        {doctorsprofiles.days && (
                          <li>
                            <i className="far fa-clock"></i>{" "}
                            Available: {doctorsprofiles.days}
                          </li>
                        )}
                        {doctorsprofiles.times && (
                          <li>
                            <i className="far fa-clock"></i>{" "}
                            Time: {doctorsprofiles.times}
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="clinic-booking">
                      <button
                        className="btn btn-info"
                        onClick={() => checkoutHandler(doctorsprofiles._id)}
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* <!-- /Doctor Widget -->*/}
        </div>
      </div>
      {/* <!-- /Page Content --> */}

      <Footer />
    </div>
  );
};

export default DoctorProfileScreen;
