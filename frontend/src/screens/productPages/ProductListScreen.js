import React, { useState, useEffect, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../../actions/productActions";
import { CommonLoading } from "react-loadingg";
import { Link } from "react-router-dom";

const Sidebar = lazy(() => import("../../components/Sidebar"));
const Footer = lazy(() => import("../../components/Footer"));
const HeaderAdmin = lazy(() => import("../../components/HeaderAdmin"));
const Pagination = lazy(() => import("../../components/Pagination"));
const Loader = lazy(() => import("../../components/Loader"));

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDetails = useSelector((state) => state.productDetails);
  const { productdetails } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  //pagination

  const [posts, setPosts] = useState([]);
  const [locading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const [search, setSearch] = useState("");
  // const [filteredCountries, setFilteredCountries] = useState("");

  // get current page post

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  const filteredCountries = currentPosts.filter((country) => {
    return country.productType.toLowerCase().includes(search.toLowerCase());
  });

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
                  <h3 class="page-title">Products</h3>
                  <ul class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="index.html">Dashboard</a>
                    </li>
                    <li class="breadcrumb-item active">Products</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-3 col-sm-4 col-md-2 col-xl mb-3 mb-xl-0 text-right">
              <Row className="align-items-center">
                <Col>
                  <Link
                    class="col-lg-2 btn btn-block btn-outline-dark active"
                    to={"/admin-health-packagecreate"}
                  >
                    <i className="fas fa-plus"></i> Create Product{" "}
                  </Link>
                </Col>
              </Row>
            </div>
            <div class="col-3 col-sm-4 col-md-2 col-xl mb-3 mb-xl-0 text-right">
              <Row className="align-items-center">
                <Col className="text-right">
                  <input
                    type="text"
                    placeholder="search"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Col>
              </Row>
            </div>
            <br />

            {/* <SearchField placeholder="Search item" onChange={onChange} /> */}

            {loadingDelete && <Loader />}
            <div class="row">
              <div class="col-sm-12">
                <div class="card">
                  <div class="card-header">
                    <h4 class="card-title">Product Lists</h4>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-hover mb-0">
                        <thead>
                          <tr>
                            <th>SN</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Image</th>

                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading && <CommonLoading />}
                          {filteredCountries.map((product, i) => (
                            <tr key={product._id}>
                              <td>{i + 1}</td>

                              <td>{product.name}</td>
                              <td>{product.productType}</td>

                              <td>
                                {!product.image ? (
                                  <img
                                    width="70px"
                                    height="50px"
                                    src="/uploads/no-image1.png"
                                    alt={product.name}
                                    fluid
                                  />
                                ) : (
                                  <img
                                    width="70px"
                                    height="50px"
                                    src={product.image}
                                    alt={product.name}
                                    fluid
                                  />
                                )}
                              </td>
                              <td>
                                <LinkContainer
                                  to={`/admin/product/${product._id}/edit/`}
                                >
                                  <Button variant="light" className="btn-sm">
                                    <i className="fas fa-edit"></i>
                                  </Button>
                                </LinkContainer>
                                <Button
                                  variant="danger"
                                  className="btn-sm"
                                  onClick={() => deleteHandler(product._id)}
                                >
                                  <i className="fas fa-trash"></i>
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <div>
                          <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={products.length}
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

export default ProductListScreen;
