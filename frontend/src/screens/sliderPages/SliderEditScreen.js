import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import HeaderAdmin from "../../components/HeaderAdmin";
import Loader from "../../components/Loader";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import makeToast from "../../components/Toaster";

import {
  createSlider,
  getSliderDetails,
  updateSlider,
} from "../../actions/sliderActions";

import { SLIDER_UPDATE_RESET } from "../../constants/sliderConstants";

const SliderEditScreen = ({ history, match }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const sliderId = match.params.id;
  const dispatch = useDispatch();

  const sliderDetails = useSelector((state) => state.sliderDetails);
  const { loading, error, sliderdetails } = sliderDetails;

  const sliderUpdate = useSelector((state) => state.sliderUpdate);
  const { success: successUpdate } = sliderUpdate;

  // useEffect(() => {
  //   dispatch(listTestCategories());
  //   dispatch(getSpecialistDetails(match.params.id));
  // }, [dispatch]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SLIDER_UPDATE_RESET });

      makeToast("success", "Successfully Updated");

      history.push("/slider-list");
    } else {
      if (!sliderdetails.name || sliderdetails._id !== sliderId) {
        dispatch(getSliderDetails(sliderId));
      } else {
        setName(sliderdetails.name);
        setImage(sliderdetails.image);
      }
    }
  }, [dispatch, history, sliderId, sliderdetails, successUpdate]);

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

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateSlider({ _id: match.params.id, name, image }));
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
                  <h3 class="page-title">Create Slider</h3>
                  <ul class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="index.html">Dashboard</a>
                    </li>
                    <li class="breadcrumb-item active">Sliders</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-xl-6 d-flex">
                <div class="card flex-fill">
                  <div class="card-header">
                    <h4 class="card-title">Create Slider </h4>
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
                            to={"/slider-list"}
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

export default SliderEditScreen;
