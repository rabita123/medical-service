import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { login } from "../../actions/userActions";
import Header from "../../components/Header";
import "./LoginScreen.css";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

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

                      <FormContainer>
                        <Form onSubmit={submitHandler}>
                          <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="Enter email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                          </Form.Group>

                          <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="Enter password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                          </Form.Group>

                          <Button type="submit" variant="primary">
                            Sign In
                          </Button>
                        </Form>

                        <Row className="py-3">
                          <Col>
                            New Customer?{" "}
                            <Link
                              to={redirect ? `/register?redirect=${redirect}` : "/register"}
                            >
                              Register
                            </Link>
                          </Col>
                        </Row>
                      </FormContainer>
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

export default withRouter(LoginScreen);
