import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import HeaderAdmin from "../../components/HeaderAdmin";
import Sidebar from "../../components/Sidebar";
import Pagination from "../../components/Pagination";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet";
import SearchField from "react-search-field";
import makeToast from "../../components/Toaster";
import { CommonLoading } from "react-loadingg";
import {
  listSliders,
  deleteSlider,
  createSlider,
  getSliderDetails,
} from "../../actions/sliderActions";

import { Link } from "react-router-dom";

//  import "../admin/assets/css/style.css";

const SliderScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const sliderList = useSelector((state) => state.sliderList);
  const { loading, sliders } = sliderList;
  console.log(sliders);

  const sliderDetails = useSelector((state) => state.sliderDetails);
  const { sliderdetails } = sliderDetails;

  //pagination

  const [posts, setPosts] = useState([]);
  const [locading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const [sliderdata, setSliderData] = useState();

  // get current page post

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sliders.slice(indexOfFirstPost, indexOfLastPost);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const sliderDelete = useSelector((state) => state.sliderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = sliderDelete;

  useEffect(() => {
    // return sliderdata;
    if (userInfo && userInfo.isAdmin) {
      dispatch(listSliders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, sliderdata]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteSlider(id));
      setSliderData(sliders);

      //dispatch(listSliders());
      //dispatch(getSliderDetails(id));
      // console.log(sliderdetails);
      //  window.location.reload(false);
      makeToast("success", "Successfully Deleted");

      // history.push("/slider-list");
    }
  };

  // const handlePageChange = (pageNumber) => {
  //   console.log(`active page is ${pageNumber}`);

  //   setActivePage(pageNumber);
  // };

  const createPackageHandler = () => {
    // dispatch(createProduct());
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
                  <h3 class="page-title">Slider List</h3>
                  <ul class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="index.html">Dashboard</a>
                    </li>
                    <li class="breadcrumb-item active">Slider List</li>
                  </ul>
                </div>
              </div>
            </div>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            <div class="col-3 col-sm-4 col-md-2 col-xl mb-3 mb-xl-0 text-right">
              <Row className="align-items-center">
                <Col className="text-right">
                  <Link
                    class="col-lg-2 btn btn-block btn-outline-dark active"
                    to={"/admin-create-slider"}
                  >
                    <i className="fas fa-plus"></i> Create Slider{" "}
                  </Link>
                </Col>
              </Row>
            </div>
            <br />

            {/* <SearchField placeholder="Search item" onChange={onChange} /> */}
            {/* <Loader />} */}
            <div class="row">
              <div class="col-sm-12">
                <div class="card">
                  <div class="card-header">
                    <h4 class="card-title">Sliders</h4>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      {loading && <CommonLoading />}
                      <table class="table table-hover mb-0">
                        <thead>
                          <tr>
                            <th>SN</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sliders.map((slider, i) => (
                            <tr key={slider._id}>
                              <td>{i + 1}</td>

                              <td>{slider.name}</td>
                              <td>
                                {!slider.image ? (
                                  <img
                                    width="70px"
                                    height="50px"
                                    src="/uploads/empty.jpg"
                                    alt={slider.name}
                                    fluid
                                  />
                                ) : (
                                  <img
                                    width="70px"
                                    height="50px"
                                    src={slider.image}
                                    alt={slider.name}
                                    fluid
                                  />
                                )}
                              </td>

                              <td>
                                <LinkContainer
                                  to={`/slider/${slider._id}/edit`}
                                >
                                  <Button variant="light" className="btn-sm">
                                    <i className="fas fa-edit"></i>
                                  </Button>
                                </LinkContainer>
                                <Button
                                  variant="danger"
                                  className="btn-sm"
                                  onClick={() => deleteHandler(slider._id)}
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
                            totalPosts={sliders.length}
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

export default SliderScreen;
