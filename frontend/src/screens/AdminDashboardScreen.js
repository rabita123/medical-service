import React, { useEffect, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { listDoctors } from "../actions/doctorActions";
import { listAppointments } from "../actions/appointmentActions";

const Sidebar = lazy(() => import("../components/Sidebar"));
const HeaderAdmin = lazy(() => import("../components/HeaderAdmin"));
const Loader = lazy(() => import("../components/Loader"));

const AdminDashboardScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo } = userLogin;

  const doctorList = useSelector((state) => state.doctorList);
  const { doctors } = doctorList;

  const appointmentList = useSelector((state) => state.appointmentList);
  const { appointments } = appointmentList;

  const doctorNumber = doctors.length;
  const appointmentNumber = appointments.length;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listDoctors());
      dispatch(listAppointments());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <div>
      <HeaderAdmin />
      <Helmet>
        <link rel="stylesheet" href="admin/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="admin/assets/css/feathericon.min.css" />
        <link rel="stylesheet" href="admin/assets/css/font-awesome.min.css" />
        <link rel="stylesheet" href="admin/assets/css/style.css" />
      </Helmet>
      <Sidebar />
      <div class="main-wrapper">
        {loading && <Loader />}
        {/* <!-- Page Wrapper --> */}

        <div class="page-wrapper">
          <div class="content container-fluid">
            {/* <!-- Page Header --> */}
            <div class="page-header">
              <div class="row">
                <div class="col-sm-12">
                  <h3 class="page-title">Welcome Admin!</h3>
                  <ul class="breadcrumb">
                    <li class="breadcrumb-item active">Dashboard</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <!-- /Page Header --> */}

            <div class="row">
              <div class="col-xl-3 col-sm-6 col-12">
                <div class="card">
                  <div class="card-body">
                    <div class="dash-widget-header">
                      <span class="dash-widget-icon text-primary border-primary">
                        <i class="fe fe-users"></i>
                      </span>
                      <div class="dash-count">
                        <h3>{doctorNumber}</h3>
                      </div>
                    </div>
                    <div class="dash-widget-info">
                      <h6 class="text-muted">Doctors</h6>
                      <div class="progress progress-sm">
                        <div class="progress-bar bg-primary w-50"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 col-12">
                <div class="card">
                  <div class="card-body">
                    <div class="dash-widget-header">
                      <span class="dash-widget-icon text-success">
                        <i class="fe fe-credit-card"></i>
                      </span>
                      <div class="dash-count">
                        <h3>{appointmentNumber}</h3>
                      </div>
                    </div>
                    <div class="dash-widget-info">
                      <h6 class="text-muted">Patients</h6>
                      <div class="progress progress-sm">
                        <div class="progress-bar bg-success w-50"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 col-12">
                <div class="card">
                  <div class="card-body">
                    <div class="dash-widget-header">
                      <span class="dash-widget-icon text-danger border-danger">
                        <i class="fe fe-money"></i>
                      </span>
                      <div class="dash-count">
                        <h3>{appointmentNumber}</h3>
                      </div>
                    </div>
                    <div class="dash-widget-info">
                      <h6 class="text-muted">Appointment</h6>
                      <div class="progress progress-sm">
                        <div class="progress-bar bg-danger w-50"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div class="col-xl-3 col-sm-6 col-12">
                <div class="card">
                  <div class="card-body">
                    <div class="dash-widget-header">
                      <span class="dash-widget-icon text-warning border-warning">
                        <i class="fe fe-folder"></i>
                      </span>
                      <div class="dash-count">
                        <h3>$62523</h3>
                      </div>
                    </div>
                    <div class="dash-widget-info">
                      <h6 class="text-muted">Revenue</h6>
                      <div class="progress progress-sm">
                        <div class="progress-bar bg-warning w-50"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <div class="row">
              <div class="col-md-12 col-lg-6">
                {/* <!-- Sales Chart --> */}
                <div class="card card-chart">
                  <div class="card-header">
                    <h4 class="card-title">Revenue</h4>
                  </div>
                  <div class="card-body">
                    <div id="morrisArea"></div>
                  </div>
                </div>
                {/* <!-- /Sales Chart --> */}
              </div>
              <div class="col-md-12 col-lg-6">
                {/* <!-- Invoice Chart --> */}
                <div class="card card-chart">
                  <div class="card-header">
                    <h4 class="card-title">Status</h4>
                  </div>
                  <div class="card-body">
                    <div id="morrisLine"></div>
                  </div>
                </div>
                {/* <!-- /Invoice Chart --> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <!-- /Page Wrapper -->
  );
};

export default AdminDashboardScreen;
