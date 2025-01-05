import React, { useState, useEffect, lazy } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUsersOrders } from "../../actions/orderActions";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { CommonLoading } from "react-loadingg";
const Pagination = lazy(() => import("../../components/Pagination"));

const UserProfileScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);

  useEffect(() => {
    // dispatch(listuserorders());
    dispatch(getUsersOrders(userInfo._id));

    if (userInfo) {
      history.push("/user-profile");
    } else {
      history.push("/login");
    }
  }, [history, dispatch]);
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const orderUserDetails = useSelector((state) => state.orderUserDetails);
  const { orders } = orderUserDetails;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = orders.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (userInfo) {
      history.push("/user-profile");
    } else {
      history.push("/login");
    }
  }, [history, userInfo]);

  return (
    <>
      <Header />
      {/* <!-- Breadcrumb --> */}
      {<CommonLoading />}

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
                    Dashboard
                  </li>
                </ol>
              </nav>
              <h2 class="breadcrumb-title">Dashboard</h2>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Breadcrumb -->
			
			<!-- Page Content --> */}

      <div class="content">
        <div class="container-fluid">
          <div class="row">
            {/* <!-- Profile Sidebar --> */}
            <div class="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
              <div class="profile-sidebar">
                <div class="widget-profile pro-widget-content">
                  <div class="profile-info-widget">
                    <a href="#" class="booking-doc-img">
                      <img src="/uploads/blank.png" alt="User Image" />
                    </a>
                    <div class="profile-det-info">
                      <h3>{userInfo.name}</h3>
                      <div class="patient-details">
                        <h5>
                          <i class="fas fa-birthday-cake"></i> {userInfo.phone}
                        </h5>
                        <h5 class="mb-0">
                          <i class="fas fa-email"></i> {userInfo.email}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dashboard-widget">
                  <nav class="dashboard-menu">
                    <ul>
                      <li class="active">
                        <Link to={"/user-profile"}>
                          <i class="fas fa-columns"></i>
                          <span>Dashboard</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={"/change-password"}>
                          <i class="fas fa-bookmark"></i>
                          <span>Change Password</span>
                        </Link>
                      </li>

                      {/* <li>
                        <a href="index.html">
                          <i class="fas fa-sign-out-alt"></i>
                          <span>Logout</span>
                        </a>
                      </li> */}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            {/* <!-- / Profile Sidebar --> */}

            <div class="col-md-7 col-lg-8 col-xl-9">
              <div class="card">
                <div class="card-body pt-0">
                  {/* 								
									<!-- Tab Menu --> */}
                  <nav class="user-tabs mb-4">
                    <ul class="nav nav-tabs nav-tabs-bottom nav-justified">
                      <li class="nav-item">
                        <a
                          class="nav-link active"
                          href="#pat_appointments"
                          data-toggle="tab"
                        >
                          Orders
                        </a>
                      </li>
                      {/* <li class="nav-item">
                        <a
                          class="nav-link"
                          href="#pat_prescriptions"
                          data-toggle="tab"
                        >
                          Prescriptions
                        </a>
                      </li> */}
                      {/* <li class="nav-item">
												<a class="nav-link" href="#pat_medical_records" data-toggle="tab"><span class="med-records">Medical Records</span></a>
											</li>
											<li class="nav-item">
												<a class="nav-link" href="#pat_billing" data-toggle="tab">Billing</a>
											</li> */}
                    </ul>
                  </nav>
                  {/* <!-- /Tab Menu -->
									
									<!-- Tab Content --> */}
                  <div class="tab-content pt-0">
                    {/* <!-- Appointment Tab --> */}
                    <div
                      id="pat_appointments"
                      class="tab-pane fade show active"
                    >
                      <div class="card card-table mb-0">
                        <div class="card-body">
                          <div class="table-responsive">
                            <table class="table table-hover table-center mb-0">
                              <thead>
                                <tr>
                                  <th>Order ID</th>
                                  <th>Total Price</th>
                                  <th>Payment Status</th>

                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {currentPosts.map((user, i) => (
                                  <tr>
                                    {/* <td>
																		<h2 class="table-avatar">
																			<a href="doctor-profile.html" class="avatar avatar-sm mr-2">
																				<img class="avatar-img rounded-circle" src="assets/img/doctors/doctor-thumb-01.jpg" alt="User Image"/>
																			</a>
																			<a href="doctor-profile.html">Dr. Ruby Perrin <span>Dental</span></a>
																		</h2>
																	</td> */}
                                    <td>#{user._id}</td>
                                    <td>{user.totalPrice}</td>

                                    <td>
                                      {user.isPaid ? (
                                        <span class="badge badge-pill bg-success-light">
                                          Paid
                                        </span>
                                      ) : (
                                        <span class="badge badge-pill bg-danger-light">
                                          Not Paid
                                        </span>
                                      )}
                                    </td>
                                    <td class="text-right">
                                      <div class="table-action">
                                        <Link
                                          to={`/invoice-view/${user._id}`}
                                          class="btn btn-sm bg-primary-light"
                                        >
                                          <i class="fas fa-print"></i> Print
                                        </Link>
                                        <Link
                                          to={`/order/${user._id}`}
                                          class="btn btn-sm bg-info-light"
                                        >
                                          <i class="far fa-eye"></i> View
                                        </Link>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                              <Pagination
                                postsPerPage={postsPerPage}
                                totalPosts={orders.length}
                                paginate={paginate}
                              />
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- /Prescription Tab -->
											
										<!-- Medical Records Tab --> */}
                    <div id="pat_medical_records" class="tab-pane fade">
                      <div class="card card-table mb-0">
                        <div class="card-body">
                          <div class="table-responsive">
                            <table class="table table-hover table-center mb-0">
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>Date </th>
                                  <th>Description</th>
                                  <th>Attachment</th>
                                  <th>Created</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {orders.map((user, i) => (
                                  <tr></tr>
                                ))}
                              </tbody>
                            </table>
                            <div></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- /Medical Records Tab -->
										
										<!-- Billing Tab --> */}
                    <div id="pat_billing" class="tab-pane fade">
                      <div class="card card-table mb-0">
                        <div class="card-body">
                          <div class="table-responsive">
                            <table class="table table-hover table-center mb-0">
                              <thead>
                                <tr>
                                  <th>Invoice No</th>
                                  <th>Doctor</th>
                                  <th>Amount</th>
                                  <th>Paid On</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody></tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- /Billing Tab --> */}
                  </div>
                  {/* <!-- Tab Content --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Page Content --> */}

      <Footer />
    </>
  );
};

export default UserProfileScreen;
