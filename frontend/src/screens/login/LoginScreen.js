import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { login } from "../../actions/userActions";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  //const redirect = location.search ? location.search.split('=')[1] : '/'

  // const redirect = location.pathname
  //  console.log(redirect)

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      history.push("/admin-dashboard");
    } else if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  //   useEffect(() => {
  //     if (userInfo && userInfo.isAdmin) {
  //       history.push("/admin-dashboard");
  //     } else if (userInfo) {
  //       history.push("/user-profile");
  //     }
  //     //   else{
  //     //     history.push('/login')
  //     //   }
  //   }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const loginImages = [
    {
      src: "https://img.freepik.com/free-photo/medical-banner-with-doctor-wearing-goggles_23-2149611193.jpg?w=1380&t=st=1709715171~exp=1709715771~hmac=1f7d0c2c9f62f11cb4c481f96e3e2d3f5d8c31f5c5e6d5f5f5f5f5f5f5f5f5f",
      alt: "Professional medical staff",
      caption: "Expert Healthcare Services"
    }
  ];

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
                      <div className="login-slider">
                        <div className="login-slide">
                          <img
                            src={loginImages[0].src}
                            alt={loginImages[0].alt}
                            className="img-fluid"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://via.placeholder.com/800x600?text=Medical+Services";
                            }}
                          />
                          <div className="slide-caption">
                            <h4>{loginImages[0].caption}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-6 login-right">
                      <div className="login-header">
                        <h3>Login</h3>
                        <p>Access your healthcare account</p>
                      </div>
                      {error && <Message variant="danger">{error}</Message>}
                      {loading && <Loader />}

                      <Form onSubmit={submitHandler}>
                        <div className="form-group form-focus">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control floating"
                          />
                          <label className="focus-label">Email</label>
                        </div>

                        <div className="form-group form-focus">
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control floating"
                          />
                          <label className="focus-label">Password</label>
                        </div>
                        <div className="text-right">
                          <Link className="forgot-link" to={"/forget-password"}>
                            Forgot Password ?
                          </Link>
                        </div>
                        <button
                          className="btn btn-primary btn-block btn-lg login-btn"
                          type="submit"
                        >
                          Login
                        </button>
                        <div className="login-or">
                          <span className="or-line"></span>
                          <span className="span-or">or</span>
                        </div>
                        {/* <div className="row form-row social-login">
                          <div className="col-6">
                            <a href="#" className="btn btn-facebook btn-block">
                              <i className="fab fa-facebook-f mr-1"></i> Login
                            </a>
                          </div>
                          <div className="col-6">
                            <a href="#" className="btn btn-google btn-block">
                              <i className="fab fa-google mr-1"></i> Login
                            </a>
                          </div>
                        </div> */}
                        <div className="text-center dont-have">
                          Don't have an account?{" "}
                          <Link to="/register-user">Register</Link>
                        </div>
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
          }

          .login-header h3 {
            font-size: 24px;
            margin-bottom: 10px;
            font-weight: 600;
            color: #272b41;
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

          .login-or {
            position: relative;
            text-align: center;
            margin: 25px 0;
          }

          .or-line {
            background: #e0e0e0;
            height: 1px;
            margin-bottom: 0;
            display: block;
          }

          .span-or {
            background: #fff;
            display: inline-block;
            padding: 0 12px;
            color: #757575;
            position: relative;
            top: -11px;
          }

          .dont-have {
            color: #757575;
            margin-top: 20px;
          }

          .dont-have a {
            color: #2193b0;
            text-decoration: none;
          }

          .dont-have a:hover {
            color: #1c7a94;
            text-decoration: underline;
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

          .login-slider {
            position: relative;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          }

          .login-slide {
            position: relative;
          }

          .login-slide img {
            width: 100%;
            height: 400px;
            object-fit: cover;
            border-radius: 12px;
          }

          .slide-caption {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 20px;
            background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
            color: white;
          }

          .slide-caption h4 {
            margin: 0;
            font-size: 1.2rem;
            font-weight: 500;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
          }

          .login-header {
            text-align: center;
            margin-bottom: 30px;
          }

          .login-header h3 {
            font-size: 24px;
            margin-bottom: 10px;
            color: #272b41;
            font-weight: 600;
          }

          .login-header p {
            color: #757575;
            margin-bottom: 0;
            font-size: 14px;
          }
        `}
      </style>
    </body>
  );
};

export default LoginScreen;
