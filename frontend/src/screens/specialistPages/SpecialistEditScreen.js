import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";

import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Form } from "react-bootstrap";
import HeaderAdmin from "../../components/HeaderAdmin";
import Loader from "../../components/Loader";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import makeToast from "../../components/Toaster";

import { listTestCategories } from "../../actions/testCategoriesActions";
import {
  createSpecialist,
  getSpecialistDetails,
  updateSpecialist,
} from "../../actions/specialistActions";
import { SPECIALIST_UPDATE_RESET } from "../../constants/specialistConstants";

const SpecialistEditScreen = ({ history, match }) => {
  const [name, setName] = useState("");
  const specialistId = match.params.id;
  const dispatch = useDispatch();

  const specialistDetails = useSelector((state) => state.specialistDetails);
  const { loading, error, specialistdetails } = specialistDetails;

  const specialistUpdate = useSelector((state) => state.specialistUpdate);
  const { success: successUpdate } = specialistUpdate;

  // useEffect(() => {
  //   dispatch(listTestCategories());
  //   dispatch(getSpecialistDetails(match.params.id));
  // }, [dispatch]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SPECIALIST_UPDATE_RESET });

      makeToast("success", "Successfully Updated");

      history.push("/specialist-list");
    } else {
      if (!specialistdetails.name || specialistdetails._id !== specialistId) {
        dispatch(getSpecialistDetails(specialistId));
      } else {
        setName(specialistdetails.name);
      }
    }
  }, [dispatch, history, specialistId, specialistdetails, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateSpecialist({ _id: match.params.id, name }));
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
                  <h3 class="page-title">Create Specialist</h3>
                  <ul class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="index.html">Dashboard</a>
                    </li>
                    <li class="breadcrumb-item active">Specialists</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-xl-6 d-flex">
                <div class="card flex-fill">
                  <div class="card-header">
                    <h4 class="card-title">Create Specialist </h4>
                  </div>
                  <div class="card-body">
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <div class="row">
                        <div class="col-lg-3 text-left">
                          <button
                            type="submit"
                            class="btn btn-block btn-outline-dark active"
                          >
                            <i className="fas fa-plus"></i> Update
                          </button>
                        </div>
                        <div class="col-lg-3 text-left">
                          <Link
                            to={"/specialist-list"}
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

export default SpecialistEditScreen;
