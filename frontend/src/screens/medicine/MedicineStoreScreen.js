import React, { useState, useEffect, useRef, Component, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listAllMedicines } from "../../actions/medicineActions";
import { MEDICINE_LIST_SUCCESS } from "../../constants/medicineConstants";
import { updateValue } from "../../actions/productActions";
import { CommonLoading } from "react-loadingg";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import { UPDATE_VALUE_RESET } from "../../constants/productConstants";
import makeToast from "../../components/Toaster";
const Pagination = lazy(() => import("../../components/Pagination"));
const Header = lazy(() => import("../../components/Header"));

const MedicineStoreScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const btnRef = useRef();

  const value = 1;
  const qty = Number(value);
  const [isCheck, setIsCheck] = useState("");
  const [carts, setCarts] = useState([]);
  const [loadings, setLoadings] = useState([]);
  const [isTest, setIsTest] = useState(false);
  const medicineList = useSelector((state) => state.medicineList);
  const { loading, error, allmedicines } = medicineList;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    dispatch(listAllMedicines());
  }, []);

  const addToCartHandler = (id, name) => {
    if (localStorage.getItem(id) == id) {
      localStorage.setItem(id, "no");
      dispatch(removeFromCart(id));
      //makeToast("error", name + "remove from Cart");
    } else {
      localStorage.setItem(id, id);

      dispatch(addToCart(id, qty));
      makeToast("success", name + " " + "added to cart successfully");
    }
  };

  const [posts, setPosts] = useState([]);
  const [locading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);

  // get current page post

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allmedicines.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                    Medicine Store
                  </li>
                </ol>
              </nav>
              <h2 class="breadcrumb-title">
                <span class="text-small text-white ml-2">
                  {" "}
                  <b>Medicines</b>
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
            <div class="col-md-1"></div>
            <div class="col-md-7 col-lg-9 col-xl-9">
              <div class="card">
                <div class="card-header">
                  <h4 class="card-title">Medicines</h4>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table table-hover mb-0">
                      <thead>
                        <tr>
                          <th>SL</th>
                          <th>Name (Generic) </th>
                          <th>Name (Commercial) </th>
                          <th>Price</th>
                          {/* <th>Discount</th> */}
                          <th>Add to Cart</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading && <CommonLoading />}
                        {currentPosts.map((medicine, i) => (
                          <tr>
                            <td>{i + 1}</td>

                            <td>{medicine.name}</td>
                            <td>{medicine.commercialName}</td>

                            <td>{medicine.price}</td>
                            {/* <td>{medicine.discountedPrice}</td> */}
                            <td>
                              <a
                                onClick={() =>
                                  addToCartHandler(medicine._id, medicine.name)
                                }
                                class="cart-icon"
                              >
                                {localStorage.getItem(medicine._id) ===
                                medicine._id ? (
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
                    <div>
                      <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={allmedicines.length}
                        paginate={paginate}
                      />
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
};

export default MedicineStoreScreen;
