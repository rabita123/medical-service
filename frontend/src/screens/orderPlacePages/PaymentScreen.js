import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CheckoutSteps from "../../components/CheckoutSteps";
import { savePaymentMethod } from "../../actions/cartActions";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/address");
  }

  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
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
                <CheckoutSteps step1 step2 step3 />
                <div class="card-header">
                  <h4 class="card-title">Address</h4>
                </div>

                <div class="card-body">
                  <div class="payment-widget">
                    <form onSubmit={submitHandler}>
                      <h4 class="card-title">Payment Method</h4>

                      {/* <label class="payment-radio credit-card-option">
                        <input
                          type="radio"
                          label="Bkash"
                          id="Bkash"
                          value="Bkash"
                          value={paymentMethod}
                          checked
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span class="checkmark"></span>
                        Bkash
                      </label> */}

                      <div class="payment-list">
                        <label class="payment-radio paypal-option">
                          <input
                            type="radio"
                            name="radio"
                            label="Cash On Delivery"
                            id="Cash On Delivery"
                            value={paymentMethod}
                            value="Cash On Delivery"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <span class="checkmark"></span>
                          Cash On Delivery
                        </label>
                      </div>

                      {/* <!-- Submit Section --> */}
                      <div class="submit-section mt-4">
                        <button
                          type="submit"
                          class="btn btn-primary submit-btn"
                        >
                          Confirm and Pay
                        </button>
                      </div>
                      {/* <!-- /Submit Section --> */}
                    </form>
                  </div>
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

export default PaymentScreen;
