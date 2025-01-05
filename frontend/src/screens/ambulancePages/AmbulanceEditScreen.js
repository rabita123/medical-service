import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import { Table, Button, Row, Col, Form } from "react-bootstrap";
import HeaderAdmin from "../../components/HeaderAdmin";
import Loader from "../../components/Loader";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import makeToast from "../../components/Toaster";

import {
  getAmbulanceDetails,
  updateAmbulance,
} from "../../actions/ambulanceActions";
import { AMBULANCE_UPDATE_RESET } from "../../constants/ambulanceConstants";

const AmbulanceEditScreen = ({ history, match }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const ambulanceId = match.params.id;
  const dispatch = useDispatch();

  const ambulanceDetails = useSelector((state) => state.ambulanceDetails);
  const { loading, error, ambulancedetails } = ambulanceDetails;

  const ambulanceUpdate = useSelector((state) => state.ambulanceUpdate);
  const { success: successUpdate } = ambulanceUpdate;

  useEffect(() => {
    dispatch(getAmbulanceDetails(match.params.id));
  }, [dispatch]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: AMBULANCE_UPDATE_RESET });

      makeToast("success", "Successfully Updated");

      history.push("/admin-ambulance-list");
    } else {
      if (
        !ambulancedetails.name ||
        !ambulancedetails.phone ||
        !ambulancedetails.image ||
        ambulancedetails._id !== ambulanceId
      ) {
        dispatch(getAmbulanceDetails(ambulanceId));
      } else {
        setName(ambulancedetails.name);
        setPhone(ambulancedetails.phone);
        setImage(ambulancedetails.image);
      }
    }
  }, [dispatch, history, ambulanceId, ambulancedetails, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateAmbulance({ _id: match.params.id, name, phone, image }));
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);

      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
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
                  <h3 class="page-title">Update Ambulance</h3>
                  <ul class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="index.html">Dashboard</a>
                    </li>
                    <li class="breadcrumb-item active">Ambulances</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-xl-6 d-flex">
                <div class="card flex-fill">
                  <div class="card-header">
                    <h4 class="card-title">Update Ambulance </h4>
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

                      <Form.Group controlId="phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Phone Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group controlId="image">
                        <Form.Label>Image</Form.Label>
                        <div class="col-lg-9">
                          <Form.Control
                            type="text"
                            placeholder="Enter image url"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                          ></Form.Control>
                          <Form.File
                            id="image-file"
                            label="Choose File"
                            custom
                            onChange={uploadFileHandler}
                          ></Form.File>
                          {uploading && <Loader />}
                        </div>
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
                            to={"/admin-ambulance-list"}
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

export default AmbulanceEditScreen;
