import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  HEALTH_PRODUCT_LIST_REQUEST,
  HEALTH_PRODUCT_LIST_SUCCESS,
  HEALTH_PRODUCT_LIST_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  UPDATE_VALUE_REQUEST,
  UPDATE_VALUE_SUCCESS,
  UPDATE_VALUE_FAIL,
  UPDATE_VALUE_RESET,
} from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productUpdateReducer = (
  state = { productupdates: {} },
  action
) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return {
        productupdates: {},
      };
    default:
      return state;
  }
};

export const updateValueReducer = (state = { updatesvalue: {} }, action) => {
  switch (action.type) {
    case UPDATE_VALUE_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_VALUE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_VALUE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_VALUE_RESET:
      return { updatesvalue: {} };

    default:
      return state;
  }
};

export const healthProductListReducer = (
  state = { healthproducts: [] },
  action
) => {
  switch (action.type) {
    case HEALTH_PRODUCT_LIST_REQUEST:
      return { loading: true, healthproducts: [] };
    case HEALTH_PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        healthproducts: action.payload,
      };
    case HEALTH_PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { productdetails: {} },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, productdetails: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_DETAILS_RESET:
      return { productdetails: {} };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, products: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
