import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { register } from "../../actions/userActions";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import makeToast from "../../components/Toaster";

const RegisterDoctorScreen = ({ history, location }) => {
  const firstRender = useRef(true);
  const [disable, setDisabled] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const emailValidation = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneValidation = /[0-9]{10}/.test(phone.trim());
  const pathtype = location.pathname;
  const pathtypes = pathtype.split("-");
  const userType = pathtypes[1];

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setDisabled(formValidation());

    if (userInfo) {
      if (userType === "doctor") {
        history.push("/doctor-dashboard");
      }
    }
  }, [history, name, email, phone, userType, password, userInfo]);

  const formValidation = () => {
    if (name === "") {
      setNameError("Name cant be blank");
      return true;
    } else {
      setNameError("");
    }
    if (email === "") {
      setEmailError("Email cant be blank");

      return true;
    } else {
      setEmailError("");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please Enter a valid email address");
      return true;
    } else {
      setEmailError("");
    }

    if (phone === "") {
      setPhoneError("Phone cant be blank");
      return true;
    } else {
      setPhoneError("");
    }

    if (/[0-10]{11}/.test(phone.trim())) {
      setPhoneError("Invalid Phone");
      return true;
    } else {
      setPhoneError("");
    }

    if (password === "") {
      setPasswordError("Password cant be blank");
      return true;
    } else {
      setPasswordError("");
      return false;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(register(name, email, phone, userType, password));

    if (register) {
      makeToast("success", "Successfully Registered");
    }
  };

  return (
    <div>
      <Header />
      {/* <!-- Page Content --> */}
      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-8 offset-md-2">
              {/* <!-- Register Content --> */}
              <div class="account-content">
                <div class="row align-items-center justify-content-center">
                  <div class="col-md-7 col-lg-6 login-left">
                    <img
                      src="assets/img/login-banner.png"
                      class="img-fluid"
                      alt="Doccure Register"
                    />
                  </div>
                  <div class="col-md-12 col-lg-6 login-right">
                    <div class="login-header">
                      <h3>
                        Patient Register{" "}
                        <Link to="/register-doctor"> Are you a Doctor?</Link>
                      </h3>
                    </div>

                    {/* {message && <Message variant="danger">{message}</Message>} */}
                    {error && <Message variant="danger">{error}</Message>}
                    {loading && <Loader />}

                    {/* 										
										<!-- Register Form --> */}
                    <Form onSubmit={submitHandler}>
                      <div class="form-group form-focus">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          class="form-control floating"
                        />
                        <label class="focus-label">Name</label>
                      </div>

                      {nameError && (
                        <Message variant="danger">{nameError}</Message>
                      )}
                      <div class="form-group form-focus">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          class="form-control floating"
                        />
                        <label class="focus-label">Email</label>
                      </div>
                      {emailError && (
                        <Message variant="danger">{emailError}</Message>
                      )}

                      <div class="form-group form-focus">
                        <input
                          type="number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          class="form-control floating"
                        />
                        <label class="focus-label">Mobile Number</label>
                      </div>
                      {phoneError && (
                        <Message variant="danger">{phoneError}</Message>
                      )}

                      <div class="form-group form-focus">
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          class="form-control floating"
                        />
                        <label class="focus-label">Create Password</label>
                      </div>
                      {passwordError && (
                        <Message variant="danger">{passwordError}</Message>
                      )}
                      <div class="text-right">
                        <Link class="forgot-link" to="/login">
                          Already have an account?
                        </Link>
                      </div>
                      <button
                        class="btn btn-primary btn-block btn-lg login-btn"
                        type="submit"
                        disabled={disable}
                      >
                        Signup
                      </button>
                      <div class="login-or">
                        <span class="or-line"></span>
                        <span class="span-or">or</span>
                      </div>
                      <div class="row form-row social-login">
                        <div class="col-6">
                          <a href="#" class="btn btn-facebook btn-block">
                            <i class="fab fa-facebook-f mr-1"></i> Login
                          </a>
                        </div>
                        <div class="col-6">
                          <a href="#" class="btn btn-google btn-block">
                            <i class="fab fa-google mr-1"></i> Login
                          </a>
                        </div>
                      </div>
                    </Form>
                    {/* <!-- /Register Form --> */}
                  </div>
                </div>
              </div>
              {/* <!-- /Register Content --> */}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Page Content --> */}
      <Footer />
    </div>
  );
};

export default RegisterDoctorScreen;
