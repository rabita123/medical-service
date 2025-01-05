import {
  PHYSIOTHERAPY_SAVE_FORM_REQUEST,
  PHYSIOTHERAPY_SAVE_FORM_SUCCESS,
  PHYSIOTHERAPY_SAVE_FORM_FAIL,
  PHYSIOTHERAPY_PACKAGE_LIST_REQUEST,
  PHYSIOTHERAPY_PACKAGE_LIST_SUCCESS,
  PHYSIOTHERAPY_PACKAGE_LIST_FAIL,
  USER_ORDER_LIST_REQUEST,
  USER_ORDER_LIST_SUCCESS,
  USER_ORDER_LIST_FAIL,
  MARK_PAYMENT_REQUEST,
  MARK_PAYMENT_SUCCESS,
  MARK_PAYMENT_FAIL,
} from "../constants/physiotherapyConstants";

export const physiotherapyReducer = (state = {}, action) => {
  switch (action.type) {
    case PHYSIOTHERAPY_SAVE_FORM_REQUEST:
      return { loading: true };
    case PHYSIOTHERAPY_SAVE_FORM_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case PHYSIOTHERAPY_SAVE_FORM_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const physiotherapyPackageListReducer = (
  state = { physiopackages: [] },
  action
) => {
  switch (action.type) {
    case PHYSIOTHERAPY_PACKAGE_LIST_REQUEST:
      return { loading: true, physiopackages: [] };
    case PHYSIOTHERAPY_PACKAGE_LIST_SUCCESS:
      return {
        loading: false,
        physiopackages: action.payload,
      };
    case PHYSIOTHERAPY_PACKAGE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updatePayReducer = (state = {}, action) => {
  switch (action.type) {
    case MARK_PAYMENT_REQUEST:
      return {
        loading: true,
      };
    case MARK_PAYMENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case MARK_PAYMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userOrderListReducer = (
  state = { userorderlists: [] },
  action
) => {
  switch (action.type) {
    case USER_ORDER_LIST_REQUEST:
      return { loading: true, userorderlists: [] };
    case USER_ORDER_LIST_SUCCESS:
      return {
        loading: false,
        userorderlists: action.payload,
      };
    case USER_ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
