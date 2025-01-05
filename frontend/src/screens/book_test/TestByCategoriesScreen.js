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

const TestByCategoriesScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const testId = match.params.id;

  const [categoryId, setCategoryId] = React.useState();

  const [isCheck, setIsCheck] = useState([]);
  const { addToast } = useToasts();

  const onClick = (id) => {
    dispatch(listAllTestByCategories(id));
    // alert(id);
  };

  const refreshPage = () => {};
  const testCategories = useSelector((state) => state.testCategories);
  const { loading, error, testcategories } = testCategories;

  const test = useSelector((state) => state.test);
  const { alltests } = test;

  const testById = useSelector((state) => state.testById);
  const { alltestsbycategories } = testById;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const value = 1;
  const qty = Number(value);

  const addToCartHandler = (id, name) => {
    if (localStorage.getItem(id) == id) {
      localStorage.setItem(id, "no");
      dispatch(removeFromCart(id));
      addToast("Remove from cart successfully", {
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
  };

  useEffect(() => {
    dispatch(listAllTestByCategories(testId));
    // dispatch(listAllTests());
  }, [dispatch]);

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

                      <Link>All</Link>
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
                                onClick={() =>
                                  addToCartHandler(test._id, test.name)
                                }
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestByCategoriesScreen;
