import React, { useEffect } from "react";

import { Row, Col, ListGroup, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Header from "../../components/Header";
import Breadcrumb from "../../components/Breadcrumb";
import CheckoutSteps from "../../components/CheckoutSteps";
import { updateValue } from "../../actions/productActions";
import Footer from "../../components/Footer";
import swal from "sweetalert";

import { createOrder } from "../../actions/orderActions";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [today, setDate] = React.useState(new Date());
  const cart = useSelector((state) => state.cart);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo } = userLogin;

  useEffect(() => {
    if (success) {
      // swal("Good job!", "Order has been placed successfully", "success");

      // swal({
      //   title: "Are you sure?",
      //   text:
      //     "Once deleted, you will not be able to recover this imaginary file!",
      //   icon: "success",
      //   buttons: true,
      //   dangerMode: true,
      //   buttons: ["yes, forsure", "no, thanks"],
      // });
      swal({
        title: "Congratulations!",
        text: "Order has been placed successfully!",
        icon: "success",
      }).then(function () {
        window.location = "/";
      });

      //history.push(`/order/${order._id}`);
      //dispatch({ type: ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [history, success]);

  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce(
      (acc, item) =>
        acc +
        item.price * item.qty -
        (!item.discount ? 0 : item.discount / 100) * item.price * item.qty,
      0
    )
  );

  cart.discountPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));

  cart.totalPrice = Number(cart.itemsPrice).toFixed(2);

  const placeOrderHandler = () => {
    console.log(localStorage.getItem("id"));
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div class="main-wrapper">
      <Header />
      <Breadcrumb />

      {/* <!-- Page Content --> */}
      <div class="content">
        <div class="container">
          <div class="row">
            <div class="col-md-7 col-lg-8">
              <CheckoutSteps step1 step2 step3 step4 />
              <div class="card">
                <div class="card-body">
                  <ListGroup variant="flush">
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
                        {cart.shippingAddress.address},{" "}
                      </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <h2>Payment Method</h2>
                      <strong>Method: </strong>
                      {cart.paymentMethod}
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <h2>Order Items</h2>
                      {cart.cartItems.length === 0 ? (
                        <Message>Your cart is empty</Message>
                      ) : (
                        <ListGroup variant="flush">
                          {cart.cartItems.map((item, index) => (
                            <ListGroup.Item key={index}>
                              <Row>
                                <Col>
                                  <Link to={`/product/${item.product}`}>
                                    {item.name}
                                  </Link>
                                </Col>
                                <Col>{!item.discount ? 0 : item.discount}%</Col>
                                <Col md={4}>
                                  {item.qty} x {item.price} =
                                  {item.qty * item.price -
                                    (!item.discount ? 0 : item.discount / 100) *
                                      item.qty *
                                      item.price.toFixed(2)}{" "}
                                  BDT
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
                  <h4 class="card-title">Booking Summary</h4>
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
                          {cart.shippingAddress.address}
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
                          Price <span>{cart.itemsPrice}</span>
                        </li>
                      </ul>
                      <div class="booking-total">
                        <ul class="booking-total-list">
                          <li>
                            <span>Total</span>
                            <span class="total-cost">
                              {cart.totalPrice} BDT
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div class="booking-total">
                        <ul class="booking-total-list">
                          <li>
                            {error && (
                              <Message variant="danger">{error}</Message>
                            )}
                          </li>
                        </ul>
                      </div>

                      <div class="booking-total">
                        <ul class="booking-total-list">
                          <li>
                            <button
                              type="button"
                              className="btn  btn-info"
                              onClick={placeOrderHandler}
                            >
                              Place Order
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- /Booking Summary --> */}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Page Content --> */}

      <Footer />
    </div>
  );
};

export default PlaceOrderScreen;
