import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Resizer from "react-image-file-resizer";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import HeaderAdmin from "../../components/HeaderAdmin";
import Loader from "../../components/Loader";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../../actions/productActions";
import { listTestCategories } from "../../actions/testCategoriesActions";

const ProductCreateScreen = ({ history }) => {
  const [name, setName] = useState("");
  // const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  // const [commercialName, setCommercialName] = useState("");
  const [productType, setProductType] = useState("");
  const [workHour, setWorkHour] = useState("");
  const [nursingPackageType, setNursingPackageType] = useState("");
  // const [discount, setDiscount] = useState(0);
  // const [countInStock, setCountInStock] = useState(0);
  // const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showResults, setShowResults] = React.useState(false);
  const [testCategory, setTestCategories] = React.useState(false);
  const [medicines, setMedicines] = React.useState(false);
  const [healthTestCategories, setHealthTestCategories] = React.useState(false);

  const dispatch = useDispatch();
  // const commercialName = React.createRef();
  const testCategories = useSelector((state) => state.testCategories);
  const { loading, error, testcategories } = testCategories;

  const prices = useRef(0);

  const discounts = useRef(0);
  const descriptions = useRef(null);
  const commercialNames = useRef(0);
  const images = useRef(null);

  useEffect(() => {
    dispatch(listTestCategories());
  }, [dispatch]);

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
          {testcategories.map((testcategory) => (
            <option value={testcategory._id}>
              {testcategory.category_name}
            </option>
          ))}
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

  // const Results = () => {
  //   return (
  //     <Form.Group controlId="nursingPackageType">
  //       {/* <Form.Label>Package Type</Form.Label>
  //       <Form.Control
  //         as="select"
  //         custom
  //         onChange={(e) => setNursingPackageType(e.target.value)}
  //       >
  //         <option value="">Select</option>
  //         <option value="Hourly">Hourly</option>
  //         <option value="Weekly">Weekly</option>
  //         <option value="Monthly">Monthly</option>
  //         <option value="Quarterly">Quarterly</option>
  //       </Form.Control> */}

  //       <Form.Group controlId="workHour">
  //         <Form.Label>Working Hour</Form.Label>

  //         <Form.Control
  //           type="text"
  //           placeholder="Enter Working Hour"
  //           value={workHour}
  //           onChange={(e) => setWorkHour(e.target.value)}
  //         ></Form.Control>
  //       </Form.Group>
  //     </Form.Group>
  //   );
  // };

  const MedicineResults = () => {
    return (
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Commercial  Name"
          // value={commercialName}
          ref={commercialNames}
          // onChange={(e) => setCommercialName(e.target.value)}
        ></Form.Control>
      </Form.Group>
    );
  };

  const createPackageHandler = (e) => {
    e.preventDefault();
    const commercialName = commercialNames.current.value;
    const price = prices.current.value;

    const description = descriptions.current.value;
    const discount = discounts.current.value;
    // const image = images.current.value;
    dispatch(
      createProduct(
        name,
        commercialName,
        image,
        productType,
        description,
        nursingPackageType,
        workHour,
        healthTestCategories,
        price,
        discount
      )
    );

    dispatch(listProducts());
    history.push("/admin-health-productlist");

    // makeToast("success", "Successfully Marked as Paid");
    dispatch(listProducts());

    //Dispatch Register
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        400,
        "JPEG",
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const dataURIToBlob = (dataURI) => {
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);
    return new Blob([ia], { type: mimeString });
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const image = await resizeFile(file);
    const newFile = dataURIToBlob(image);
    console.log(newFile);
    const formData = new FormData();
    formData.append("image", newFile, "image.JPEG");
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
                  <h3 class="page-title">Create Product</h3>
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
                    <h4 class="card-title">Create Product </h4>
                  </div>
                  <div class="card-body">
                    <Form onSubmit={createPackageHandler}>
                      <Form.Group controlId="category">
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                          as="select"
                          custom
                          value={productType}
                          onChange={(e) => setProductType(e.target.value)}
                          onClick={(e) => onClick(e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="medicine">Medicine</option>
                          <option value="physiotherapy-package">
                            physiotherapy Package
                          </option>
                          <option value="health-test">Health Test</option>

                          <option value="nursing-package">
                            Nursing Package
                          </option>
                        </Form.Control>
                      </Form.Group>

                      {/* {showResults && <Results />} */}

                      {testCategory && <TestCategory />}

                      <Form.Group controlId="image">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      {medicines && <MedicineResults />}

                      <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter price"
                          ref={prices}
                        ></Form.Control>
                      </Form.Group>

                      {/* <Form.Group controlId="countInStock">
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter countInStock"
                          ref={countInStocks}
                        ></Form.Control>
                      </Form.Group> */}

                      <Form.Group controlId="discount">
                        <Form.Label>Discount</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Discount"
                          ref={discounts}
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
                          ref={descriptions}
                        ></Form.Control>
                      </Form.Group>

                      <div class="row">
                        <div class="col-lg-3 text-left">
                          <button
                            type="submit"
                            class="btn btn-block btn-outline-dark active"
                          >
                            <i className="fas fa-plus"></i> Create
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

export default ProductCreateScreen;
