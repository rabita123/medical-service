import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LinkContainer } from "react-router-bootstrap";

import HeaderAdmin from "../../components/HeaderAdmin";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet";

import { listEmergencyDoctors } from "../../actions/emergencyDoctorActions";

import { CommonLoading } from "react-loadingg";

const EmergencyDoctorListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const emergencyDoctorList = useSelector((state) => state.emergencyDoctorList);
  const { loading, error, emergencydoctors } = emergencyDoctorList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listEmergencyDoctors());
    } else {
      history.push("/login");
    }
  }, [dispatch, history]);

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
                  <h3 class="page-title">Emergency octor</h3>
                  <ul class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="index.html">Dashboard</a>
                    </li>
                    <li class="breadcrumb-item active">Emergency Doctor</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-12">
                <div class="card">
                  <div class="card-header">
                    <h4 class="card-title">Emergency Doctors</h4>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-hover mb-0">
                        <thead>
                          <tr>
                            <th>ID</th>

                            <th>Phone</th>
                            <th>Text</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading && <CommonLoading />}
                          {emergencydoctors.map((emergencydoctor, i) => (
                            <tr key={emergencydoctor._id}>
                              <td>{i + 1}</td>
                              <td>{emergencydoctor.phone}</td>

                              <td>{emergencydoctor.textdetails}</td>
                              <td>
                                <LinkContainer
                                  to={`/admin-emergency-doctor/${emergencydoctor._id}/edit/`}
                                >
                                  <i className="fas fa-edit"></i>
                                </LinkContainer>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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

export default EmergencyDoctorListScreen;
