import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import loadingImage from "../../loading.jpg";
import Img from "react-cool-img";
import { Link } from "react-router-dom";
import {
  nursingListPackages,
  nursingListPackagesByType,
} from "../../actions/nursingPackageActions";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const NursingPackageScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const Hourly = "Hourly";
  const Weekly = "Weekly";
  const Quarterly = "Quarterly";
  const Monthly = "Monthly";

  const [showResults, setShowResults] = React.useState(true);

  const [showResultcategories, setShowResultcategories] = React.useState(false);

  const nursingPackageList = useSelector((state) => state.nursingPackageList);
  const { loading, error, nursingpackages } = nursingPackageList;

  const onClick = (id) => {
    setShowResults(false);
    setShowResultcategories(true);

    dispatch(nursingListPackagesByType(id));
  };
  const nursingPackageListByType = useSelector(
    (state) => state.nursingPackageListByType
  );
  const { nursingpackagesbytype } = nursingPackageListByType;
  useEffect(() => {
    dispatch(nursingListPackages());
  }, [dispatch]);

  const refreshPage = () => {
    window.location.reload(false);
  };
  const checkoutHandler = (id, type = "nursing") => {
    history.push(`/login?redirect=usersform/${type}/${id}`);
  };

  const Results = () => {
    return (
      <div class="tab-content">
        <div class="tab-pane show active" id="solid-rounded-justified-tab1">
          <div class="row">
            {nursingpackages.map((nursingpackage, i) => (
              <div class="col-md-12 col-lg-4 col-xl-4 product-custom">
                <div class="profile-widget">
                  <div class="doc-img">
                    <a href="product-description.html" tabindex="-1">
                      <Img
                        height="400"
                        width="400"
                        class="img-fluid"
                        alt="Product image"
                        placeholder={loadingImage}
                        src={nursingpackage.image}
                      />
                    </a>
                    <a href="javascript:void(0)" class="fav-btn" tabindex="-1">
                      <i class="far fa-bookmark"></i>
                    </a>
                  </div>
                  <div class="pro-content">
                    <h3 class="title pb-4">
                      <Link to={`/nursing-package-form/${nursingpackage._id}`}>
                        {nursingpackage.name}
                      </Link>
                    </h3>

                    {/* <h3 class="title pb-4">
                      Package Type :{nursingpackage.nursingPackageType}
                    </h3> */}

                    <h3 class="title pb-4">
                      Price :{nursingpackage.price} BDT
                    </h3>

                    <div class="row align-items-center">
                      <div class="col-lg-6">
                        <div class="clinic-booking pt-4">
                          <button
                            type="button"
                            class="btn btn-dark"
                            onClick={() => checkoutHandler(nursingpackage._id)}
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
    );
  };

  const Resultcategories = () => {
    return (
      <div class="tab-content">
        {nursingpackagesbytype.map((packagetype, i) => (
          <div
            class="tab-pane show active"
            id={"solid-rounded-justified-tab" + packagetype.package_type}
          >
            {packagetype.description}
            <div class="row">
              <div class="col-md-12 col-lg-4 col-xl-4 product-custom">
                <div class="profile-widget">
                  <div class="doc-img">
                    <a href="product-description.html" tabindex="-1">
                      <img
                        class="img-fluid"
                        alt="Product image"
                        src={packagetype.image}
                      />
                    </a>
                    <a href="javascript:void(0)" class="fav-btn" tabindex="-1">
                      <i class="far fa-bookmark"></i>
                    </a>
                  </div>
                  <div class="pro-content">
                    <h3 class="title pb-4">
                      <a href="product-description.html" tabindex="-1">
                        {packagetype.title}
                      </a>
                    </h3>
                    <div class="row align-items-center">
                      <div class="col-lg-6"></div>
                      <div class="col-lg-6 text-right">
                        <a href="cart.html" class="cart-icon">
                          <i class="fas fa-shopping-cart"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
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
              <h2 class="breadcrumb-title">Nursing Service</h2>
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
                  <h3 class="blog-title">Nursing Service </h3>

                  <div class="blog-info-style">
                    <p>
                      We provide well trained and well behaved nurse for the
                      client’s to take care their family patients in their home.
                    </p>
                  </div>

                  <div class="card-body">
                    {/* <ul class="nav nav-tabs nav-tabs-solid nav-tabs-rounded nav-justified">
                      <li class="nav-item">
                        <a
                          class="nav-link active"
                          // href={"#solid-rounded-justified-tab" + Hourly}
                          data-toggle="tab"
                          onClick={refreshPage}
                        >
                          All
                        </a>
                      </li>

                      <li class="nav-item">
                        <a
                          class="nav-link "
                          href={"#solid-rounded-justified-tab" + Hourly}
                          data-toggle="tab"
                          onClick={() => onClick(Hourly)}
                        >
                          Hourly
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          href={"#solid-rounded-justified-tab" + Weekly}
                          data-toggle="tab"
                          onClick={() => onClick(Weekly)}
                        >
                          Weekly
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          href={"#solid-rounded-justified-tab" + Quarterly}
                          data-toggle="tab"
                          onClick={() => onClick(Quarterly)}
                        >
                          Quarterly
                        </a>
                      </li>

                      <li class="nav-item">
                        <a
                          class="nav-link"
                          href={"#solid-rounded-justified-tab" + Monthly}
                          data-toggle="tab"
                          onClick={() => onClick(Monthly)}
                        >
                          Monthly
                        </a>
                      </li>
                    </ul> */}

                    {showResults ? <Results /> : null}
                    {showResultcategories ? <Resultcategories /> : null}

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

export default NursingPackageScreen;
