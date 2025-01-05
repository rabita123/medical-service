import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      {/* <!-- Sidebar --> */}
      <div class="sidebar" id="sidebar">
        <div class="sidebar-inner slimscroll">
          <div id="sidebar-menu" class="sidebar-menu">
            <ul>
              <li class="menu-title">
                <span>Main</span>
              </li>
              <li>
                <Link to="/admin-dashboard">
                  <i class="fe fe-home"></i> <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/admin-user-list">
                  <i class="fe fe-user"></i> <span> User List</span>
                </Link>
              </li>

              <li>
                <Link to="/admin-order-list">
                  <i class="fa fa-shopping-basket"></i> <span> Orders</span>
                </Link>
              </li>

              <li>
                <Link to="/admin-appointment-list">
                  <i class="fa fa-heartbeat"></i> <span>Appointments </span>
                </Link>
              </li>

              <li>
                <Link to="/admin-health-productlist">
                  <i class="fa fa-medkit"></i> <span>Products</span>
                </Link>
              </li>

              <li>
                <Link to="/doctor-lists">
                  <i class="fa fa-user-md"></i> <span>Doctors</span>
                </Link>
              </li>

              <li>
                <Link to="/specialist-list">
                  <i class="fa fa-stethoscope"></i> <span>Specialists</span>
                </Link>
              </li>

              <li>
                <Link to="/slider-list">
                  <i class="fa fa-file-image-o"></i> <span>Slider </span>
                </Link>
              </li>

              <li>
                <Link to="/emergency-doctor-list">
                  <i class="fa fa-heartbeat"></i> <span>Emergency Doctor </span>
                </Link>
              </li>

              <li>
                <Link to="/admin-ambulance-list">
                  <i class="fa fa-ambulance"></i>{" "}
                  <span>Ambulance Service </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <!-- /Sidebar --> */}
    </div>
  );
};

export default Sidebar;
