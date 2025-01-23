import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, Button, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <Navbar expand="lg" className="custom-navbar" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand">
            <div className="logo-text">
              <span className="logo-main">Xpert</span>
              <span className="logo-secondary">Sample</span>
              <span className="logo-dot">.</span>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
              <NavDropdown title="Health Services" id="health-services-dropdown" className="nav-link">
                <NavDropdown.Item as={Link} to="/tests">Book Health Test</NavDropdown.Item>
                {userInfo && (
                  <NavDropdown.Item as={Link} to="/my-test-bookings">My Test Bookings</NavDropdown.Item>
                )}
              </NavDropdown>
              <Nav.Link as={Link} to="/find-consultant" className="nav-link">Find a Consultant</Nav.Link>
              <Nav.Link as={Link} to="/pharmacy" className="nav-link">Pharmacy</Nav.Link>
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="admin-dropdown" className="nav-link">
                  <NavDropdown.Item as={Link} to="/admin/dashboard">Dashboard</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/users">Users</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/tests">Tests</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/bookings">Bookings</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/pharmacy">Pharmacy</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/prescription-orders">Prescriptions</NavDropdown.Item>
                </NavDropdown>
              )}
              {userInfo ? (
                <>
                  <Nav.Link as={Link} to="/profile" className="nav-link">
                    <i className="fas fa-user-circle me-1"></i>
                    {userInfo.name}
                  </Nav.Link>
                  <Button 
                    onClick={logoutHandler} 
                    variant="outline-primary"
                    className="logout-btn ms-2"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/login" className="ms-2">
                  <Button variant="primary" className="auth-btn">
                    LOGIN / SIGNUP
                  </Button>
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <style>
        {`
          .custom-navbar {
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
            padding: 0.5rem 0;
            transition: all 0.3s ease;
            z-index: 1000;
          }

          .brand {
            display: flex;
            align-items: center;
            padding: 0.5rem 0;
            margin-right: 2rem;
            text-decoration: none;
          }

          .logo-text {
            font-family: 'Poppins', sans-serif;
            font-size: 1.8rem;
            font-weight: 700;
            letter-spacing: -0.5px;
            background: linear-gradient(45deg, #2193b0, #6dd5ed);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            transition: all 0.3s ease;
          }

          .logo-main {
            color: #2193b0;
          }

          .logo-secondary {
            color: #6dd5ed;
            font-weight: 500;
          }

          .logo-dot {
            color: #2193b0;
            font-weight: 700;
          }

          .brand:hover .logo-text {
            transform: scale(1.05);
            background: linear-gradient(45deg, #6dd5ed, #2193b0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .nav-link {
            color: #333 !important;
            font-weight: 500;
            padding: 0.5rem 1rem !important;
            margin: 0 0.2rem;
            transition: all 0.3s ease;
            border-radius: 5px;
            position: relative;
          }

          .nav-link:hover {
            color: #007bff !important;
            background: rgba(0, 123, 255, 0.1);
          }

          #health-services-dropdown {
            padding: 0.5rem 1rem !important;
          }

          .dropdown-menu {
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            border: none;
            padding: 0.5rem 0;
          }

          .dropdown-item {
            padding: 0.5rem 1.5rem;
            font-weight: 500;
            transition: all 0.3s ease;
          }

          .dropdown-item:hover {
            background: rgba(0, 123, 255, 0.1);
            color: #007bff;
          }

          .nav-link.active::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 60%;
            height: 2px;
            background-color: #007bff;
          }

          .auth-btn {
            padding: 0.5rem 1.5rem;
            font-weight: 600;
            border-radius: 25px;
            text-transform: uppercase;
            font-size: 0.9rem;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
            background: linear-gradient(45deg, #2193b0, #6dd5ed);
            border: none;
          }

          .auth-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(33, 147, 176, 0.3);
            background: linear-gradient(45deg, #1c7a94, #5bb8cc);
          }

          .logout-btn {
            padding: 0.5rem 1.5rem;
            font-weight: 500;
            border-radius: 25px;
            transition: all 0.3s ease;
            border-color: #2193b0;
            color: #2193b0;
          }

          .logout-btn:hover {
            background-color: #dc3545;
            border-color: #dc3545;
            color: white;
            transform: translateY(-2px);
          }

          .custom-toggler {
            border: none;
            padding: 0.25rem;
          }

          .custom-toggler:focus {
            box-shadow: none;
          }

          .navbar-collapse {
            background: rgba(255, 255, 255, 0.98);
          }

          @media (max-width: 991.98px) {
            .nav-link {
              padding: 0.75rem 1rem !important;
              border-radius: 0;
              border-left: 3px solid transparent;
            }

            .nav-link:hover {
              border-left-color: #2193b0;
              background: rgba(33, 147, 176, 0.05);
            }

            .nav-link.active::after {
              display: none;
            }

            .auth-btn, .logout-btn {
              margin: 0.5rem 1rem;
              width: calc(100% - 2rem);
            }

            .custom-navbar {
              padding: 0.5rem 0;
            }

            .navbar-collapse {
              padding: 1rem 0;
              border-top: 1px solid rgba(0, 0, 0, 0.1);
            }

            .logo-text {
              font-size: 1.5rem;
              margin-left: 1rem;
            }

            .dropdown-menu {
              border: none;
              box-shadow: none;
              padding-left: 1rem;
            }

            .dropdown-item {
              padding: 0.5rem 1rem;
            }
          }

          /* Add padding to main content to account for fixed navbar */
          main {
            padding-top: 76px;
          }

          /* Import Poppins font */
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        `}
      </style>
    </>
  );
};

export default Header;
