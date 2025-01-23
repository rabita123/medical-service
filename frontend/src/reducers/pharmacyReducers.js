import {
  MEDICATION_LIST_REQUEST,
  MEDICATION_LIST_SUCCESS,
  MEDICATION_LIST_FAIL,
  MEDICATION_DETAILS_REQUEST,
  MEDICATION_DETAILS_SUCCESS,
  MEDICATION_DETAILS_FAIL,
  MEDICATION_CREATE_REQUEST,
  MEDICATION_CREATE_SUCCESS,
  MEDICATION_CREATE_FAIL,
  MEDICATION_CREATE_RESET,
  PRESCRIPTION_ORDER_CREATE_REQUEST,
  PRESCRIPTION_ORDER_CREATE_SUCCESS,
  PRESCRIPTION_ORDER_CREATE_FAIL,
  PRESCRIPTION_ORDER_CREATE_RESET,
  PRESCRIPTION_ORDER_LIST_REQUEST,
  PRESCRIPTION_ORDER_LIST_SUCCESS,
  PRESCRIPTION_ORDER_LIST_FAIL,
  PRESCRIPTION_ORDER_DETAILS_REQUEST,
  PRESCRIPTION_ORDER_DETAILS_SUCCESS,
  PRESCRIPTION_ORDER_DETAILS_FAIL,
  PRESCRIPTION_ORDER_STATUS_UPDATE_REQUEST,
  PRESCRIPTION_ORDER_STATUS_UPDATE_SUCCESS,
  PRESCRIPTION_ORDER_STATUS_UPDATE_FAIL,
  PRESCRIPTION_ORDER_STATUS_UPDATE_RESET,
} from '../constants/pharmacyConstants';

export const medicationListReducer = (state = { medications: [] }, action) => {
  switch (action.type) {
    case MEDICATION_LIST_REQUEST:
      return { ...state, loading: true };
    case MEDICATION_LIST_SUCCESS:
      return { loading: false, medications: action.payload };
    case MEDICATION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const medicationDetailsReducer = (state = { medication: {} }, action) => {
  switch (action.type) {
    case MEDICATION_DETAILS_REQUEST:
      return { loading: true, ...state };
    case MEDICATION_DETAILS_SUCCESS:
      return { loading: false, medication: action.payload };
    case MEDICATION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const medicationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MEDICATION_CREATE_REQUEST:
      return { loading: true };
    case MEDICATION_CREATE_SUCCESS:
      return { loading: false, success: true, medication: action.payload };
    case MEDICATION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case MEDICATION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const prescriptionOrderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRESCRIPTION_ORDER_CREATE_REQUEST:
      return { loading: true };
    case PRESCRIPTION_ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case PRESCRIPTION_ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRESCRIPTION_ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const prescriptionOrderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case PRESCRIPTION_ORDER_LIST_REQUEST:
      return { loading: true };
    case PRESCRIPTION_ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case PRESCRIPTION_ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const prescriptionOrderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case PRESCRIPTION_ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRESCRIPTION_ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case PRESCRIPTION_ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const prescriptionOrderStatusUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRESCRIPTION_ORDER_STATUS_UPDATE_REQUEST:
      return { loading: true };
    case PRESCRIPTION_ORDER_STATUS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case PRESCRIPTION_ORDER_STATUS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRESCRIPTION_ORDER_STATUS_UPDATE_RESET:
      return {};
    default:
      return state;
  }
}; 