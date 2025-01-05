import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import HeaderAdmin from "../../components/HeaderAdmin";

import Sidebar from "../../components/Sidebar";
import Pagination from "../../components/Pagination";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet";
import { CommonLoading } from "react-loadingg";
import { listAppointments } from "../../actions/appointmentActions";
import { Link } from "react-router-dom";

const AppointmentListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const appointmentList = useSelector((state) => state.appointmentList);
  const { loading, appointments } = appointmentList;
  console.log(appointments);

  //pagination

  const [posts, setPosts] = useState([]);
  const [locading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);

  // get current page post

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = appointments.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listAppointments());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const deleteHandler = (id) => {
    // if (window.confirm("Are you sure")) {
    //   dispatch(deleteAppointment(id));
    // }
    alert(id);
  };

  const createPackageHandler = () => {
    // dispatch(createProduct());
  };

  return (
    <>
      <HeaderAdmin />
      <Helmet>
        <link rel="stylesheet" href="admin/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="admin/assets/css/feathericon.min.css" />
        <link rel="stylesheet" href="admin/assets/css/font-awesome.min.css" />
        <link rel="stylesheet" href="admin/assets/css/style.css" />
      </Helmet>
      <Sidebar />
      <div class="main-wrapper">
        <div class="page-wrapper">
          <div class="content container-fluid">
            <div class="page-header">
              <div class="row">
                <div class="col-sm-12">
                  <h3 class="page-title">Appointment List</h3>
                  <ul class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="index.html">Dashboard</a>
                    </li>
                    <li class="breadcrumb-item active">Appointment List</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-3 col-sm-4 col-md-2 col-xl mb-3 mb-xl-0 text-right">
              <Row className="align-items-center">
                <Col className="text-right">
                  <Link
                    class="col-lg-2 btn btn-block btn-outline-dark active"
                    to={"/admin-create-specialist"}
                  >
                    <i className="fas fa-plus"></i> Add Appointment{" "}
                  </Link>
                </Col>
              </Row>
            </div>
            <br />
            {/* <SearchField placeholder="Search item" onChange={onChange} /> */}
            {/* <Loader />} */}
            <div class="row">
              <div class="col-sm-12">
                <div class="card">
                  <div class="card-header">
                    <h4 class="card-title">Appointments</h4>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-hover mb-0">
                        <thead>
                          <tr>
                            <th>SN</th>
                            <th>Patient Name</th>
                            <th>Patient Mobile</th>
                            <th>Doctor Name</th>
                            <th>Appointment Date</th>
                            <th>Appointment Time</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading && <CommonLoading />}
                          {currentPosts.map((appointment, i) => (
                            <tr key={appointment._id}>
                              <td>{i + 1}</td>
                              <td>{appointment.user.name}</td>
                              <td>{appointment.user.phone}</td>
                              <td>{appointment.doctor_id.name}</td>
                              <td>{appointment.appointmentDate}</td>
                              <td>{appointment.appointmentTime}</td>

                              <td>
                                <LinkContainer
                                  to={`/specialist/${appointment._id}/edit`}
                                >
                                  <Button variant="light" className="btn-sm">
                                    <i className="fas fa-edit"></i>
                                  </Button>
                                </LinkContainer>
                                <Button
                                  variant="danger"
                                  className="btn-sm"
                                  onClick={() => deleteHandler(appointment._id)}
                                >
                                  <i className="fas fa-trash"></i>
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <div>
                          <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={appointments.length}
                            paginate={paginate}
                          />
                        </div>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentListScreen;
