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

const Header = lazy(() => import("../../components/Header"));

const DoctorBySpecialistScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const testId = match.params.id;
  console.log(testId);

  const [categoryId, setCategoryId] = React.useState();

  const refreshPage = () => {
    window.location.reload(false);
  };

  const test = useSelector((state) => state.test);
  const { alltests } = test;

  const testById = useSelector((state) => state.testById);
  const { alltestsbycategories } = testById;

  const specialist = useSelector((state) => state.specialist);
  const { specialists } = specialist;

  const checkoutHandler = (id) => {
    history.push(`/login?redirect=booking-appointment/${id}`);
  };

  useEffect(() => {
    dispatch(listSpecialists());

    dispatch(listDoctorsBySpeciality(testId));
  }, [dispatch]);

  const doctorListBySpecialist = useSelector(
    (state) => state.doctorListBySpecialist
  );
  const { doctorlistbyspecialist } = doctorListBySpecialist;
  console.log(doctorlistbyspecialist);
  const onClick = (id) => {
    dispatch(listDoctorsBySpeciality(id));
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

            <div class="col-md-12 col-lg-8 col-xl-9">
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
                            <Link to={`/doctor/${doctorlistbyspecialists._id}`}>
                              {doctorlistbyspecialists.name}
                            </Link>
                          </h4>
                          <p class="doc-speciality">
                            {doctorlistbyspecialists.degree}
                          </p>
                          <h5 class="doc-department">
                            <img
                              src="/assets/img/specialities/specialities-05.png"
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
                          <div class="clinic-booking">
                            <Link
                              to={`/doctor/${doctorlistbyspecialists._id}`}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorBySpecialistScreen;
