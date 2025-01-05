import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { register } from "../../actions/userActions";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

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
    <body className="account-page">
      <div className="main-wrapper">
        <Header />

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

      <style>
        {`
          .account-page {
            background-color: #f8f9fa;
            min-height: 100vh;
          }

          .main-wrapper {
            background-color: #f8f9fa;
            min-height: 100vh;
            padding-top: 76px;
          }

          .content {
            padding: 50px 0;
          }

          .account-content {
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            padding: 30px;
          }

          .login-left {
            padding: 30px;
          }

          .login-right {
            padding: 30px;
            background: #fff;
            border-radius: 4px;
          }

          .login-header {
            margin-bottom: 30px;
            text-align: center;
          }

          .login-header h3 {
            font-size: 24px;
            margin-bottom: 10px;
            font-weight: 600;
            color: #272b41;
          }

          .login-header p {
            color: #757575;
            margin-bottom: 0;
          }

          .form-focus {
            position: relative;
            margin-bottom: 25px;
          }

          .form-focus .form-control {
            height: 50px;
            padding: 10px 12px;
            border: 1px solid #dcdcdc;
            border-radius: 4px;
            transition: all 0.3s ease;
          }

          .form-focus .form-control:focus {
            border-color: #2193b0;
            box-shadow: 0 0 6px rgba(33, 147, 176, 0.2);
          }

          .form-focus label {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 12px;
            color: #858585;
            transition: all 0.3s ease;
            pointer-events: none;
          }

          .form-focus .form-control:focus + label,
          .form-focus .form-control:not(:placeholder-shown) + label {
            top: 0;
            font-size: 12px;
            background: #fff;
            padding: 0 5px;
            color: #2193b0;
          }

          .forgot-link {
            color: #2193b0;
            display: inline-block;
            margin-bottom: 15px;
            font-size: 14px;
            text-decoration: none;
          }

          .forgot-link:hover {
            color: #1c7a94;
            text-decoration: underline;
          }

          .login-btn {
            background: linear-gradient(45deg, #2193b0, #6dd5ed);
            border: none;
            padding: 12px;
            font-weight: 500;
            border-radius: 4px;
            transition: all 0.3s ease;
          }

          .login-btn:hover {
            background: linear-gradient(45deg, #1c7a94, #5bb8cc);
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(33, 147, 176, 0.3);
          }

          @media (max-width: 991.98px) {
            .login-left {
              display: none;
            }

            .login-right {
              padding: 20px;
            }

            .account-content {
              padding: 15px;
            }
          }
        `}
      </style>
    </body>
  );
};

export default RegisterScreen;
