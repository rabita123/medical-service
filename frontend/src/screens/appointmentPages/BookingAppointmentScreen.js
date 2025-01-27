import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, useParams } from "react-router-dom";
import { listDoctorsProfile } from "../../actions/doctorProfileActions";
import Footer from "../../components/Footer";
import { createAppointment } from "../../actions/orderActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const BookingAppointmentScreen = ({ history }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [message, setMessage] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const doctorProfileList = useSelector((state) => state.doctorProfileList);
  const { loading, error, doctorsprofiles: doctor } = doctorProfileList;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else if (id) {
      dispatch(listDoctorsProfile(id));
    }
  }, [dispatch, id, userInfo, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!appointmentDate || !appointmentTime) {
      setMessage("Please select both date and time");
      return;
    }

    dispatch(
      createAppointment({
        doctor_id: id,
        appointmentDate,
        appointmentTime,
      })
    );
    history.push("/booking-success");
  };

  // Get today's date in YYYY-MM-DD format for min date in date picker
  const today = new Date().toISOString().split('T')[0];

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
                    Book Appointment
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Book Appointment</h2>
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
            <Message variant="info">Doctor not found</Message>
          ) : (
            <div className="card">
              <div className="card-body">
                <div className="booking-doc-info">
                  <div className="booking-doc-img">
                    <img
                      src={doctor.image || '/assets/img/doctors/doctor-thumb-01.jpg'}
                      alt="Doctor"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/img/doctors/doctor-thumb-01.jpg';
                      }}
                    />
                  </div>
                  <div className="booking-info">
                    <h4>{doctor.name}</h4>
                    <p>{doctor.specialization}</p>
                    {doctor.fees && <p>Consultation Fee: {doctor.fees} BDT</p>}
                    {doctor.days && <p>Available Days: {doctor.days}</p>}
                    {doctor.times && <p>Available Times: {doctor.times}</p>}
                  </div>
                </div>

                {message && <Message variant="danger">{message}</Message>}

                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="row form-row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Appointment Date</label>
                        <input
                          type="date"
                          className="form-control"
                          value={appointmentDate}
                          onChange={(e) => setAppointmentDate(e.target.value)}
                          min={today}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Appointment Time</label>
                        <input
                          type="time"
                          className="form-control"
                          value={appointmentTime}
                          onChange={(e) => setAppointmentTime(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="submit-section mt-4">
                    <button type="submit" className="btn btn-primary submit-btn">
                      Book Appointment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withRouter(BookingAppointmentScreen);
