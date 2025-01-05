import React from "react";

const Breadcrumb = () => {
  return (
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
                  Address
                </li>
              </ol>
            </nav>
            <h2 class="breadcrumb-title">
              <span class="text-small text-white ml-2">
                {" "}
                <b>Address</b>
              </span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
