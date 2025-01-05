import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listDoctorsProfile } from "../../actions/doctorProfileActions";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const BookAppointmentScreen = ({ match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listDoctorsProfile(match.params.id));
  }, [dispatch, match]);

  //   const doctorProfile = useSelector((state) => state.doctorProfile)
  //   const { doctorsProfile } = doctorProfile

  const doctorProfileList = useSelector((state) => state.doctorProfileList);
  const { doctorsprofiles } = doctorProfileList;

  console.log(doctorsprofiles);
  return (
    <div>
      <Header />

      {/* <!-- Breadcrumb --> */}
      <div class="breadcrumb-bar">
        <div class="container-fluid">
          <div class="row align-items-center">
            <div class="col-md-12 col-12">
              <nav aria-label="breadcrumb" class="page-breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Doctor Profile
                  </li>
                </ol>
              </nav>
              <h2 class="breadcrumb-title">Doctor Profile</h2>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Breadcrumb --> */}

      {/* <!-- Page Content --> */}
      <div class="content">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <div class="booking-doc-info">
                    <a href="doctor-profile.html" class="booking-doc-img">
                      <img
                        src="assets/img/doctors/doctor-thumb-02.jpg"
                        alt="User Image"
                      />
                    </a>
                    <div class="booking-info">
                      <h4>
                        <a href="doctor-profile.html">Dr. Darren Elder</a>
                      </h4>
                      <div class="rating">
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star filled"></i>
                        <i class="fas fa-star"></i>
                        <span class="d-inline-block average-rating">35</span>
                      </div>
                      <p class="text-muted mb-0">
                        <i class="fas fa-map-marker-alt"></i> Newyork, USA
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-sm-4 col-md-6">
                  <h4 class="mb-1">11 November 2019</h4>
                  <p class="text-muted">Monday</p>
                </div>
                <div class="col-12 col-sm-8 col-md-6 text-sm-right">
                  <div class="bookingrange btn btn-white btn-sm mb-3">
                    <i class="far fa-calendar-alt mr-2"></i>
                    <span></span>
                    <i class="fas fa-chevron-down ml-2"></i>
                  </div>
                </div>
              </div>
              {/* <!-- Schedule Widget --> */}
              <div class="card booking-schedule schedule-widget">
                {/* <!-- Schedule Header --> */}
                <div class="schedule-header">
                  <div class="row">
                    <div class="col-md-12">
                      {/* <!-- Day Slot --> */}
                      <div class="day-slot">
                        <ul>
                          <li class="left-arrow">
                            <a href="#">
                              <i class="fa fa-chevron-left"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- /Day Slot --> */}
                    </div>
                  </div>
                </div>
                {/* <!-- /Schedule Header --> */}
              </div>
              {/* <!-- /Schedule Widget --> */}

              {/* <!-- Submit Section --> */}
              <div class="submit-section proceed-btn text-right">
                <a href="checkout.html" class="btn btn-primary submit-btn">
                  Proceed to Pay
                </a>
              </div>
              {/* <!-- /Submit Section --> */}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Page Content --> */}

      <Footer />
    </div>
  );
};

export default BookAppointmentScreen;
