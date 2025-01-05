import React from "react";
import Header from "../../components/Header";

const AmbulanceScreen = () => {
  return (
    <div class="main-wrapper">
      <Header />
      {/* <!-- Breadcrumb --> */}
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
                    Special Service
                  </li>
                </ol>
              </nav>
              <h2 class="breadcrumb-title">Find Emergency Ambulance</h2>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Breadcrumb --> */}

      <div class="content">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="blog-view">
                <div class="blog blog-single-post">
                  <h3 class="blog-title">Find Ambulance</h3>
                  <div class="blog-info clearfix"></div>

                  <div class="card-body">
                    <p>
                      We provide some of Khulna City’s Best private hospital’s
                      ambulance number where you can contact with them in case
                      of your emergency.
                    </p>
                    <br />
                    <div class="row">
                      {/* <div class="col-md-7 col-lg-5 col-xl-4">
                        <div class="card widget-profile pat-widget-profile">
                          <div class="card-body">
                            <div class="pro-widget-content">
                              <div class="profile-info-widget">
                                <img
                                  alt="Card Image"
                                  src="assets/img/ambulance/city_medical.jpg"
                                  class="card-img-top"
                                />
                              </div>
                            </div>
                            <div class="card-header">
                              <h5 class="card-title mb-0">
                                Khulna City Medical College &amp; Hospital
                              </h5>
                            </div>

                            <div class="patient-info">
                              <ul>
                                <li>
                                  Phone <span>+1 828 632 9170</span>
                                </li>
                              </ul>
                            </div>
                            <br />
                            <a class="btn btn-primary" href="#">
                              Send Request
                            </a>
                          </div>
                        </div>
                      </div> */}

                      <div class="col-12 col-md-6 col-lg-4 d-flex">
                        <div class="card flex-fill">
                          <img
                            height="250px"
                            width="150px"
                            alt="Card Image"
                            src="assets/img/ambulance/city_medical.jpg"
                            class="card-img-top"
                          />
                          <div class="card-header">
                            <h5 class="card-title mb-0">
                              Khulna City Medical College &amp; Hospital
                            </h5>
                          </div>
                          <div class="card-body">
                            <div class="patient-info">
                              <ul>
                                <li>
                                  Phone{" "}
                                  <span>
                                    {" "}
                                    <i
                                      class="fa fa-phone"
                                      aria-hidden="true"
                                    ></i>
                                    01989995031
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <br />
                            {/* <a class="btn btn-primary" href="#">
                              Send Request
                            </a> */}
                          </div>
                        </div>
                      </div>

                      <div class="col-10 col-md-4 col-lg-4 d-flex">
                        <div class="card flex-fill">
                          <img
                            height="250px"
                            width="150px"
                            alt="Card Image"
                            src="assets/img/ambulance/forties.jpg"
                            class="card-img-top"
                          />
                          <div class="card-header">
                            <h5 class="card-title mb-0">
                              Fortis Escorts Heart Institute & Research Centre
                            </h5>
                          </div>
                          <div class="card-body">
                            <div class="patient-info">
                              <ul>
                                <li>
                                  Phone{" "}
                                  <span>
                                    {" "}
                                    <i
                                      class="fa fa-phone"
                                      aria-hidden="true"
                                    ></i>
                                    01787668169
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <br />
                            {/* <a class="btn btn-primary" href="#">
                              Send Request
                            </a> */}
                          </div>
                        </div>
                      </div>

                      <div class="col-12 col-md-6 col-lg-4 d-flex">
                        <div class="card flex-fill">
                          <img
                            height="250px"
                            width="150px"
                            alt="Card Image"
                            src="assets/img/ambulance/islami.jpg"
                            class="card-img-top"
                          />
                          <div class="card-header">
                            <h5 class="card-title mb-0">
                              Islami Bank hospital
                            </h5>
                          </div>
                          <div class="card-body">
                            <div class="patient-info">
                              <ul>
                                <li>
                                  Phone{" "}
                                  <span>
                                    {" "}
                                    <i
                                      class="fa fa-phone"
                                      aria-hidden="true"
                                    ></i>
                                    01749526875
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <br />
                            {/* <a class="btn btn-primary" href="#">
                              Send Request
                            </a> */}
                          </div>
                        </div>
                      </div>

                      <div class="col-10 col-md-3 col-lg-4 d-flex">
                        <div class="card flex-fill">
                          <img
                            height="250px"
                            width="150px"
                            alt="Card Image"
                            src="assets/img/ambulance/addin.jpg"
                            class="card-img-top"
                          />
                          <div class="card-header">
                            <h5 class="card-title mb-0">
                              Ad-din Akij Medical College & Hospital
                            </h5>
                          </div>
                          <div class="card-body">
                            <div class="patient-info">
                              <ul>
                                <li>
                                  Phone{" "}
                                  <span>
                                    {" "}
                                    <i
                                      class="fa fa-phone"
                                      aria-hidden="true"
                                    ></i>
                                    01713488422
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <br />
                            {/* <a class="btn btn-primary" href="#">
                              Send Request
                            </a> */}
                          </div>
                        </div>
                      </div>
                      <div class="col-10 col-md-4 col-lg-4 d-flex">
                        <div class="card flex-fill">
                          <img
                            height="250px"
                            width="150px"
                            alt="Card Image"
                            src="assets/img/ambulance/gazi.jpg"
                            class="card-img-top"
                          />
                          <div class="card-header">
                            <h5 class="card-title mb-0">
                              Khulna Gazi Medical College Hospital
                            </h5>
                          </div>
                          <div class="card-body">
                            <div class="patient-info">
                              <ul>
                                <li>
                                  Phone
                                  <span>
                                    <i
                                      class="fa fa-phone"
                                      aria-hidden="true"
                                    ></i>
                                    +1 828 632 9170
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <br />
                            {/* <a class="btn btn-primary" href="#">
                              Send Request
                            </a> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceScreen;
