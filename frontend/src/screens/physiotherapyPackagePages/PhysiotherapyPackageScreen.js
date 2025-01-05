import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import loadingImage from "../../loading.jpg";
import Img from "react-cool-img";
import { Link } from "react-router-dom";
import {
  physioListPackages,
  markPayment,
} from "../../actions/physiotherapyActions";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const PhysiotherapyPackageScreen = ({ match, history, location }) => {
  const dispatch = useDispatch();

  const physiotherapyPackageList = useSelector(
    (state) => state.physiotherapyPackageList
  );
  const { loading, error, physiopackages } = physiotherapyPackageList;

  useEffect(() => {
    dispatch(physioListPackages());
  }, [dispatch]);

  // const [types, setTypes] = useState("physio");

  // const checkoutHandler = (id) => {
  //   history.push(`/login?redirect=usersform/${id}?type=physio`);
  // };
  // const checkoutHandler = (id) => {
  //   history.push("/login?redirect=address");
  // };

  const checkoutHandler = (id, type = "physio") => {
    history.push(`/login?redirect=usersform/${type}/${id}`);
  };

  return (
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
                    Special Survice
                  </li>
                </ol>
              </nav>
              <h2 class="breadcrumb-title">PhysioTherapy Service</h2>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Breadcrumb --> */}

      <div class="content">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="blog-view">
                <div class="blog blog-single-post">
                  <h3 class="blog-title">PhysioTherapy Service </h3>

                  <div class="blog-info-style">
                    {/* <p>
                      We provide well trained and well behaved nurse for the
                      client’s to take care their family patients in their home.
                    </p> */}
                  </div>

                  <div class="card-body">
                    <div class="tab-content">
                      <div
                        class="tab-pane show active"
                        id="solid-rounded-justified-tab1"
                      >
                        <div class="row">
                          {physiopackages.map((physiopackage, i) => (
                            <div class="col-md-12 col-lg-4 col-xl-4 product-custom">
                              <div class="profile-widget">
                                <div class="doc-img">
                                  <a
                                    href="product-description.html"
                                    tabindex="-1"
                                  >
                                    <Img
                                      height="400"
                                      width="400"
                                      class="img-fluid"
                                      alt="Product image"
                                      placeholder={loadingImage}
                                      src={physiopackage.image}
                                    />
                                  </a>
                                  <a
                                    href="javascript:void(0)"
                                    class="fav-btn"
                                    tabindex="-1"
                                  >
                                    <i class="far fa-bookmark"></i>
                                  </a>
                                </div>
                                <div class="pro-content">
                                  <h3 class="title pb-4">
                                    <Link>{physiopackage.name}</Link>
                                  </h3>

                                  <h3 class="title pb-4">
                                    Price :{physiopackage.price} BDT
                                  </h3>

                                  <div class="row align-items-center">
                                    <div class="col-lg-6">
                                      <div class="clinic-booking pt-4">
                                        <button
                                          type="button"
                                          class="btn btn-dark"
                                          onClick={() =>
                                            checkoutHandler(physiopackage._id)
                                          }
                                        >
                                          Book Now
                                        </button>
                                      </div>
                                    </div>
                                    {/* <div class="col-lg-6 text-right">
                        <a href="cart.html" class="cart-icon">
                          <i class="fas fa-shopping-cart"></i>
                        </a>
                      </div> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <br />
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

export default PhysiotherapyPackageScreen;
