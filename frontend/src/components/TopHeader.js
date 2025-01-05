import React from "react";

const TopHeader = () => {
  return (
    <>
      {/* <!--Top Header --> */}
      <div class="header-top">
        <div class="left-top ">
          <ul>
            <li>
              <i class="fas fa-map-marker-alt top-icon"></i>68/2 Hazi Mohsin
              Road, khulna,Bangladesh.
            </li>
            <li>
              <i class="fas fa-phone-volume top-icon"></i>01917118877
            </li>
            <li>
              <i class="fas fa-envelope top-icon"></i>
              xpertsamplekhulna@gmail.com
            </li>
          </ul>
        </div>
        <div class="right-top ">
          <ul>
            <li>
              <i class="fab fa-facebook-f top-icons"></i>
            </li>
            {/* <li>
              <i class="fab fa-instagram top-icons"></i>
            </li>
            <li>
              <i class="fab fa-linkedin-in top-icons"></i>
            </li>
            <li>
              <i class="fab fa-twitter top-icons"></i>
            </li> */}
          </ul>
        </div>
      </div>
      {/* <!--/Top Header --> */}
    </>
  );
};

export default TopHeader;
