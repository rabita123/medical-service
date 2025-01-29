import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <header className="header">
      <Navbar bg="white" expand="lg" fixed="top" className="navbar-main">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="brand">
              <span className="brand-text">Medical Service</span>
            </Navbar.Brand>
          </LinkContainer>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <LinkContainer to="/doctors">
                <Nav.Link className="nav-link">
                  <i className="fas fa-user-md"></i> Doctors
                </Nav.Link>
              </LinkContainer>
              
              <LinkContainer to="/tests">
                <Nav.Link className="nav-link">
                  <i className="fas fa-vial"></i> Tests
                </Nav.Link>
              </LinkContainer>
              
              <LinkContainer to="/pharmacy">
                <Nav.Link className="nav-link">
                  <i className="fas fa-pills"></i> Pharmacy
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <>
                  <NavDropdown 
                    title={
                      <span>
                        <i className="fas fa-user-circle"></i> {userInfo.name}
                      </span>
                    } 
                    id="username" 
                    className="nav-dropdown"
                  >
                    <LinkContainer to="/my-test-bookings">
                      <NavDropdown.Item>
                        <i className="fas fa-list"></i> My Test Bookings
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/prescription-orders">
                      <NavDropdown.Item>
                        <i className="fas fa-prescription"></i> My Prescriptions
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandler}>
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </NavDropdown.Item>
                  </NavDropdown>

                  {userInfo.isAdmin && (
                    <NavDropdown 
                      title={
                        <span>
                          <i className="fas fa-cog"></i> Admin
                        </span>
                      } 
                      id="adminmenu" 
                      className="nav-dropdown"
                    >
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>
                          <i className="fas fa-chart-line"></i> Dashboard
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>
                          <i className="fas fa-users"></i> Users
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/tests">
                        <NavDropdown.Item>
                          <i className="fas fa-vial"></i> Tests
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/bookings">
                        <NavDropdown.Item>
                          <i className="fas fa-calendar-check"></i> Bookings
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/pharmacy">
                        <NavDropdown.Item>
                          <i className="fas fa-pills"></i> Pharmacy
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/prescription-orders">
                        <NavDropdown.Item>
                          <i className="fas fa-prescription-bottle-alt"></i> Prescriptions
                        </NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="nav-link login-btn">
                    <i className="fas fa-sign-in-alt"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <style>
        {`
          .header {
            height: 60px;
            margin-bottom: 0;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1030;
          }

          .navbar-main {
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
            background: white !important;
            height: 60px;
            padding: 0;
          }

          .brand {
            display: flex;
            align-items: center;
            height: 60px;
          }

          .brand-text {
            font-size: 1.5rem;
            font-weight: 700;
            background: linear-gradient(45deg, #2193b0, #6dd5ed);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-left: 0.5rem;
          }

          .nav-link {
            color: #495057 !important;
            font-weight: 500;
            padding: 0.5rem 1rem !important;
            transition: all 0.3s ease;
            border-radius: 5px;
            margin: 0 0.2rem;
          }

          .nav-link:hover {
            color: #2193b0 !important;
            background: rgba(33, 147, 176, 0.1);
          }

          .nav-link i {
            margin-right: 0.5rem;
          }

          .nav-dropdown .dropdown-toggle {
            color: #495057 !important;
            font-weight: 500;
          }

          .nav-dropdown .dropdown-menu {
            border: none;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            margin-top: 0.5rem;
          }

          .nav-dropdown .dropdown-item {
            padding: 0.5rem 1.5rem;
            color: #495057;
            transition: all 0.3s ease;
          }

          .nav-dropdown .dropdown-item:hover {
            background: rgba(33, 147, 176, 0.1);
            color: #2193b0;
          }

          .nav-dropdown .dropdown-item i {
            margin-right: 0.5rem;
            width: 20px;
          }

          .login-btn {
            background: linear-gradient(45deg, #2193b0, #6dd5ed);
            color: white !important;
            border-radius: 25px;
            padding: 0.5rem 1.5rem !important;
            transition: all 0.3s ease;
          }

          .login-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(33, 147, 176, 0.3);
            background: linear-gradient(45deg, #1c7a94, #5bb8cc);
            color: white !important;
          }

          @media (max-width: 991px) {
            .nav-link {
              padding: 0.75rem 1rem !important;
            }

            .nav-dropdown .dropdown-menu {
              border: none;
              box-shadow: none;
              margin-top: 0;
              padding: 0;
            }

            .nav-dropdown .dropdown-item {
              padding: 0.75rem 1.5rem;
            }
          }

          /* Add top margin to the first content element after header */
          .main-content > *:first-child {
            margin-top: 60px;
          }
        `}
      </style>
    </header>
  );
};

export default Header;
