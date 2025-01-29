import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { register } from "../../actions/userActions";
import "./RegisterScreen.css";

const RegisterScreen = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = window.location.search ? window.location.search.split("=")[1] : "/";

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
    <div className="content">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="account-content">
              <Row className="align-items-center justify-content-center">
                <Col md={6} className="login-left">
                  <img
                    src="/images/register-illustration.png"
                    className="img-fluid"
                    alt="Register"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/800x600?text=Join+Our+Medical+Community";
                    }}
                  />
                </Col>
                <Col md={6} className="login-right">
                  <div className="login-header">
                    <h3>Create Account</h3>
                    <p>Join our medical community today</p>
                  </div>
                  {message && <Message variant="danger">{message}</Message>}
                  {error && <Message variant="danger">{error}</Message>}
                  {loading && <Loader />}

                  <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="confirmPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Form.Group>

                    <div className="d-grid">
                      <Button type="submit" variant="primary" size="lg">
                        Register
                      </Button>
                    </div>

                    <Row className="py-3">
                      <Col className="text-center">
                        Already have an account?{" "}
                        <Link 
                          to={redirect ? `/login?redirect=${redirect}` : "/login"}
                          className="login-link"
                        >
                          Sign In
                        </Link>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterScreen;
