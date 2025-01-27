import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { register } from "../../actions/userActions";
import Footer from "../../components/Footer";
import "./RegisterScreen.css";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
    } else {
      dispatch(register(name, email, password));
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

                      <FormContainer>
                        <h1>Sign Up</h1>
                        <Form onSubmit={submitHandler}>
                          <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                          </Form.Group>

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

                          <Form.Group controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="Confirm password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                            ></Form.Control>
                          </Form.Group>

                          <Button type="submit" variant="primary">
                            Register
                          </Button>
                        </Form>

                        <Row className="py-3">
                          <Col>
                            Have an Account?{" "}
                            <Link
                              to={redirect ? `/login?redirect=${redirect}` : "/login"}
                            >
                              Login
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

        <Footer />
      </div>
    </div>
  );
};

export default withRouter(RegisterScreen);
