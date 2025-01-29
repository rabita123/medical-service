import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Container>
          <Row>
            <Col lg={3} md={6} className="mb-4 mb-lg-0">
              <div className="footer-widget">
                <h3>Medical Service</h3>
                <p>
                  Providing quality healthcare services and medical solutions for a better, healthier life.
                </p>
                <div className="social-links">
                  <a href="#!" className="social-link">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#!" className="social-link">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#!" className="social-link">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#!" className="social-link">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </Col>

            <Col lg={3} md={6} className="mb-4 mb-lg-0">
              <div className="footer-widget">
                <h4>Quick Links</h4>
                <ul className="footer-links">
                  <li>
                    <Link to="/doctors">Find Doctors</Link>
                  </li>
                  <li>
                    <Link to="/tests">Book Tests</Link>
                  </li>
                  <li>
                    <Link to="/pharmacy">Order Medicines</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </Col>

            <Col lg={3} md={6} className="mb-4 mb-lg-0">
              <div className="footer-widget">
                <h4>Our Services</h4>
                <ul className="footer-links">
                  <li>
                    <Link to="/services/consultations">Online Consultations</Link>
                  </li>
                  <li>
                    <Link to="/services/lab-tests">Lab Tests</Link>
                  </li>
                  <li>
                    <Link to="/services/pharmacy">Pharmacy Services</Link>
                  </li>
                  <li>
                    <Link to="/services/emergency">Emergency Services</Link>
                  </li>
                </ul>
              </div>
            </Col>

            <Col lg={3} md={6}>
              <div className="footer-widget">
                <h4>Contact Info</h4>
                <ul className="footer-contact">
                  <li>
                    <i className="fas fa-map-marker-alt"></i>
                    123 Healthcare Ave, Medical City, MC 12345
                  </li>
                  <li>
                    <i className="fas fa-phone-alt"></i>
                    +1 234 567 8900
                  </li>
                  <li>
                    <i className="fas fa-envelope"></i>
                    info@medicalservice.com
                  </li>
                  <li>
                    <i className="fas fa-clock"></i>
                    24/7 Available
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="footer-bottom">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start">
              <p className="mb-0">
                © {new Date().getFullYear()} Medical Service. All rights reserved.
              </p>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <ul className="footer-bottom-links">
                <li>
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms">Terms & Conditions</Link>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>

      <style>
        {`
          .footer {
            background: linear-gradient(135deg, #1a2980 0%, #26d0ce 100%);
            color: white;
            margin-top: 0;
          }

          .footer-top {
            padding: 3rem 0 2rem;
          }

          .footer-widget h3 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            background: linear-gradient(45deg, #fff, #e0e0e0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .footer-widget h4 {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            color: #fff;
          }

          .footer-widget p {
            color: rgba(255, 255, 255, 0.8);
            line-height: 1.8;
          }

          .social-links {
            display: flex;
            gap: 1rem;
            margin-top: 1.5rem;
          }

          .social-link {
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border-radius: 50%;
            transition: all 0.3s ease;
          }

          .social-link:hover {
            background: white;
            color: #1a2980;
            transform: translateY(-3px);
          }

          .footer-links {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .footer-links li {
            margin-bottom: 0.8rem;
          }

          .footer-links a {
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
          }

          .footer-links a:hover {
            color: white;
            transform: translateX(5px);
          }

          .footer-contact {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .footer-contact li {
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            color: rgba(255, 255, 255, 0.8);
          }

          .footer-contact li i {
            margin-right: 0.8rem;
            width: 20px;
          }

          .footer-bottom {
            background: rgba(0, 0, 0, 0.1);
            padding: 1.5rem 0;
          }

          .footer-bottom p {
            color: rgba(255, 255, 255, 0.8);
          }

          .footer-bottom-links {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            gap: 1.5rem;
            justify-content: flex-end;
          }

          .footer-bottom-links a {
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            transition: all 0.3s ease;
          }

          .footer-bottom-links a:hover {
            color: white;
          }

          @media (max-width: 768px) {
            .footer-widget {
              text-align: center;
            }

            .social-links {
              justify-content: center;
            }

            .footer-bottom-links {
              justify-content: center;
              margin-top: 1rem;
            }

            .footer-contact li {
              justify-content: center;
            }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
