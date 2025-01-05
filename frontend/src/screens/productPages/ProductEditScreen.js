import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";

import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Form } from "react-bootstrap";
import HeaderAdmin from "../../components/HeaderAdmin";
import Loader from "../../components/Loader";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import makeToast from "../../components/Toaster";

import {
  listProducts,
  deleteProduct,
  createProduct,
  getProductDetails,
  updateProduct,
} from "../../actions/productActions";
import { listTestCategories } from "../../actions/testCategoriesActions";

import { PRODUCT_UPDATE_RESET } from "../../constants/productConstants";

const ProductEditScreen = ({ history, match }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [commercialName, setCommercialName] = useState("");
  const [productType, setProductType] = useState("");
  const [workHour, setWorkHour] = useState("");
  const [nursingPackageType, setNursingPackageType] = useState("");
  const [discount, setDiscount] = useState(0);
  // const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showResults, setShowResults] = React.useState(false);
  const [testCategory, setTestCategories] = React.useState(false);
  const [medicines, setMedicines] = React.useState(false);
  const [healthTestCategories, setHealthTestCategories] = React.useState("");

  const dispatch = useDispatch();
  // const commercialName = React.createRef();
  const testCategories = useSelector((state) => state.testCategories);
  const { loading, error, testcategories } = testCategories;

  const productDetails = useSelector((state) => state.productDetails);
  const { productdetails } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { success: successUpdate } = productUpdate;

  // const discounts = useRef(0);
  //const descriptions = useRef(null);
  // const commercialNames = useRef(0);
  // const images = useRef(null);
  const productId = match.params.id;

  useEffect(() => {
    dispatch(listTestCategories());
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });

      makeToast("success", "Successfully Updated");

      history.push("/admin-health-productlist");
    } else {
      if (!productdetails.name || productdetails._id !== productId) {
        dispatch(getProductDetails(productId));
      } else {
        setName(productdetails.name);
        setCommercialName(productdetails.commercialName);
        setPrice(productdetails.price);
        setDiscount(productdetails.discount);
        setDescription(productdetails.description);
        setImage(productdetails.image);
        setHealthTestCategories(productdetails.healthTestCategories);
      }
    }
  }, [dispatch, history, productId, productdetails, successUpdate]);

  const prices = useRef(0);
  const TestCategory = () => {
    return (
      <Form.Group controlId="category">
        {loading && <Loader />}
        <Form.Label>Type</Form.Label>

        <Form.Control
          as="select"
          custom
          value={healthTestCategories}
          onChange={(e) => setHealthTestCategories(e.target.value)}
        >
          <option value="">Select</option>
          {testcategories.map((testcategory) =>
            productdetails.healthTestCategories === testcategory._id ? (
              <option value={testcategory._id} selected>
                {" "}
                {testcategory.category_name}
              </option>
            ) : (
              <option value={testcategory._id}>
                {testcategory.category_name}
              </option>
            )
          )}
        </Form.Control>
      </Form.Group>
    );
  };
  const onClick = (value) => {
    if (value === "nursing-package") {
      // setShowResults(true);
      setTestCategories(false);
    } else if (value === "health-test") {
      setTestCategories(true);
      setShowResults(false);
    } else if (value === "medicine") {
      setMedicines(true);
      setShowResults(false);
    } else {
      setShowResults(false);
      setTestCategories(false);
    }
  };

  // const MedicineResults = () => {
  //   return (
  //     <Form.Group>
  //       <Form.Label>Name</Form.Label>
  //       <Form.Control
  //         type="text"
  //         placeholder="Enter Commercial  Name"
  //         value={commercialName}
  //         ref={commercialNames}
  //         onChange={(e) => setCommercialName(e.target.value)}
  //       ></Form.Control>
  //     </Form.Group>
  //   );
  // };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: match.params.id,
        name,
        commercialName,
        image,
        productType,
        description,
        nursingPackageType,
        workHour,
        healthTestCategories,
        price,
        discount,
      })
    );
    makeToast("success", "Successfully Updated");
    // window.location.reload(true);
    history.push("/admin-health-productlist");
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);

      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
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
                  <h3 class="page-title">Update Product</h3>
                  <ul class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="index.html">Dashboard</a>
                    </li>
                    <li class="breadcrumb-item active">Prodcuts</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-xl-6 d-flex">
                <div class="card flex-fill">
                  <div class="card-header">
                    <h4 class="card-title">Update Product </h4>
                  </div>
                  <div class="card-body">
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="category">
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                          as="select"
                          custom
                          onChange={(e) => setProductType(e.target.value)}
                          onClick={(e) => onClick(e.target.value)}
                        >
                          <option value="">Select</option>
                          {productdetails.productType === "medicine" ? (
                            <option value="medicine" selected>
                              Medicine
                            </option>
                          ) : (
                            <option value="medicine">Medicine</option>
                          )}
                          <option value="">Select</option>
                          {productdetails.productType === "health-package" ? (
                            <option value="health-package" selected>
                              Health Package
                            </option>
                          ) : (
                            <option value="health-package">
                              Health Package
                            </option>
                          )}
                          <option value="">Select</option>
                          {productdetails.productType === "health-test" ? (
                            <option value="health-test" selected>
                              Health Test
                            </option>
                          ) : (
                            <option value="health-test">Health Test</option>
                          )}
                          <option value="">Select</option>
                          {productdetails.productType === "nursing-package" ? (
                            <option value="nursing-package">
                              Nursing Package
                            </option>
                          ) : (
                            <option value="nursing-package">
                              Nursing Package
                            </option>
                          )}
                        </Form.Control>
                      </Form.Group>
                      {/* {showResults && <Results />} */}
                      {productdetails.productType == "health-test" ? (
                        <TestCategory />
                      ) : (
                        ""
                      )}
                      <Form.Group controlId="image">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      {/* {medicines && <MedicineResults />} */}
                      {productdetails.productType == "medicine" ? (
                        <Form.Group>
                          <Form.Label>Commercial Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Commercial  Name"
                            value={commercialName}
                            //ref={commercialNames}
                            onChange={(e) => setCommercialName(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      ) : (
                        ""
                      )}
                      <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter price"
                          // ref={prices}
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId="discount">
                        <Form.Label>Discount</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Discount"
                          // ref={discounts}
                          // value={productdetails.discount}
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId="image">
                        <Form.Label>Image</Form.Label>
                        <div class="col-lg-9">
                          <Form.Control
                            type="text"
                            placeholder="Enter image url"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                          ></Form.Control>
                          <Form.File
                            id="image-file"
                            label="Choose File"
                            custom
                            onChange={uploadFileHandler}
                          ></Form.File>
                          {uploading && <Loader />}
                        </div>
                      </Form.Group>
                      <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <div class="row">
                        <div class="col-lg-3 text-left">
                          <button
                            type="submit"
                            class="btn btn-block btn-outline-dark active"
                          >
                            <i className="fas fa-plus"></i> Update
                          </button>
                        </div>
                        <div class="col-lg-3 text-left">
                          <Link
                            to={"/admin-health-productlist"}
                            type="submit"
                            class="btn btn-block btn-outline-dark active"
                          >
                            <i class="fas fa-arrow-left"></i> Back
                          </Link>
                        </div>
                      </div>
                    </Form>
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

export default ProductEditScreen;
