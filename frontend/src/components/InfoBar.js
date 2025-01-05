import React from "react";
import { Helmet } from "react-helmet";

const InfoBar = ({ room }) => (
  <div>
    <Helmet>
      <link rel="stylesheet" href="assets/css/InfoBar.css" />
    </Helmet>
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" alt="online icon" />
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/">
          <img alt="close icon" />
        </a>
      </div>
    </div>
  </div>
);

export default InfoBar;
