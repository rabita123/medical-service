import React from "react";
import Popper from "popper.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { login, logout } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const HeaderAdmin = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div>
      {/* <!-- Header --> */}
      <div class="header">
        {/* <!-- Logo --> */}
        <div class="header-left">
          <a href="index.html" class="logo">
            <img src="/assets/img/logo.jpg" alt="Logo" />
          </a>
          <a href="index.html" class="logo logo-small">
            <img src="/assets/img/logo.jpg" alt="Logo" width="30" height="30" />
          </a>
        </div>
        {/* <!-- /Logo --> */}

        <a href="javascript:void(0);" id="toggle_btn">
          <i class="fe fe-text-align-left"></i>
        </a>

        <div class="top-nav-search">
          <form>
            <input type="text" class="form-control" placeholder="Search here" />
            <button class="btn" type="submit">
              <i class="fa fa-search"></i>
            </button>
          </form>
        </div>

        {/* <!-- Mobile Menu Toggle --> */}
        <a class="mobile_btn" id="mobile_btn">
          <i class="fa fa-bars"></i>
        </a>
        {/* <!-- /Mobile Menu Toggle --> */}

        {/* <!-- Header Right Menu --> */}
        <ul class="nav user-menu">
          {userInfo ? (
            // <!-- Header Right Menu -->
            <NavDropdown title={userInfo.name} id="username">
              <LinkContainer to="/profile">
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <ul class="nav header-navbar-rht">
              <li class="nav-item contact-item">
                <div class="header-contact-img">
                  <i class="far fa-hospital"></i>
                </div>
                <div class="header-contact-detail">
                  <p class="contact-header">Contact</p>
                  <p class="contact-info-header"> +1 315 369 5943</p>
                </div>
              </li>
              <li class="nav-item">
                <a class="nav-link header-login" href="login.html">
                  login / Signup{" "}
                </a>
              </li>
            </ul>
          )}
        </ul>
        {/* <!-- /Header Right Menu --> */}
      </div>
      {/* <!-- /Header --> */}
    </div>
  );
};

export default HeaderAdmin;
