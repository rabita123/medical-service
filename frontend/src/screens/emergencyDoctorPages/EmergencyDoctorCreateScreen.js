import React, { useState, useEffect, lazy } from "react";
import { useDispatch } from "react-redux";
import Message from "../../components/Message";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { createEmergencyDoctor } from "../../actions/emergencyDoctorActions";
const HeaderAdmin = lazy(() => import("../../components/HeaderAdmin"));
const Sidebar = lazy(() => import("../../components/Sidebar"));
const Loader = lazy(() => import("../../components/Loader"));

const EmergencyDoctorCreateScreen = ({ history }) => {
  const [textDetails, setTextDetails] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();

  const createEmergencyDoctorHandler = (e) => {
    e.preventDefault();
    dispatch(createEmergencyDoctor(textDetails, phone));
    //history.push("/slider-list");
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
                  <h3 class="page-title">Create Emergency Doctor</h3>
                  <ul class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="index.html">Dashboard</a>
                    </li>
                    <li class="breadcrumb-item active">Emergency Doctor</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-xl-6 d-flex">
                <div class="card flex-fill">
                  <div class="card-header">
                    <h4 class="card-title">Create Emergency Doctor </h4>
                  </div>
                  <div class="card-body">
                    <Form onSubmit={createEmergencyDoctorHandler}>
                      <Form.Group controlId="name">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Phone No"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter description"
                          value={textDetails}
                          onChange={(e) => setTextDetails(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <div class="row">
                        <div class="col-lg-3 text-left">
                          <button
                            type="submit"
                            class="btn btn-block btn-outline-dark active"
                          >
                            <i className="fas fa-plus"></i> Create
                          </button>
                        </div>
                        <div class="col-lg-3 text-left">
                          <Link
                            to={"/admin-health-productlist"}
                            type="submit"
                            class="btn btn-block btn-outline-dark active"
                          >
                            <i class="fas fa-arrow-left"></i> Back
                          </Link>
                        </div>
                      </div>
                    </Form>
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

export default EmergencyDoctorCreateScreen;
