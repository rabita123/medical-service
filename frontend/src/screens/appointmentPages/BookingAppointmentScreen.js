import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listDoctorsProfile } from "../../actions/doctorProfileActions";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TextField from "@material-ui/core/TextField";
import { createdAppointment } from "../../actions/orderActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const BookingAppointmentScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  useEffect(() => {
    dispatch(listDoctorsProfile(match.params.id));
  }, [dispatch, match]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const doctorProfileList = useSelector((state) => state.doctorProfileList);
  const { loading, error, doctorsprofiles } = doctorProfileList;

  const handleSubmit = () => {
    dispatch(
      createdAppointment({
        doctor_id: match.params.id,
        appointmentDate: appointmentDate,
        appointmentTime: appointmentTime,
      })
    );
    history.push("/booking-success");
  };

  return (
    <div>
      <Header />
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
          ) : doctorsprofiles ? (
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="booking-doc-info">
                      <a href="#" className="booking-doc-img">
                        <img src={doctorsprofiles.image} alt="Doctor" />
                      </a>
                      <div className="booking-info">
                        <h4>{doctorsprofiles.name}</h4>
                        <p className="text-muted mb-0">
                          {doctorsprofiles.degree}
                        </p>
                        <p className="text-muted mb-0">
                          Fees: {doctorsprofiles.fees} BDT
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card booking-schedule schedule-widget">
                  <div className="schedule-header">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="day-slot">
                          <ul>
                            <div className="col-12 col-sm-4 col-md-6">
                              Available: <h4 className="mb-1">{doctorsprofiles.days}</h4>
                              <p className="text-muted">{doctorsprofiles.times}</p>
                            </div>

                            <div className="col-md-5">
                              <TextField
                                id="date"
                                label="Select Date"
                                type="date"
                                defaultValue={appointmentDate}
                                onChange={(e) => setAppointmentDate(e.target.value)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </div>

                            <div className="col-md-5">
                              <TextField
                                id="time"
                                label="Select Time"
                                type="time"
                                defaultValue={appointmentTime}
                                onChange={(e) => setAppointmentTime(e.target.value)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </div>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="submit-section proceed-btn text-right">
                  <button onClick={handleSubmit} className="btn btn-primary submit-btn">
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Message variant="info">No doctor information found.</Message>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingAppointmentScreen;
