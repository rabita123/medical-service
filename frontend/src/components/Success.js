import React, { useEffect, Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

import Loader from "../components/Loader";

const Success = ({ history, match }) => {
  const dispatch = useDispatch();

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
                    Book Test
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Test Menu
                  </li>
                </ol>
              </nav>
              <h2 class="breadcrumb-title">
                <span class="text-small text-white ml-2">
                  {" "}
                  <b>Test Menu</b>
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>
      {/* 
      <!-- Page Content --> */}
      <div class="content success-page-cont">
        <div class="container-fluid">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              {/* 						
							<!-- Success Card --> */}
              <div class="card success-card">
                <div class="card-body">
                  <div class="success-cont">
                    <i class="fas fa-check"></i>
                    <h3>Successfully Submitted!</h3>
                    <p>
                      Thank You<strong></strong>
                      <br /> for <strong>Providing Your Information</strong>
                    </p>
                    {/* <a
                      href="invoice-view.html"
                      class="btn btn-primary view-inv-btn"
                    >
                      View Invoice
                    </a> */}
                  </div>
                </div>
              </div>
              {/* <!-- /Success Card --> */}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Page Content --> */}

      <Footer />
    </div>
  );
};

export default Success;
