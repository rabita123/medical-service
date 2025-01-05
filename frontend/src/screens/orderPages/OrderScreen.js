import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, ListGroup, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Header from "../../components/Header";
import Breadcrumb from "../../components/Breadcrumb";
import { PayPalButton } from "react-paypal-button-v2";
import Loader from "../../components/Loader";
import Footer from "../../components/Footer";
import { CommonLoading } from "react-loadingg";

import { getOrderDetails, payOrder } from "../../actions/orderActions";

import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../../constants/orderConstants";

const OrderScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const [today, setDate] = React.useState(new Date());
  const orderId = match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  console.log(order);

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  // const orderDeliver = useSelector((state) => state.orderDeliver);
  // const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //   Calculate prices

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    if (!order || successPay || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
    }
  }, [dispatch, orderId, successPay, order]);

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  return loading ? (
    <CommonLoading />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div class="main-wrapper">
      <Header />
      <Breadcrumb />

      <div class="content">
        <div class="container">
          <div class="row">
            <div class="col-md-7 col-lg-8">
              <div class="card">
                <div class="card-body">
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h3>Order: #{order._id} </h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h2>Collection Information</h2>
                      <p>
                        <strong>Name: </strong>
                        {userInfo.name},{" "}
                      </p>

                      <p>
                        <strong>Phone: </strong>
                        {userInfo.phone},{" "}
                      </p>

                      <p>
                        <strong>Address: </strong>
                        {order.shippingAddress.address},{" "}
                      </p>

                      {order.isDelivered ? (
                        <Message variant="success">
                          Delivered on {order.deliveredAt}
                        </Message>
                      ) : (
                        <Message variant="danger">Not Delivered</Message>
                      )}
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <h2>Payment Method</h2>
                      <strong>Method: </strong>
                      {order.paymentMethod}
                      {order.isPaid ? (
                        <Message variant="success">
                          Paid on {order.paidAt}
                        </Message>
                      ) : (
                        <Message variant="danger">Not Paid</Message>
                      )}
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <h2>Order Items</h2>
                      {order.orderItems.length === 0 ? (
                        <Message>Your cart is empty</Message>
                      ) : (
                        <ListGroup variant="flush">
                          {order.orderItems.map((item, index) => (
                            <ListGroup.Item key={index}>
                              <Row>
                                <Col>
                                  <Link to={`/product/${item.test}`}>
                                    {item.name}
                                  </Link>
                                </Col>
                                <Col md={4}>
                                  {item.qty} x {item.price} BDT =
                                  {item.qty * item.price} BDT
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </div>
            </div>

            <div class="col-md-5 col-lg-4 theiaStickySidebar">
              {/* <!-- Booking Summary --> */}
              <div class="card booking-card">
                <div class="card-header">
                  <h4 class="card-title">Order Summary</h4>
                </div>
                <div class="card-body">
                  {/* <!-- Booking Doctor Info --> */}
                  <div class="booking-doc-info">
                    <div class="booking-info">
                      <h4>
                        <a href="doctor-profile.html">{userInfo.name}</a>
                      </h4>

                      <div class="clinic-details">
                        <p class="doc-location">
                          <i class="fas fa-map-marker-alt"></i>{" "}
                          {order.shippingAddress.address}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Booking Doctor Info --> */}

                  <div class="booking-summary">
                    <div class="booking-item-wrap">
                      <ul class="booking-date">
                        <li>
                          Date{" "}
                          <span>
                            {today.getDate() +
                              "/" +
                              (today.getMonth() + 1) +
                              "/" +
                              today.getFullYear()}
                          </span>
                        </li>
                      </ul>
                      <ul class="booking-fee">
                        <li>
                          Price <span>{order.itemsPrice} BDT</span>
                        </li>

                        <li>
                          Discount
                          {order.orderItems.map((item, index) => (
                            <span>{item.discount ? item.discount : ""}%</span>
                          ))}
                        </li>
                      </ul>
                      <div class="booking-total">
                        <ul class="booking-total-list">
                          <li>
                            <span>Total</span>
                            <span class="total-cost">
                              {order.totalPrice} BDT
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div class="booking-total">
                        <ul class="booking-total-list">
                          <li>
                            <Link
                              to={"/user-profile"}
                              class="btn btn-rounded btn-info"
                            >
                              Back
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* <div class="booking-total">
                        <ul class="booking-total-list">
                          <li>
                            <button
                              type="button"
                              class="btn btn-rounded btn-info"
                              onClick={placeOrderHandler}
                            >
                              Place Order
                            </button>
                          </li>
                        </ul>
                      </div> */}
                    </div>
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

export default OrderScreen;
