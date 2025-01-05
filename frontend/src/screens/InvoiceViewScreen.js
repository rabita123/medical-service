// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import { render } from "react-dom";
// import { renderToString } from "react-dom/server";
// import jsPDF from "jspdf";

// import { getOrderDetails } from "../actions/orderActions";

// const InvoiceViewScreen = ({ match }) => {
//   const dispatch = useDispatch();

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   useEffect(() => {
//     dispatch(getOrderDetails(match.params.id));
//   }, [dispatch]);

//   const orderDetails = useSelector((state) => state.orderDetails);
//   const { order, loading, error } = orderDetails;

//   console.log(order);

//   const Prints = () => (
//     <div>
//       {/* <!-- Breadcrumb --> */}
//       <div class="breadcrumb-bar">
//         <div class="container-fluid">
//           <div class="row align-items-center">
//             <div class="col-md-12 col-12">
//               <nav aria-label="breadcrumb" class="page-breadcrumb">
//                 <ol class="breadcrumb">
//                   <li class="breadcrumb-item">
//                     <a href="index.html">Home</a>
//                   </li>
//                   <li class="breadcrumb-item active" aria-current="page">
//                     Doctor Profile
//                   </li>
//                 </ol>
//               </nav>
//               <h2 class="breadcrumb-title">Doctor Profile</h2>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div class="content">
//         <div class="container-fluid">
//           <div class="row">
//             <div class="col-lg-8 offset-lg-2">
//               <div class="invoice-content">
//                 <div class="invoice-item">
//                   <div class="row">
//                     <div class="col-md-6"></div>
//                     <div class="col-md-6">
//                       <p class="invoice-details">
//                         <strong>Order:</strong>
//                         <strong>Order:</strong> #00124 <br />
//                         <strong>Issued:</strong> 20/07/2019
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div class="invoice-item">
//                   <div class="row">
//                     <div class="col-md-6">
//                       <div class="invoice-info">
//                         <strong class="customer-text">Invoice From</strong>
//                         <p class="invoice-details invoice-details-two">
//                           Xpert Sample <br /> 68/2 Hazi Mohsin Road, (Infront of
//                           Khulna Pangu Hospital) Khulna. <br />
//                           ph:01917-118877,01725-998992
//                         </p>
//                       </div>
//                     </div>
//                     <div class="col-md-6">
//                       <div class="invoice-info invoice-info2">
//                         <strong class="customer-text">Invoice To</strong>
//                         <p class="invoice-details">
//                           <b>Name :</b> {order.shippingAddress.name} <br />
//                           <b>Address:</b> {order.shippingAddress.address},{" "}
//                           <br />
//                           <b>Phone:</b> {order.shippingAddress.phone} <br />
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div class="invoice-item">
//                   <div class="row">
//                     <div class="col-md-12">
//                       <div class="invoice-info">
//                         <strong class="customer-text">Payment Method</strong>
//                         <p class="invoice-details invoice-details-two">
//                           Cash On Delivery
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div class="invoice-item invoice-table-wrap">
//                   <div class="row">
//                     <div class="col-md-12">
//                       <div class="table-responsive">
//                         <table class="invoice-table table table-bordered">
//                           <thead>
//                             <tr>
//                               <th>Sl.No.</th>
//                               <th>Description</th>
//                               <th class="text-center">Quantity</th>
//                               <th class="text-center">Price</th>
//                               <th class="text-right">Total</th>
//                             </tr>
//                           </thead>
//                           <tbody></tbody>
//                         </table>
//                       </div>
//                     </div>

//                     <div class="col-md-6 col-xl-4 ml-auto">
//                       <div class="table-responsive">
//                         <table class="invoice-table-two table">
//                           <tbody>
//                             {order.orderItems.map((item, index) => (
//                               <tr>
//                                 <td>{index + 1}</td>
//                                 <td>{item.name}</td>
//                                 <td class="text-center">{item.qty}</td>
//                                 <td class="text-center">{item.price}</td>
//                                 <td class="text-right">
//                                   {" "}
//                                   {item.qty} x ${item.price} = $
//                                   {item.qty * item.price}
//                                 </td>
//                               </tr>
//                             ))}
//                             <tr>
//                               <th>Subtotal:</th>
//                               <td>
//                                 <span>$350</span>
//                               </td>
//                             </tr>
//                             <tr>
//                               <th>Discount:</th>
//                               <td>
//                                 <span>-10%</span>
//                               </td>
//                             </tr>
//                             <tr>
//                               <th>Total Amount:</th>
//                               <td>
//                                 <span>$315</span>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const string = renderToString(<Prints />);

//   const pdf = new jsPDF("p", "mm", "a4");
//   const columns = [
//     "SOW Creation Date",
//     "SOW Start Date",
//     "Project",
//     "Last Updated",
//     "SOW End Date",
//   ];
//   var rows = [
//     [
//       "Dec 13, 2017",
//       "Jan 1, 2018",
//       "ABC Connect - ABCXYZ",
//       "Dec 13, 2017",
//       "Dec 31, 2018",
//     ],
//   ];
//   pdf.addHTML(string);

//   pdf.save("pdf");

//   return (
//     <div>
//       <Header />

//       {/* <!-- Breadcrumb --> */}
//       <div class="breadcrumb-bar">
//         <div class="container-fluid">
//           <div class="row align-items-center">
//             <div class="col-md-12 col-12">
//               <nav aria-label="breadcrumb" class="page-breadcrumb">
//                 <ol class="breadcrumb">
//                   <li class="breadcrumb-item">
//                     <a href="index.html">Home</a>
//                   </li>
//                   <li class="breadcrumb-item active" aria-current="page">
//                     Doctor Profile
//                   </li>
//                 </ol>
//               </nav>
//               <h2 class="breadcrumb-title">Doctor Profile</h2>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* <!-- /Breadcrumb --> */}
//       {/*
//         <!-- Page Content --> */}
//       <div class="content">
//         <div class="container-fluid">
//           <div class="row">
//             <div class="col-lg-8 offset-lg-2">
//               <div class="invoice-content">
//                 <div class="invoice-item">
//                   <div class="row">
//                     <div class="col-md-6">
//                       <div class="invoice-logo">
//                         <img src="assets/img/logo.png" alt="logo" />
//                       </div>
//                     </div>
//                     <div class="col-md-6">
//                       <p class="invoice-details">
//                         <strong>Order:</strong> #00124 <br />
//                         <strong>Issued:</strong> 20/07/2019
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div class="invoice-item">
//                   <div class="row">
//                     <div class="col-md-6">
//                       <div class="invoice-info">
//                         <strong class="customer-text">Invoice From</strong>
//                         <p class="invoice-details invoice-details-two">
//                           Xpert Sample <br /> 68/2 Hazi Mohsin Road, (Infront of
//                           Khulna Pangu Hospital) Khulna. <br />
//                           ph:01917-118877,01725-998992
//                         </p>
//                       </div>
//                     </div>
//                     <div class="col-md-6">
//                       <div class="invoice-info invoice-info2">
//                         <strong class="customer-text">Invoice To</strong>
//                         <p class="invoice-details">
//                           <b>Name :</b> {order.shippingAddress.name} <br />
//                           <b>Address:</b> {order.shippingAddress.address},{" "}
//                           <br />
//                           <b>Phone:</b> {order.shippingAddress.phone} <br />
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 {/* <!-- /Invoice Item -->

// 								<!-- Invoice Item --> */}
//                 <div class="invoice-item">
//                   <div class="row">
//                     <div class="col-md-12">
//                       <div class="invoice-info">
//                         <strong class="customer-text">Payment Method</strong>
//                         <p class="invoice-details invoice-details-two">
//                           {/* Debit Card <br>
// 													XXXXXXXXXXXX-2541 <br>
// 													HDFC Bank<br> */}
//                           Cash On Delivery
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 {/* <!-- /Invoice Item --> */}

//                 {/* <!-- Invoice Item --> */}
//                 <div class="invoice-item invoice-table-wrap">
//                   <div class="row">
//                     <div class="col-md-12">
//                       <div class="table-responsive">
//                         <table class="invoice-table table table-bordered">
//                           <thead>
//                             <tr>
//                               <th>Sl.No.</th>
//                               <th>Description</th>
//                               <th class="text-center">Quantity</th>
//                               <th class="text-center">Price</th>
//                               <th class="text-right">Total</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {order.orderItems.map((item, index) => (
//                               <tr>
//                                 <td>{index + 1}</td>
//                                 <td>{item.name}</td>
//                                 <td class="text-center">{item.qty}</td>
//                                 <td class="text-center">{item.price}</td>
//                                 <td class="text-right">
//                                   {" "}
//                                   {item.qty} x ${item.price} = $
//                                   {item.qty * item.price}
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>

//                     <div class="col-md-6 col-xl-4 ml-auto">
//                       <div class="table-responsive">
//                         <table class="invoice-table-two table">
//                           <tbody>
//                             <tr>
//                               <th>Subtotal:</th>
//                               <td>
//                                 <span>$350</span>
//                               </td>
//                             </tr>
//                             <tr>
//                               <th>Discount:</th>
//                               <td>
//                                 <span>-10%</span>
//                               </td>
//                             </tr>
//                             <tr>
//                               <th>Total Amount:</th>
//                               <td>
//                                 <span>$315</span>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 {/* <!-- /Invoice Item --> */}

//                 {/* <!-- Invoice Information --> */}
//                 <div class="other-info">
//                   <h4>A SPECIALIZED DIAGNOSTIC CENTRE</h4>
//                   {/* <p class="text-muted mb-0">
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                     Vivamus sed dictum ligula, cursus blandit risus. Maecenas
//                     eget metus non tellus dignissim aliquam ut a ex. Maecenas
//                     sed vehicula dui, ac suscipit lacus. Sed finibus leo vitae
//                     lorem interdum, eu scelerisque tellus fermentum. Curabitur
//                     sit amet lacinia lorem. Nullam finibus pellentesque libero.
//                   </p> */}
//                 </div>
//                 {/* <!-- /Invoice Information --> */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* <!-- /Page Content --> */}

//       <Footer />
//     </div>
//   );
// };

// export default InvoiceViewScreen;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactToPdf from "react-to-pdf";
import { Link } from "react-router-dom";
import { getOrderDetails } from "../actions/orderActions";

const ref = React.createRef();
const options = {
  orientation: "landscape",
  unit: "in",
  format: [15, 15],
};
const InvoiceViewScreen = ({ match }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(getOrderDetails(match.params.id));
  }, [dispatch]);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderId = order._id;

  console.log(order);
  //jhjhjhj

  return (
    <div>
      <div class="row">
        <div class="col-md-2">
          <ReactToPdf
            targetRef={ref}
            filename={"#" + orderId + ".pdf"}
            options={options}
          >
            {({ toPdf }) => (
              <button class="btn btn-primary" onClick={toPdf}>
                Generate pdf
              </button>
            )}
          </ReactToPdf>
        </div>
        <div class="col-md-2">
          <Link class="btn btn-info " to="/user-profile">
            Back to Page
          </Link>
        </div>
      </div>
      <div ref={ref}>
        {/* <Header /> */}

        <div class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-8 offset-lg-2">
                <div class="invoice-content">
                  <div class="invoice-item">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="invoice-logo">
                          <img src="/assets/img/logo.jpg" alt="logo" />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <p class="invoice-details">
                          <strong>Order:</strong> #{order._id} <br />
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
                            Xpert Sample <br /> 68/2 Hazi Mohsin Road, (Infront
                            of Khulna Pangu Hospital) Khulna. <br />
                            ph:01917-118877,01725-998992
                          </p>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="invoice-info invoice-info2">
                          <strong class="customer-text">Invoice To</strong>
                          <p class="invoice-details">
                            <b>Name :</b> {order.user.name} <br />
                            <b>Address:</b> {order.shippingAddress.address},{" "}
                            <br />
                            <b>Phone:</b> {order.user.phone} <br />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- /Invoice Item -->
          
          <!-- Invoice Item --> */}
                  <div class="invoice-item">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="invoice-info">
                          <strong class="customer-text">Payment Method</strong>
                          <p class="invoice-details invoice-details-two">
                            {/* Debit Card <br>
                    XXXXXXXXXXXX-2541 <br>
                    HDFC Bank<br> */}
                            Cash On Delivery
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- /Invoice Item --> */}

                  {/* <!-- Invoice Item --> */}
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
                                <th class="text-center">Discount</th>
                                <th class="text-right">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.orderItems.map((item, index) => (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>{item.name}</td>
                                  <td class="text-center">{item.qty}</td>
                                  <td class="text-center">{item.price}</td>
                                  <td class="text-center">{item.discount}%</td>
                                  <td class="text-right">
                                    {" "}
                                    {item.qty} x {item.price} =
                                    {item.qty * item.price -
                                      (!item.discount
                                        ? 0
                                        : (item.discount / 100) *
                                          item.qty *
                                          item.price)}{" "}
                                    BDT
                                  </td>
                                </tr>
                              ))}
                            </tbody>
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
                                  <span>{order.totalPrice} BDT</span>
                                </td>
                              </tr>
                              {/* <tr>
                                <th>Discount:</th>
                                <td>
                                  <span>-10%</span>
                                </td>
                              </tr> */}
                              <tr>
                                <th>Total Amount:</th>
                                <td>
                                  <span>{order.totalPrice} BDT</span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- /Invoice Item --> */}

                  {/* <!-- Invoice Information --> */}
                  <div class="other-info">
                    <h4>A SPECIALIZED DIAGNOSTIC CENTRE</h4>
                  </div>
                  {/* <!-- /Invoice Information --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /Page Content --> */}
        {/* 
        <Footer /> */}
      </div>
    </div>
  );
};

export default InvoiceViewScreen;
