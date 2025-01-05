import React, { useState, useEffect, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { renderToString } from "react-dom/server";
import jsPDF from "jspdf";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { listOrders } from "../../actions/orderActions";
import { markPayment } from "../../actions/physiotherapyActions";
import { getOrderDetails, deleteOrder } from "../../actions/orderActions";
import { CommonLoading } from "react-loadingg";
import { ORDER_PAY_RESET } from "../../constants/orderConstants";
import makeToast from "../../components/Toaster";

const HeaderAdmin = lazy(() => import("../../components/HeaderAdmin"));
const Sidebar = lazy(() => import("../../components/Sidebar"));

const Pagination = lazy(() => import("../../components/Pagination"));
const InvoiceViewScreen = lazy(() => import("../../screens/InvoiceViewScreen"));

const OrderListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const updatePay = useSelector((state) => state.updatePay);
  const { success: successUpdatePay, loading: loadingUpdatePay } = updatePay;

  const [posts, setPosts] = useState([]);
  const [locading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);

  // get current page post

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = orders.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
      dispatch(getOrderDetails("5ff335bc782534501c53bd3d"));
    } else {
      history.push("/login");
    }
  }, [dispatch, history]);

  const markPaymentHandler = (id) => {
    dispatch(markPayment(id));
    dispatch(listOrders());
    dispatch({ type: ORDER_PAY_RESET });
    dispatch(listOrders());
    makeToast("success", "Successfully Marked as Paid");
    history.push("/admin-order-list");
  };

  const deleteOrderHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteOrder(id));
      // window.location.reload(false);
      // makeToast("success", "Successfully Deleted Order");
      // history.push("/admin-order-list");
    }
  };

  const invoiceHandler = (id) => {
    alert(id);
  };

  const styles = {
    fontFamily: "sans-serif",
    textAlign: "center",
  };
  const colstyle = {
    width: "30%",
  };
  const tableStyle = {
    width: "100%",
  };
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order } = orderDetails;
  const Prints = ({ id }) => (
    <div>
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
                    Doctor Profile
                  </li>
                </ol>
              </nav>
              <h2 class="breadcrumb-title">Doctor Profile</h2>
            </div>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-8 offset-lg-2">
              <div class="invoice-content">
                <div class="invoice-item">
                  <div class="row">
                    <div class="col-md-6"></div>
                    <div class="col-md-6">
                      <p class="invoice-details">
                        <strong>Order:</strong>
                        {order.shippingAddress.name} #00124 <br />
                        <strong>Issued:</strong> 20/07/2019
                      </p>
                    </div>
                  </div>
                </div>

                <div class="invoice-item">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="invoice-info">
                        <strong class="customer-text">Invoice From</strong>
                        <p class="invoice-details invoice-details-two">
                          Xpert Sample <br /> 68/2 Hazi Mohsin Road, (Infront of
                          Khulna Pangu Hospital) Khulna. <br />
                          ph:01917-118877,01725-998992
                        </p>
                      </div>
                    </div>
                    <div class="col-md-6"></div>
                  </div>
                </div>

                <div class="invoice-item">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="invoice-info">
                        <strong class="customer-text">Payment Method</strong>
                        <p class="invoice-details invoice-details-two">
                          Cash On Delivery
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="invoice-item invoice-table-wrap">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="table-responsive">
                        <table class="invoice-table table table-bordered">
                          <thead>
                            <tr>
                              <th>Sl.No.</th>
                              <th>Description</th>
                              <th class="text-center">Quantity</th>
                              <th class="text-center">Price</th>
                              <th class="text-right">Total</th>
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                      </div>
                    </div>

                    <div class="col-md-6 col-xl-4 ml-auto">
                      <div class="table-responsive">
                        <table class="invoice-table-two table">
                          <tbody>
                            <tr>
                              <th>Subtotal:</th>
                              <td>
                                <span>$350</span>
                              </td>
                            </tr>
                            <tr>
                              <th>Discount:</th>
                              <td>
                                <span>-10%</span>
                              </td>
                            </tr>
                            <tr>
                              <th>Total Amount:</th>
                              <td>
                                <span>$315</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const print = (id) => {
    const string = renderToString(<InvoiceViewScreen id={id} />);

    const pdf = new jsPDF("p", "mm", "a4");
    const columns = [
      "SOW Creation Date",
      "SOW Start Date",
      "Project",
      "Last Updated",
      "SOW End Date",
    ];
    var rows = [
      [
        "Dec 13, 2017",
        "Jan 1, 2018",
        "ABC Connect - ABCXYZ",
        "Dec 13, 2017",
        "Dec 31, 2018",
      ],
    ];
    pdf.fromHTML(string);
    pdf.save("pdf");
  };

  return (
    <>
      <HeaderAdmin />
      <Helmet>
        <link rel="stylesheet" href="admin/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="admin/assets/css/feathericon.min.css" />
        <link rel="stylesheet" href="admin/assets/css/font-awesome.min.css" />
        <link rel="stylesheet" href="admin/assets/css/style.css" />
      </Helmet>
      <Sidebar />
      <div class="main-wrapper">
        <div class="page-wrapper">
          <div class="content container-fluid">
            <div class="page-header">
              <div class="row">
                <div class="col-sm-12">
                  <h3 class="page-title">Orders</h3>
                  <ul class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="index.html">Dashboard</a>
                    </li>
                    <li class="breadcrumb-item active">Orders</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-12">
                <div class="card">
                  <div class="card-header">
                    <h4 class="card-title">Orders</h4>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-hover mb-0">
                        <thead>
                          <tr>
                            <th>ID</th>

                            <th>USER</th>
                            <th>PHONE</th>
                            <th>ADDRESS</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAYMENT METHOD</th>
                            <th>PAID</th>
                            {/* 
                            <th>DELIVERED</th> */}
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading && <CommonLoading />}
                          {currentPosts.map((order, i) => (
                            <tr key={order._id}>
                              <td>{i + 1}</td>
                              <td>{order.user && order.user.name}</td>
                              <td>{order.user.phone}</td>
                              <td>{order.shippingAddress.address}</td>
                              <td>{order.createdAt.substring(0, 10)}</td>
                              <td>{order.totalPrice}BDT</td>
                              <td>{order.paymentMethod}</td>
                              <td>
                                {order.isPaid ? (
                                  order.paidAt.substring(0, 10)
                                ) : (
                                  <i
                                    className="fas fa-times"
                                    style={{ color: "red" }}
                                  ></i>
                                )}
                              </td>
                              {/* <td>
                                {order.isDelivered ? (
                                  order.deliveredAt.substring(0, 10)
                                ) : (
                                  <i
                                    className="fas fa-times"
                                    style={{ color: "red" }}
                                  ></i>
                                )}
                              </td> */}

                              <td>
                                {/* {loadingUpdatePay && <Loader />} */}
                                <button
                                  type="button"
                                  className="btn btn-success"
                                  onClick={() => markPaymentHandler(order._id)}
                                >
                                  Mark as Paid{" "}
                                  <i class="fa fa-money" aria-hidden="true"></i>
                                </button>
                              </td>
                              <td>
                                {/* {loadingUpdatePay && <Loader />} */}

                                <a
                                  className="btn btn-info"
                                  href={`/invoice-view/${order._id}`}
                                >
                                  Invoice
                                </a>

                                {/* 
                                <button onClick={() => print(order._id)}>
                                  print
                                </button> */}

                                {/* <button
                                  type="button"
                                  className="btn btn-info"
                                  onClick={() => invoiceHandler(order._id)}
                                >
                                  Invoice
                                </button> */}
                              </td>

                              <td>
                                <Link
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => deleteOrderHandler(order._id)}
                                >
                                  Delete{" "}
                                  <i class="fa fa-trash" aria-hidden="true"></i>
                                </Link>
                              </td>

                              {/* {order.paymentMethod === "Cash On Delivery" ? (
                                <td>
                                  {loadingUpdatePay && <Loader />}
                                  <button
                                    type="button"
                                    className="btn btn-info"
                                    onClick={() =>
                                      markPaymentHandler(order._id)
                                    }
                                  >
                                    Mark as Paid
                                  </button>
                                </td>
                              ) : (
                                ""
                              )} */}
                            </tr>
                          ))}
                        </tbody>

                        <div>
                          <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={orders.length}
                            paginate={paginate}
                          />
                        </div>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderListScreen;
