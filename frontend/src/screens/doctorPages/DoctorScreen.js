import React, { useEffect, Component, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listTestCategories } from "../../actions/testCategoriesActions";
import { listAllTests } from "../../actions/testActions";
import { listSpecialists } from "../../actions/specialistActions";
import {
  listDoctors,
  listDoctorsBySpeciality,
} from "../../actions/doctorActions";
import { CommonLoading } from "react-loadingg";
import loadingImage from "../../empty.png";
import Img from "react-cool-img";
import Image, { Shimmer } from "react-shimmer";

const Header = lazy(() => import("../../components/Header"));

const DoctorScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const testId = match.params.id;
  console.log(testId);

  const [showResults, setShowResults] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState();
  const [showResultcategories, setShowResultcategories] = React.useState(false);

  const refreshPage = () => {
    window.location.reload(false);
  };
  const testCategories = useSelector((state) => state.testCategories);
  const { testcategories } = testCategories;

  const test = useSelector((state) => state.test);
  const { alltests } = test;

  const testById = useSelector((state) => state.testById);
  const { alltestsbycategories } = testById;

  const specialist = useSelector((state) => state.specialist);
  const { specialists } = specialist;

  const doctorListBySpecialist = useSelector(
    (state) => state.doctorListBySpecialist
  );
  const { loadingspecialist, doctorlistbyspecialist } = doctorListBySpecialist;

  const doctorList = useSelector((state) => state.doctorList);
  const { loading, error, doctors } = doctorList;

  const addToCartHandler = (id) => {
    history.push(`/cart/${id}`);
    //history.push(`/cart/${match.params.id}`);
  };

  const checkoutHandler = (id) => {
    history.push(`/login?redirect=booking-appointment/${id}`);
  };

  const onClick = (id) => {
    setShowResults(false);
    setShowResultcategories(true);
    setCategoryId(id);
    // dispatch(listAllTestByCategories(id));
    dispatch(listDoctorsBySpeciality(id));
  };

  useEffect(() => {
    dispatch(listSpecialists());
    dispatch(listDoctors());
  }, [dispatch]);

  const Results = () => {
    return (
      <>
        {loading && <CommonLoading />}
        <div class="col-md-12 col-lg-8 col-xl-9">
          {doctors.map((doctor) => (
            <div class="card">
              <div class="card-body">
                <div class="doctor-widget">
                  <div class="doc-info-left">
                    <div class="doctor-img">
                      <a href="doctor-profile.html">
                        <Img
                          src={doctor.image}
                          class="img-fluid"
                          alt="User Image"
                          placeholder={loadingImage}
                        />
                      </a>
                    </div>
                    <div class="doc-info-cont">
                      <h4 class="doc-name">
                        <Link to={`/doctor/${doctor._id}`}>{doctor.name}</Link>
                      </h4>
                      <p class="doc-speciality">{doctor.degree}</p>
                      <h5 class="doc-department">
                        <img
                          src="assets/img/specialities/specialities-05.png"
                          class="img-fluid"
                          alt="Speciality"
                        />
                        {doctor.specialization}
                      </h5>
                      <p>
                        <i class="far fa-money-bill-alt"></i>
                        <b> Fees:</b> {doctor.fees} BDT{" "}
                      </p>
                      <p>
                        <i class=""></i>
                        <b> Location:</b> {doctor.location}
                      </p>
                      <div class="clinic-booking">
                        <Link
                          to={`/doctor/${doctor._id}`}
                          class="view-pro-btn"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div class="doc-info-right">
                    <div class="clini-infos">
                      <ul></ul>
                    </div>
                    <div class="clinic-booking">
                      <p>
                        <i class=""></i>
                        <b> Available:</b> {doctor.days}
                      </p>
                      <p>
                        <i class=""></i>
                        <b> Time:</b> {doctor.times}
                      </p>

                      <Link class="view-pro-btn" to={`/doctor/${doctor._id}`}>
                        View Profile
                      </Link>
                      <br />

                      <button
                        class="btn btn-info"
                        onClick={() => checkoutHandler(doctor._id)}
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  const Resultcategories = () => {
    return (
      <div class="col-md-12 col-lg-8 col-xl-9">
        {loadingspecialist && <CommonLoading />}
        {doctorlistbyspecialist.map((doctorlistbyspecialists) => (
          <div class="card">
            <div class="card-body">
              <div class="doctor-widget">
                <div class="doc-info-left">
                  <div class="doctor-img">
                    <a href="doctor-profile.html">
                      <Img
                        src={doctorlistbyspecialists.image}
                        class="img-fluid"
                        alt="User Image"
                        placeholder={loadingImage}
                      />
                    </a>
                  </div>
                  <div class="doc-info-cont">
                    <h4 class="doc-name">
                      <a href="doctor-profile.html">
                        {doctorlistbyspecialists.name}
                      </a>
                    </h4>
                    <p class="doc-speciality">
                      {doctorlistbyspecialists.degree}
                    </p>
                    <h5 class="doc-department">
                      <img
                        src="assets/img/specialities/specialities-05.png"
                        class="img-fluid"
                        alt="Speciality"
                      />
                      {doctorlistbyspecialists.specialization}
                    </h5>
                    <p>
                      <i class="far fa-money-bill-alt"></i>
                      <b> Fees:</b> {doctorlistbyspecialists.fees} BDT{" "}
                    </p>

                    <p>
                      <i class="far fa-money-bill-alt"></i>
                      <b> Time:</b> {doctorlistbyspecialists.times}
                    </p>
                  </div>
                </div>
                <div class="doc-info-right">
                  <div class="clini-infos">
                    <ul>
                      {/* <li>
					  <i class="far fa-thumbs-up"></i> 98%
					</li>
					<li>
					  <i class="far fa-comment"></i> 17 Feedback
					</li>
					<li>
					  <i class="fas fa-map-marker-alt"></i> Florida, USA
					</li> */}
                      {/* <li>
					  <i class="far fa-money-bill-alt"></i>
					  <b>Fees:</b> 700 BDT{" "}
					</li> */}
                    </ul>
                  </div>
                  <div class="clinic-booking">
                    <p>
                      <i class="far fa-money-bill-alt"></i>
                      <b> Location:</b> {doctorlistbyspecialists.location}
                    </p>
                    <p>
                      <i class="far fa-money-bill-alt"></i>
                      <b> Available:</b> {doctorlistbyspecialists.days}
                    </p>
                    <Link
                      class="view-pro-btn"
                      to={`/doctor/${doctorlistbyspecialists._id}`}
                    >
                      View Profile
                    </Link>
                    <br />

                    <button
                      class="btn btn-info"
                      onClick={() =>
                        checkoutHandler(doctorlistbyspecialists._id)
                      }
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div class="main-wrapper">
      <Header />

      <div class="breadcrumb-bar">
        <div class="container-fluid">
          <div class="row align-items-center">
            <div class="col-md-12 col-12">
              <nav aria-label="breadcrumb" class="page-breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Book Appointment
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Book Appointment
                  </li>
                </ol>
              </nav>
              <h2 class="breadcrumb-title">
                <span class="text-small text-white ml-2">
                  {" "}
                  <b> Book Appointment</b>
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12 col-lg-4 col-xl-3 theiaStickySidebar">
              <div class="card search-filter">
                <div class="card-header"></div>
                <div class="card-body">
                  <div class="filter-widget">
                    <h4>Select Specialist</h4>

                    <div>
                      {/* <span class="checkmark"></span> */}

                      <label>
                        {" "}
                        <Link onClick={refreshPage}>All</Link>
                      </label>
                    </div>
                    {specialists.map((specialist) => (
                      <div key={specialist._id}>
                        <label>
                          {loadingspecialist && <CommonLoading />}
                          <Link onClick={() => onClick(specialist._id)}>
                            {specialist.name}
                          </Link>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {showResults ? <Results /> : null}

            {showResultcategories ? <Resultcategories /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorScreen;
