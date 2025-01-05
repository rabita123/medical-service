import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ProfileSettingScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profiles"));
      } else {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ id: user._id, name, email, phone, password }));
  };

  return (
    <>
      <Header />

      {/* <!-- Page Content --> */}
      <div class="content">
        <div class="container-fluid">
          <div class="row">
            {/* <!-- Profile Sidebar --> */}
            <div class="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
              <div class="profile-sidebar">
                <div class="widget-profile pro-widget-content">
                  <div class="profile-info-widget">
                    <a href="#" class="booking-doc-img">
                      <img
                        src="assets/img/patients/patient.jpg"
                        alt="User Image"
                      />
                    </a>
                    <div class="profile-det-info">
                      <h3>Richard Wilson</h3>
                      <div class="patient-details">
                        <h5>
                          <i class="fas fa-birthday-cake"></i> 24 Jul 1983, 38
                          years
                        </h5>
                        <h5 class="mb-0">
                          <i class="fas fa-map-marker-alt"></i> Newyork, USA
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dashboard-widget">
                  <nav class="dashboard-menu">
                    <ul>
                      <li>
                        <a href="#">
                          <i class="fas fa-columns"></i>
                          <span>Dashboard</span>
                        </a>
                      </li>
                      <li>
                        <a href="favourites.html">
                          <i class="fas fa-bookmark"></i>
                          <span>Favourites</span>
                        </a>
                      </li>
                      <li>
                        <a href="chat.html">
                          <i class="fas fa-comments"></i>
                          <span>Message</span>
                          <small class="unread-msg">23</small>
                        </a>
                      </li>
                      <li class="active">
                        <a href="profile-settings.html">
                          <i class="fas fa-user-cog"></i>
                          <span>Profile Settings</span>
                        </a>
                      </li>
                      <li>
                        <a href="change-password.html">
                          <i class="fas fa-lock"></i>
                          <span>Change Password</span>
                        </a>
                      </li>
                      <li>
                        <a href="index.html">
                          <i class="fas fa-sign-out-alt"></i>
                          <span>Logout</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            {/* <!-- /Profile Sidebar --> */}

            <div class="col-md-7 col-lg-8 col-xl-9">
              <div class="card">
                <div class="card-body">
                  {message && <Message variant="danger">{message}</Message>}
                  {}
                  {success && (
                    <Message variant="success">Profile Updated</Message>
                  )}

                  {/* <!-- Profile Settings Form --> */}
                  <Form onSubmit={submitHandler}>
                    <div class="row form-row">
                      <div class="col-12 col-md-12">
                        <div class="form-group">
                          <div class="change-avatar">
                            <div class="profile-img">
                              <img
                                src="assets/img/patients/patient.jpg"
                                alt="User Image"
                              />
                            </div>
                            <div class="upload-img">
                              <div class="change-photo-btn">
                                <span>
                                  <i class="fa fa-upload"></i> Upload Photo
                                </span>
                                <input type="file" class="upload"></input>
                              </div>
                              <small class="form-text text-muted">
                                Allowed JPG, GIF or PNG. Max size of 2MB
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div class="form-group">
                          <label>First Name</label>
                          <input
                            type="text"
                            class="form-control"
                            value="Richard"
                          />
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div class="form-group">
                          <label>Last Name</label>
                          <input
                            type="text"
                            class="form-control"
                            value="Wilson"
                          />
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div class="form-group">
                          <label>Date of Birth</label>
                          <div class="cal-icon">
                            <input
                              type="text"
                              class="form-control datetimepicker"
                              value="24-07-1983"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div class="form-group">
                          <label>Blood Group</label>
                          <select class="form-control select">
                            <option>A-</option>
                            <option>A+</option>
                            <option>B-</option>
                            <option>B+</option>
                            <option>AB-</option>
                            <option>AB+</option>
                            <option>O-</option>
                            <option>O+</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div class="form-group">
                          <label>Email ID</label>
                          <input
                            type="email"
                            class="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div class="form-group">
                          <label>Mobile</label>
                          <input
                            type="text"
                            value={phone}
                            onChange={(e) => setEmail(e.target.value)}
                            class="form-control"
                          />
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-group">
                          <label>Address</label>
                          <input
                            type="text"
                            class="form-control"
                            value="806 Twin Willow Lane"
                          />
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div class="form-group">
                          <label>City</label>
                          <input
                            type="text"
                            class="form-control"
                            value="Old Forge"
                          />
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div class="form-group">
                          <label>State</label>
                          <input
                            type="text"
                            class="form-control"
                            value="Newyork"
                          />
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div class="form-group">
                          <label>Zip Code</label>
                          <input
                            type="text"
                            class="form-control"
                            value="13420"
                          />
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div class="form-group">
                          <label>Country</label>
                          <input
                            type="text"
                            class="form-control"
                            value="United States"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="submit-section">
                      <button type="submit" class="btn btn-primary submit-btn">
                        Save Changes
                      </button>
                    </div>
                  </Form>
                  {/* <!-- /Profile Settings Form --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Page Content --> */}

      <Footer />
    </>
  );
};

export default ProfileSettingScreen;
