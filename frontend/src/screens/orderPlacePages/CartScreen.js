import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import Header from "../../components/Header";

import Message from "../../components/Message";
import { addToCart, removeFromCart } from "../../actions/cartActions";

const CartScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const testId = match.params.id;
  // const [qty, setQty] = useState(1);
  const value = 1;
  const qty = Number(value);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems.length);

  // useEffect(() => {
  //   if (testId) {
  //     dispatch(addToCart(testId, qty));
  //   }
  // }, [dispatch, testId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=address");
  };

  // const countHandler = (id) => {
  //   if (id) {
  //     setQty(qty + 1);
  //   }
  // };

  return (
    <>
      <div class="main-wrapper">
        <Header />
        {/* <!-- Breadcrumb --> */}
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
                      Cart
                    </li>
                  </ol>
                </nav>
                <h2 class="breadcrumb-title">Cart</h2>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /Breadcrumb --> */}

        {/* <!-- Page Content --> */}
        <div class="content">
          <div class="container">
            {/* <div class="card card-table"> */}

            <div class="row">
              {cartItems.length === 0 ? (
                <Message>
                  Your cart is empty <Link to="/">Go Back</Link>
                </Message>
              ) : (
                <div class="col-md-6 col-lg-7">
                  <div class="card flex-fill">
                    <div class="table-responsive">
                      <table class="table table-hover table-center mb-0">
                        <thead>
                          <tr>
                            <th>Test Name</th>

                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Discount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((item) => (
                            <tr>
                              <td>
                                <a href="product-description.html">
                                  {item.name}
                                </a>
                              </td>

                              <td>{item.price}</td>

                              <td class="text-center">
                                <div class="custom-increment cart">
                                  <div class="input-group1">
                                    <span class="input-group-btn">
                                      <button
                                        type="button"
                                        class="quantity-left-minus btn btn-danger btn-number"
                                        data-type="minus"
                                        data-field=""
                                      >
                                        <span>
                                          <i class="fas fa-minus"></i>
                                        </span>
                                      </button>
                                    </span>
                                    {/* <input
                                      type="text"
                                      id={item.test}
                                      name="quantity5"
                                      class=" input-number"
                                      value={qty}
                                      onChange={(e) => setQty(e.target.value)}
                                    />
                                    <span class="input-group-btn">
                                      <button
                                        type="button"
                                        class="quantity-right-plus btn btn-success btn-number"
                                        data-type="plus"
                                        data-field=""
                                        id={`test${item.test}`}
                                        // onClick={() => setQty(qty + 1)}
                                        onClick={() => countHandler(item.test)}
                                      >
                                        <span>
                                          <i class="fas fa-plus"></i>
                                        </span>
                                      </button>
                                    </span> */}

                                    <Form.Control
                                      as="select"
                                      value={item.qty}
                                      onChange={(e) =>
                                        dispatch(
                                          addToCart(
                                            item.product,
                                            Number(e.target.value)
                                          )
                                        )
                                      }
                                    >
                                      {[...Array(10).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                          {x + 1}
                                        </option>
                                      ))}
                                    </Form.Control>
                                  </div>
                                </div>
                              </td>
                              <td>{!item.discount ? 0 : item.discount}%</td>
                              <td class="text-right">
                                <div class="table-action">
                                  <a
                                    onClick={() =>
                                      removeFromCartHandler(item.product)
                                    }
                                    class="btn btn-sm bg-danger-light"
                                  >
                                    <i class="fas fa-times"></i>
                                  </a>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
              <div class="col-md-5 col-lg-4">
                {/* <!-- Booking Summary --> */}
                <div class="card booking-card">
                  <div class="card-header">
                    <h4 class="card-title">
                      Cart ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                      )Totals
                    </h4>
                  </div>
                  <div class="card-body">
                    <div class="booking-summary">
                      <div class="booking-item-wrap">
                        <ul class="booking-date">
                          <li>
                            Subtotal{" "}
                            <span>
                              {" "}
                              {/* {cartItems
                                .reduce(
                                  (acc, item) => acc + item.qty * item.price,
                                  0
                                )
                                .toFixed(2)} */}
                              {cartItems
                                .reduce(
                                  (acc, item) =>
                                    acc +
                                    item.qty * item.price -
                                    (!item.discount ? 0 : item.discount / 100) *
                                      item.qty *
                                      item.price,
                                  0
                                )
                                .toFixed(2)}
                            </span>
                          </li>

                          <li>
                            {/* {" "}
                            (
                            {cartItems
                              .reduce(
                                (acc, item) =>
                                  acc +
                                  item.qty * item.price -
                                  (item.discount == "null"
                                    ? 0
                                    : item.discount / 100) *
                                    item.price,
                                0
                              )
                              .toFixed(2)} */}
                          </li>
                          {/* <li>
                            Shipping{" "}
                            <span>
                              $25.00<a href="#">Calculate shipping</a>
                            </span>
                          </li> */}
                        </ul>
                        {/* <ul class="booking-fee pt-4">
                          <li>
                            Tax <span>$0.00</span>
                          </li>
                        </ul> */}
                        <div class="booking-total">
                          <ul class="booking-total-list">
                            <li>
                              <span>Total</span>
                              <span class="total-cost">
                                {" "}
                                <span>
                                  {" "}
                                  {cartItems
                                    .reduce(
                                      (acc, item) =>
                                        acc +
                                        item.qty * item.price -
                                        (!item.discount
                                          ? 0
                                          : item.discount / 100) *
                                          item.qty *
                                          item.price,
                                      0
                                    )
                                    .toFixed(2)}
                                </span>
                              </span>
                            </li>
                            <li>
                              <div class="clinic-booking pt-4">
                                <button
                                  type="button"
                                  class="btn btn-dark"
                                  onClick={checkoutHandler}
                                >
                                  Proceed to checkout
                                </button>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- /Booking Summary --> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /Page Content --> */}
      </div>
    </>
  );
};

export default CartScreen;
