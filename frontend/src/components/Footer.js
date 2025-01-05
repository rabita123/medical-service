import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../actions/userActions";
import { Link } from "react-router-dom";

const Footer = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const dispatch = useDispatch();

  return (
    <div>
      <footer className="footer">
        <div className="footer-top">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="footer-widget footer-about">
                  <div className="footer-logo">
                    <img src="/assets/img/logo.jpg" alt="logo" />
                  </div>
                  <div className="footer-about-content">
                    <p>
                      Xpert Sample Everytime on your door (A Specialized
                      Diagnostic Centre).{" "}
                    </p>
                    <div className="social-icon">
                      <ul>
                        <li>
                          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook-f"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-dribbble"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="footer-widget footer-menu">
                  <h2 className="footer-title">For Patients</h2>
                  <ul>
                    <li>
                      <Link to="/doctors">Search for Doctors</Link>
                    </li>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/register">Register</Link>
                    </li>
                    <li>
                      <Link to="/doctors">Booking</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="footer-widget footer-menu">
                  <h2 className="footer-title">For Users</h2>
                  <ul>
                    <li>
                      <Link to="/medicine-store">Medicine Store</Link>
                    </li>
                    <li>
                      <Link to="/emergency-doctor">Emergency Doctor</Link>
                    </li>
                    <li>
                      <Link to="/nursing-packages">Nursing Packages</Link>
                    </li>
                    <li>
                      <Link to="/physiotherapy">Physiotherapy Packages</Link>
                    </li>
                    <li>
                      <Link to="/find-ambulance">Find Emergency Ambulance</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="footer-widget footer-contact">
                  <h2 className="footer-title">Contact Us</h2>
                  <div className="footer-contact-info">
                    <div className="footer-address">
                      <span>
                        <i className="fas fa-map-marker-alt"></i>
                      </span>
                      <p> Location, Khulna. </p>
                    </div>
                    <p>
                      <i className="fas fa-phone-alt"></i>
                      contact
                    </p>
                    <p className="mb-0">
                      <i className="fas fa-envelope"></i>
                      xpersample@example.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container-fluid">
            <div className="copyright">
              <div className="row">
                <div className="col-md-6 col-lg-6">
                  <div className="copyright-text">
                    <p className="mb-0">
                      &copy; 2020 Xpert Sample. All rights reserved.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6">
                  <div className="copyright-menu">
                    <ul className="policy-menu">
                      <li>
                        <Link to="/terms">Terms and Conditions</Link>
                      </li>
                      <li>
                        <Link to="/privacy">Policy</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
