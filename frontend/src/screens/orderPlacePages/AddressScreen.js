import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Footer from "../../components/Footer";

import CheckoutSteps from "../../components/CheckoutSteps";
import { saveShippingAddress } from "../../actions/cartActions";
// import Header from "../../components/Header";

const AddressScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const Header = React.lazy(() => import("../../components/Header"));
  const Footer = React.lazy(() => import("../../components/Footer"));
  const [name, setName] = useState(userInfo.name);
  const [address, setAddress] = useState(saveShippingAddress.address);
  const [phone, setPhone] = useState(userInfo.phone);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ name, address, phone }));
    if (cart.productType === "health-test") {
      history.push("/login");
    } else {
      history.push("/payment");
    }
  };

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
      <div class="content">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-12">
              <div class="card flex-fill">
                <CheckoutSteps step1 step2 />
                <div class="card-header">
                  <h4 class="card-title">Collection Information</h4>
                </div>

                <div class="card-body">
                  <form onSubmit={submitHandler}>
                    {/* <div class="form-group row">
                      <label class="col-lg-3 col-form-label">Name</label>
                      <div class="col-lg-9">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Enter Your Name"
                          value={userInfo.name}
                          required
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div> */}
                    {/* <div class="form-group row">
                      <label class="col-lg-3 col-form-label">Phone</label>
                      <div class="col-lg-9">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Enter Mobile Number"
                          value={userInfo.phone}
                          required
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div> */}

                    <div class="form-group row">
                      <label class="col-lg-3 col-form-label">Name</label>
                      <div class="col-lg-9">
                        <input
                          type="text"
                          placeholder="Enter Name"
                          defaultValue={userInfo.name}
                          required
                          onChange={(e) => setName(e.target.value)}
                          class="form-control"
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-lg-3 col-form-label">Phone</label>
                      <div class="col-lg-9">
                        <input
                          type="text"
                          placeholder="Enter address"
                          defaultValue={userInfo.phone}
                          required
                          onChange={(e) => setPhone(e.target.value)}
                          class="form-control"
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-lg-3 col-form-label">Address</label>
                      <div class="col-lg-9">
                        <input
                          type="text"
                          placeholder="Enter address"
                          value={address}
                          required
                          onChange={(e) => setAddress(e.target.value)}
                          class="form-control"
                        />
                      </div>
                    </div>

                    <div class="text-right">
                      <button type="submit" class="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddressScreen;
