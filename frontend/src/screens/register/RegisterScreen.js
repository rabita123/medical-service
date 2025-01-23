import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { register } from "../../actions/userActions";
import Footer from "../../components/Footer";
import "./RegisterScreen.css";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else if (phone.length !== 11) {
      setMessage("Please enter a valid 11-digit phone number");
    } else {
      dispatch(register(name, email, phone, password));
    }
  };

  return (
    <div className="account-page">
      <div className="main-wrapper">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="account-content">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-md-7 col-lg-6 login-left">
                      <img
                        src="https://via.placeholder.com/800x600?text=Join+Our+Medical+Community"
                        className="img-fluid"
                        alt="Register"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/800x600?text=Join+Our+Medical+Community";
                        }}
                      />
                    </div>
                    <div className="col-md-12 col-lg-6 login-right">
                      <div className="login-header">
                        <h3>Create Account</h3>
                        <p>Join our medical community today</p>
                      </div>
                      {message && <Message variant="danger">{message}</Message>}
                      {error && <Message variant="danger">{error}</Message>}
                      {loading && <Loader />}

                      <Form onSubmit={submitHandler}>
                        <div className="form-group form-focus">
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control floating"
                            required
                          />
                          <label className="focus-label">Full Name</label>
                        </div>

                        <div className="form-group form-focus">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control floating"
                            required
                          />
                          <label className="focus-label">Email Address</label>
                        </div>

                        <div className="form-group form-focus">
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control floating"
                            required
                            pattern="[0-9]{11}"
                          />
                          <label className="focus-label">Phone Number</label>
                        </div>

                        <div className="form-group form-focus">
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control floating"
                            required
                          />
                          <label className="focus-label">Create Password</label>
                        </div>

                        <div className="form-group form-focus">
                          <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="form-control floating"
                            required
                          />
                          <label className="focus-label">Confirm Password</label>
                        </div>

                        <div className="text-right">
                          <Link className="forgot-link" to="/login">
                            Already have an account?
                          </Link>
                        </div>

                        <button
                          className="btn btn-primary btn-block btn-lg login-btn"
                          type="submit"
                        >
                          Register
                        </button>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default RegisterScreen;
