import React, { useEffect, useState, Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { listTestCategories } from "../../actions/testCategoriesActions";
import {
  listAllTests,
  listAllTestByCategories,
} from "../../actions/testActions";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import Loader from "../../components/Loader";
import makeToast from "../../components/Toaster";
import { CommonLoading } from "react-loadingg";
import { ToastProvider, useToasts } from "react-toast-notifications";

const TestMenuScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const testId = match.params.id;
  const [showResults, setShowResults] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState();
  const [showResultcategories, setShowResultcategories] = React.useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const { addToast } = useToasts();

  const onClick = (id) => {
    setShowResults(false);
    setShowResultcategories(true);
    setCategoryId(id);
    dispatch(listAllTestByCategories(id));
    // alert(id);
  };

  const refreshPage = () => {
    setShowResults(true);
    setShowResultcategories(false);
  };
  const testCategories = useSelector((state) => state.testCategories);
  const { loading, error, testcategories } = testCategories;

  const test = useSelector((state) => state.test);
  const { alltests } = test;

  const testById = useSelector((state) => state.testById);
  const { alltestsbycategories } = testById;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // const addToCartHandler = (id) => {
  //   history.push(`/cart/${id}`);
  //   //history.push(`/cart/${match.params.id}`);
  // };

  const value = 1;
  const qty = Number(value);

  const addToCartHandler = (id, name) => {
    //history.push(`/cart/${id}`);

    //localStorage.setItem("myData", cartItems);
    // setIsCheck(localStorage.getItem("myData"));

    if (localStorage.getItem(id) == id) {
      localStorage.setItem(id, "no");
      dispatch(removeFromCart(id));
      addToast("Remove from cart successfully", {
        //  id: "generated-string",
        appearance: "error",
        autoDismiss: "true",
        autoDismissTimeout: 2000,
        placement: "top-center",
      });

      //makeToast("error", name + "remove from Cart");
    } else {
      localStorage.setItem(id, id);

      dispatch(addToCart(id, qty));
      //makeToast("success", name + " " + "added to cart successfully");
      addToast("Addedd to cart successfully", {
        //  id: "generated-string",
        appearance: "success",
        autoDismiss: "true",
        autoDismissTimeout: 2000,
        placement: "top-center",
      });
    }

    //console.log(localStorage.getItem("myData"));

    // dispatch(removeFromCart(id));

    // dispatch(listAllMedicines());
    //history.push("/test-menu");
  };

  useEffect(() => {
    dispatch(listTestCategories());
    dispatch(listAllTests());
  }, [dispatch]);

  const Results = () => {
    return (
      <div class="card-body">
        {/* {loading && <Loader />} */}
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead>
              <tr>
                <th>SL</th>
                <th>Test Name</th>
                <th>Net Payment</th>
                <th>Add to Cart</th>
              </tr>
            </thead>
            <tbody>
              {loading && <CommonLoading />}
              {alltests.map((test, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{test.name}</td>
                  <td>{test.price}</td>
                  <td>
                    <Link
                      onClick={() => addToCartHandler(test._id, test.name)}
                      class="cart-icon"
                    >
                      {/* <i class="fas fa-shopping-cart"></i> */}
                      {localStorage.getItem(test._id) === test._id &&
                      cartItems.length > 0 ? (
                        <i class="fas fa-check set-colors"></i>
                      ) : (
                        <i class="fas fa-cart-plus"></i>
                      )}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const Resultcategories = () => {
    return (
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead>
              <tr>
                <th>SL</th>
                <th>Test Name</th>
                <th>Net Payment</th>
                <th>Add to Cart</th>
              </tr>
            </thead>
            <tbody>
              {alltestsbycategories.map((test, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{test.name}</td>
                  <td>{test.price}</td>
                  <td>
                    <a
                      onClick={() => addToCartHandler(test._id, test.name)}
                      class="cart-icon"
                    >
                      {localStorage.getItem(test._id) === test._id ? (
                        <i class="fas fa-check set-colors"></i>
                      ) : (
                        <i class="fas fa-cart-plus"></i>
                      )}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div class="main-wrapper">
      <Header />

      <div class="breadcrumb-bar">
        <div class="container-fluid">
          <div class="row align-items-center">
            <div class="col-md-12 col-12">
              <nav aria-label="breadcrumb" class="page-breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Health Test
                  </li>
                </ol>
              </nav>
              <h2 class="breadcrumb-title">
                <span class="text-small text-white ml-2">
                  {" "}
                  <b>Health Test</b>
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Page Content --> */}
      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-5 col-lg-3 col-xl-3 theiaStickySidebar">
              {/* <!-- Search Filter --> */}
              <div class="card search-filter">
                <div class="card-header">
                  <h4 class="card-title mb-0">Tests</h4>
                </div>
                <div class="card-body">
                  <div class="filter-widget">
                    <h4>Categories</h4>

                    <div>
                      {/* <span class="checkmark"></span> */}

                      <Link onClick={refreshPage}>All</Link>
                    </div>
                    {testcategories.map((testcategory) => (
                      <div>
                        {/* <input type="submit" value="Search" onClick={onClick} /> */}

                        {/* <span class="checkmark"></span> */}

                        <Link onClick={() => onClick(testcategory._id)}>
                          {testcategory.category_name}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* <!-- /Search Filter --> */}
            </div>

            <div class="col-md-7 col-lg-9 col-xl-9">
              <div class="card">
                <div class="card-header">
                  <h4 class="card-title">Test Menu</h4>
                </div>
                {showResults ? <Results /> : null}
                {showResultcategories ? <Resultcategories /> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestMenuScreen;
