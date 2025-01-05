import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import HeaderAdmin from "../../components/HeaderAdmin";
import { Table, Button, Row, Col, Form } from "react-bootstrap";
import Loader from "../../components/Loader";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import makeToast from "../../components/Toaster";

import {
  getEmergencyDoctorDetails,
  updateEmergencyDoctor,
} from "../../actions/emergencyDoctorActions";

import { EMERGENCY_DOCTOR_UPDATE_RESET } from "../../constants/emergencyDoctorConstants";

const EmergencyDoctorEditScreen = ({ history, match }) => {
  const [textdetails, setTextDetails] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();

  const emergencyDoctorDetails = useSelector(
    (state) => state.emergencyDoctorDetails
  );
  const { emergencydoctordetails } = emergencyDoctorDetails;

  const emergencyDoctorUpdate = useSelector(
    (state) => state.emergencyDoctorUpdate
  );
  const { success: successUpdate } = emergencyDoctorUpdate;
  const emergencyDoctorId = match.params.id;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: EMERGENCY_DOCTOR_UPDATE_RESET });

      makeToast("success", "Successfully Updated");

      history.push("/emergency-doctor-list");
    } else {
      if (
        !emergencydoctordetails.phone ||
        emergencydoctordetails._id !== emergencyDoctorId
      ) {
        dispatch(getEmergencyDoctorDetails(emergencyDoctorId));
      } else {
        setPhone(emergencydoctordetails.phone);
        setTextDetails(emergencydoctordetails.textdetails);
      }
    }
  }, [
    dispatch,
    history,
    emergencyDoctorId,
    emergencydoctordetails,
    successUpdate,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateEmergencyDoctor({ _id: match.params.id, phone, textdetails })
    );
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
                    <Form onSubmit={submitHandler}>
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
                          value={textdetails}
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

export default EmergencyDoctorEditScreen;
