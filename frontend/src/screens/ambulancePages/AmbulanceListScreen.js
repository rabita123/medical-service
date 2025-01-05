import React, { useEffect, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";

import { Helmet } from "react-helmet";
import { CommonLoading } from "react-loadingg";
import {
  listAmbulances,
  deleteAmbulance,
} from "../../actions/ambulanceActions";
import { Link } from "react-router-dom";

const HeaderAdmin = lazy(() => import("../../components/HeaderAdmin"));
const Sidebar = lazy(() => import("../../components/Sidebar"));
const Loader = lazy(() => import("../../components/Loader"));

const AmbulanceListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const ambulanceList = useSelector((state) => state.ambulanceList);
  const { loading, error, ambulances } = ambulanceList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const ambulanceDelete = useSelector((state) => state.ambulanceDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = ambulanceDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listAmbulances());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteAmbulance(id));
    }
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
                  <h3 class="page-title">Ambulance</h3>
                  <ul class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="index.html">Dashboard</a>
                    </li>
                    <li class="breadcrumb-item active">Ambulance</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-3 col-sm-4 col-md-2 col-xl mb-3 mb-xl-0 text-right">
              <Row className="align-items-center">
                <Col className="text-right">
                  <Link
                    class="col-lg-2 btn btn-block btn-outline-dark active"
                    to={"/admin-ambulance-create"}
                  >
                    <i className="fas fa-plus"></i> Create Ambulance{" "}
                  </Link>
                </Col>
              </Row>
            </div>
            <br />

            {loadingDelete && <Loader />}
            <div class="row">
              <div class="col-sm-12">
                <div class="card">
                  <div class="card-header">
                    <h4 class="card-title">Ambulances</h4>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-hover mb-0">
                        <thead>
                          <tr>
                            <th>SN</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Image</th>

                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading && <CommonLoading />}

                          {ambulances.map((ambulance, i) => (
                            <tr key={ambulance._id}>
                              <td>{i + 1}</td>

                              <td>{ambulance.name}</td>

                              <td>{ambulance.phone}</td>
                              <td>
                                {" "}
                                <img
                                  width="70px"
                                  height="50px"
                                  src={ambulance.image}
                                  alt={ambulance.name}
                                  fluid
                                />
                              </td>
                              <td>
                                <LinkContainer
                                  to={`/admin/ambulance/${ambulance._id}/edit`}
                                >
                                  <Button variant="light" className="btn-sm">
                                    <i className="fas fa-edit"></i>
                                  </Button>
                                </LinkContainer>
                                <Button
                                  variant="danger"
                                  className="btn-sm"
                                  onClick={() => deleteHandler(ambulance._id)}
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

export default AmbulanceListScreen;
