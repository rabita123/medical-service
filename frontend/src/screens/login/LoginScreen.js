import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { login } from "../../actions/userActions";
import Header from "../../components/Header";
import "./LoginScreen.css";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      navigate("/admin-dashboard");
    } else if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

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
    <div className="account-page">
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
                        src={loginImages[0].src}
                        className="img-fluid"
                        alt={loginImages[0].alt}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/800x600?text=Healthcare+Services";
                        }}
                      />
                      <h3 className="mt-3 text-center">{loginImages[0].caption}</h3>
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
                            required
                          />
                          <label className="focus-label">Email</label>
                        </div>

                        <div className="form-group form-focus">
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control floating"
                            required
                          />
                          <label className="focus-label">Password</label>
                        </div>

                        <div className="text-end">
                          <Link className="forgot-link" to="/register-user">
                            Don't have an account?
                          </Link>
                        </div>

                        <button
                          className="btn btn-primary btn-block btn-lg login-btn"
                          type="submit"
                        >
                          Login
                        </button>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
