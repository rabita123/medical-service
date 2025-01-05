import React, { useEffect, Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ConfirmOrderScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  return (
    <div class="main-wrapper">
      <Header />

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
                      <br /> one of our agent will contact with you{" "}
                      <strong>within 2 hours.</strong>
                      <br />
                      Till then please have patience .
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

export default ConfirmOrderScreen;
