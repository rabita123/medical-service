import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUsersOrders } from "../../actions/orderActions";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ChangePasswordScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    // if (userInfo) {
    //   history.push("/user-profile");
    // } else {
    //   history.push("/login");
    // }
  }, []);

  return (
    <>
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
                    Dashboard
                  </li>
                </ol>
              </nav>
              <h2 class="breadcrumb-title">Dashboard</h2>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Breadcrumb -->

			<!-- Page Content --> */}
      <div class="content">
        <div class="container-fluid">
          <div class="row">
            {/* <!-- Profile Sidebar --> */}
            <div class="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
              <div class="profile-sidebar">
                <div class="widget-profile pro-widget-content">
                  <div class="profile-info-widget">
                    <a href="#" class="booking-doc-img">
                      <img src="/uploads/blank.png" alt="User Image" />
                    </a>
                    <div class="profile-det-info">
                      <h3>{userInfo.name}</h3>
                      <div class="patient-details">
                        <h5>
                          <i class="fas fa-birthday-cake"></i> {userInfo.phone}
                        </h5>
                        <h5 class="mb-0">
                          <i class="fas fa-email"></i> {userInfo.email}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dashboard-widget">
                  <nav class="dashboard-menu">
                    <ul>
                      <li>
                        <Link to={"/user-profile"}>
                          <i class="fas fa-columns"></i>
                          <span>Dashboard</span>
                        </Link>
                      </li>
                      <li class="active">
                        <a href="favourites.html">
                          <i class="fas fa-bookmark"></i>
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
            {/* <!-- / Profile Sidebar --> */}

            <div class="col-md-7 col-lg-8 col-xl-9">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12 col-lg-6">
                      <form>
                        <div class="form-group">
                          <label>Old Password</label>
                          <input type="password" class="form-control" />
                        </div>
                        <div class="form-group">
                          <label>New Password</label>
                          <input type="password" class="form-control" />
                        </div>
                        <div class="form-group">
                          <label>Confirm Password</label>
                          <input type="password" class="form-control" />
                        </div>
                        <div class="submit-section">
                          <button
                            type="submit"
                            class="btn btn-primary submit-btn"
                          >
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
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

export default ChangePasswordScreen;
