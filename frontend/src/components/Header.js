import React from 'react';
<<<<<<< HEAD
import { Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
=======
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
>>>>>>> origin/main
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import { withRouter } from 'react-router-dom';

const Header = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
<<<<<<< HEAD
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
              <NavDropdown title="Find Doctors" id="basic-nav-dropdown" className="nav-link">
                <NavDropdown.Item as={Link} to="/doctors">All Doctors</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/doctors/specialties">Doctors by Specialty</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/doctors/emergency">Emergency Doctors</NavDropdown.Item>
                {userInfo && (
                  <NavDropdown.Item as={Link} to="/my-appointments">My Appointments</NavDropdown.Item>
                )}
              </NavDropdown>
              <NavDropdown title="Health Services" id="health-services-dropdown" className="nav-link">
                <NavDropdown.Item as={Link} to="/tests">Book Health Test</NavDropdown.Item>
                {userInfo && (
                  <NavDropdown.Item as={Link} to="/my-test-bookings">My Test Bookings</NavDropdown.Item>
                )}
              </NavDropdown>
              <Nav.Link as={Link} to="/find-consultant" className="nav-link">Find a Consultant</Nav.Link>
              <Nav.Link as={Link} to="/pharmacy" className="nav-link">Pharmacy</Nav.Link>
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu" className="nav-link">
                  <NavDropdown.Item as={Link} to="/admin/dashboard">Dashboard</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/users">Users</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/tests">Tests</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/bookings">Bookings</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/pharmacy">Pharmacy</NavDropdown.Item>
                </NavDropdown>
              )}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username" className="nav-link">
                  <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login" className="nav-link">
                  <button className="btn btn-primary login-btn">LOGIN / SIGNUP</button>
                </Nav.Link>
=======
          <LinkContainer to='/'>
            <Navbar.Brand>Medical Service</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              {userInfo ? (
                <>
                  {userInfo.isAdmin && (
                    <NavDropdown title='Admin' id='adminmenu'>
                      <LinkContainer to='/admin/dashboard'>
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/users'>
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/tests'>
                        <NavDropdown.Item>Tests</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/bookings'>
                        <NavDropdown.Item>Bookings</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/pharmacy'>
                        <NavDropdown.Item>Pharmacy</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/prescription-orders'>
                        <NavDropdown.Item>Prescription Orders</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                  <NavDropdown title={userInfo.name} id='username'>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
>>>>>>> origin/main
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default withRouter(Header);
