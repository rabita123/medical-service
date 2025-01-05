import axios from "axios";
import React, { useState, useEffect, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getDoctorDetails, updateDoctor } from "../../actions/doctorActions";
import makeToast from "../../components/Toaster";
import { DOCTOR_UPDATE_RESET } from "../../constants/doctorConstants";
import { listSpecialists } from "../../actions/specialistActions";
const HeaderAdmin = lazy(() => import("../../components/HeaderAdmin"));
const Sidebar = lazy(() => import("../../components/Sidebar"));
const Loader = lazy(() => import("../../components/Loader"));

const DoctorEditScreen = ({ history, match }) => {
  const [name, setName] = useState("");
  const [fees, setFees] = useState(0);
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [degree, setDegree] = useState("");
  const [specialization, setSpecialization] = useState("");

  const [days, setDays] = useState("");
  const [times, setTimes] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const specialist = useSelector((state) => state.specialist);
  const { specialists } = specialist;

  console.log(specialists);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const doctorDetails = useSelector((state) => state.doctorDetails);
  const { doctordetails } = doctorDetails;

  const doctorUpdate = useSelector((state) => state.doctorUpdate);
  const { success: successUpdate } = doctorUpdate;

  const doctorId = match.params.id;

  useEffect(() => {
    dispatch(listSpecialists());
    if (successUpdate) {
      dispatch({ type: DOCTOR_UPDATE_RESET });

      makeToast("success", "Successfully Updated");

      history.push("/admin-health-productlist");
    } else {
      if (!doctordetails.name || doctordetails._id !== doctorId) {
        dispatch(getDoctorDetails(doctorId));
      } else {
        setName(doctordetails.name);
        setFees(doctordetails.fees);
        setImage(doctordetails.image);
        setLocation(doctordetails.location);
        setDegree(doctordetails.degree);
        setSpecialization(doctordetails.specialization);
        setDays(doctordetails.days);
        setTimes(doctordetails.times);
      }
    }
  }, [dispatch, history, doctorId, doctordetails, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateDoctor({
        _id: match.params.id,
        name,
        image,
        fees,
        location,
        degree,
        specialization,
        days,
        times,
      })
    );
    makeToast("success", "Successfully Updated");
    // window.location.reload(true);
    history.push("/doctor-lists");
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
                  <h3 class="page-title">Add Doctors</h3>
                  <ul class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="index.html">Dashboard</a>
                    </li>
                    <li class="breadcrumb-item active">Doctors</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-xl-6 d-flex">
                <div class="card flex-fill">
                  <div class="card-header">
                    <h4 class="card-title">Add Doctors</h4>
                  </div>
                  <div class="card-body">
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="category">
                        <Form.Label>Specialist</Form.Label>

                        <Form.Control
                          as="select"
                          custom
                          onChange={(e) => setSpecialization(e.target.value)}
                        >
                          <option value="">Select</option>
                          {specialists.map((specialist) =>
                            doctordetails.specialization === specialist.name ? (
                              <option value={specialist.name} selected>
                                {" "}
                                {specialist.name}
                              </option>
                            ) : (
                              <option value={specialist.name}>
                                {" "}
                                {specialist.name}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="image">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId="image">
                        <Form.Label>Degree</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Degree"
                          value={degree}
                          onChange={(e) => setDegree(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group controlId="price">
                        <Form.Label>Fees</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter price"
                          value={fees}
                          onChange={(e) => setFees(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group controlId="image">
                        <Form.Label>Photo</Form.Label>
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

                      <Form.Group controlId="description">
                        <Form.Label>Input Days</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Days (ex:Sun-Thu,Fri Closed)"
                          value={days}
                          onChange={(e) => setDays(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group controlId="description">
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Time (10.00 AM- 12.00AM)"
                          value={times}
                          onChange={(e) => setTimes(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group controlId="description">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter description"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
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
                            to={"/admin-add-doctors"}
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

export default DoctorEditScreen;
