import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import HeaderAdmin from "../../components/HeaderAdmin";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet";

import { listDoctors, deleteDoctor } from "../../actions/doctorActions";
import { Link } from "react-router-dom";
import { CommonLoading } from "react-loadingg";
import makeToast from "../../components/Toaster";

const DoctorListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const doctorList = useSelector((state) => state.doctorList);
  const { loading, error, doctors } = doctorList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [doctorData, setDoctorData] = useState("");

  //   const doctorDelete = useSelector((state) => state.doctorDelete);
  //   const {
  //     loading: loadingDelete,
  //     error: errorDelete,
  //     success: successDelete,
  //   } = doctorDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listDoctors());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteDoctor(id));
      setDoctorData(doctors);
      dispatch(listDoctors());
      makeToast("success", "Successfully Deleted");
      dispatch(listDoctors());
      history.push("/doctor-lists");
    }
  };

  //   const createDHandler = () => {
  //     dispatch(createProduct());
  //   };

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
                  <h3 class="page-title">Doctor Lists</h3>
                  <ul class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="index.html">Dashboard</a>
                    </li>
                    <li class="breadcrumb-item active">Doctor Lists</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-3 col-sm-4 col-md-2 col-xl mb-3 mb-xl-0 text-right">
              <Row className="align-items-center">
                <Col className="text-right">
                  <Link
                    class="col-lg-2 btn btn-block btn-outline-dark active"
                    to={"/admin-add-doctor"}
                  >
                    <i className="fas fa-plus"></i> Create Doctors{" "}
                  </Link>
                </Col>
              </Row>
            </div>

            {/* <SearchField placeholder="Search item" onChange={onChange} /> */}
            {/* 
            {loadingDelete && <Loader />} */}
            <div class="row">
              <div class="col-sm-12">
                <div class="card">
                  <div class="card-header">
                    <h4 class="card-title">Doctors</h4>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-hover mb-0">
                        <thead>
                          <tr>
                            <th>SN</th>
                            <th>Name</th>
                            <th>Photo</th>
                            <th>Specialists</th>
                            <th>Fees</th>
                            <th>Days</th>
                            <th>Times</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading && <CommonLoading />}
                          {doctors.map((doctor, i) => (
                            <tr key={doctor._id}>
                              <td>{i + 1}</td>

                              <td>{doctor.name}</td>

                              <td>
                                {!doctor.image ? (
                                  <img
                                    width="70px"
                                    height="50px"
                                    src="/uploads/no-image1.png"
                                    alt={doctor.name}
                                    fluid
                                  />
                                ) : (
                                  <img
                                    width="70px"
                                    height="50px"
                                    src={doctor.image}
                                    alt={doctor.name}
                                    fluid
                                  />
                                )}
                              </td>
                              <td>{doctor.specialization}</td>
                              <td>{doctor.fees}</td>
                              <td>{doctor.days}</td>
                              <td>{doctor.times}</td>
                              <td>
                                <LinkContainer
                                  to={`/admin/doctors/${doctor._id}/edit`}
                                >
                                  <Button variant="light" className="btn-sm">
                                    <i className="fas fa-edit"></i>
                                  </Button>
                                </LinkContainer>
                                <Button
                                  variant="danger"
                                  className="btn-sm"
                                  onClick={() => deleteHandler(doctor._id)}
                                >
                                  <i className="fas fa-trash"></i>
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
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

export default DoctorListScreen;
