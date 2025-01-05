import React, { useState, useEffect, lazy } from "react";
import { Link } from "react-router-dom";

const Header = lazy(() => import("../../components/Header"));
const Footer = lazy(() => import("../../components/Footer"));

const EmergencyDoctorScreen = () => {
  return (
    <div>
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
                      Emergency Doctor
                    </li>
                  </ol>
                </nav>
                <h2 class="breadcrumb-title">Emergency Doctor</h2>
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
                    <h3 class="blog-title">Emergency Doctor </h3>

                    <div class="blog-info-style">
                      <p>
                        We provide well trained and well behaved nurse for the
                        client’s to take care their family patients in their
                        home.
                      </p>
                    </div>

                    <div class="card-body">
                      <div class="tab-content">
                        <div
                          class="tab-pane show active"
                          id="solid-rounded-justified-tab1"
                        >
                          <div class="row">
                            <div class="col-md-12 col-lg-4 col-xl-4 product-custom">
                              <div class="profile-widget">
                                <div class="pro-content">
                                  <h3 class="title pb-4">
                                    <Link>Contact</Link>
                                  </h3>

                                  <h3 class="title pb-4">
                                    Mobile: 01939900377{" "}
                                    <i
                                      class="fa fa-phone"
                                      aria-hidden="true"
                                    ></i>
                                  </h3>

                                  <div class="row align-items-center">
                                    <div class="col-lg-6">
                                      <div class="clinic-booking pt-4"></div>
                                    </div>
                                    {/* <div class="col-lg-6 text-right">
                        <a href="cart.html" class="cart-icon">
                          <i class="fas fa-shopping-cart"></i>
                        </a>
                      </div> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      );
    </div>
  );
};

export default EmergencyDoctorScreen;
