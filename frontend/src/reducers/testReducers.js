import {
  TEST_LIST_REQUEST,
  TEST_LIST_SUCCESS,
  TEST_LIST_FAIL,
  TEST_DETAILS_REQUEST,
  TEST_DETAILS_SUCCESS,
  TEST_DETAILS_FAIL,
  TEST_BOOKING_REQUEST,
  TEST_BOOKING_SUCCESS,
  TEST_BOOKING_FAIL,
  TEST_BOOKING_LIST_REQUEST,
  TEST_BOOKING_LIST_SUCCESS,
  TEST_BOOKING_LIST_FAIL,
  TEST_BOOKING_CANCEL_REQUEST,
  TEST_BOOKING_CANCEL_SUCCESS,
  TEST_BOOKING_CANCEL_FAIL,
  TEST_BOOKING_CANCEL_RESET,
  TEST_BOOKING_COMPLETE_REQUEST,
  TEST_BOOKING_COMPLETE_SUCCESS,
  TEST_BOOKING_COMPLETE_FAIL,
  TEST_BOOKING_COMPLETE_RESET,
  TEST_CREATE_REQUEST,
  TEST_CREATE_SUCCESS,
  TEST_CREATE_FAIL,
  TEST_CREATE_RESET,
  TEST_UPDATE_REQUEST,
  TEST_UPDATE_SUCCESS,
  TEST_UPDATE_FAIL,
  TEST_UPDATE_RESET,
  TEST_DELETE_REQUEST,
  TEST_DELETE_SUCCESS,
  TEST_DELETE_FAIL,
  TEST_DELETE_RESET,
} from '../constants/testConstants';

export const testListReducer = (state = { tests: [] }, action) => {
  switch (action.type) {
    case TEST_LIST_REQUEST:
      return { loading: true, tests: [] };
    case TEST_LIST_SUCCESS:
      return { loading: false, tests: action.payload };
    case TEST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const testDetailsReducer = (state = { test: {} }, action) => {
  switch (action.type) {
    case TEST_DETAILS_REQUEST:
      return { loading: true, ...state };
    case TEST_DETAILS_SUCCESS:
      return { loading: false, test: action.payload };
    case TEST_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const testBookingReducer = (state = {}, action) => {
  switch (action.type) {
    case TEST_BOOKING_REQUEST:
      return { loading: true };
    case TEST_BOOKING_SUCCESS:
      return { loading: false, success: true, booking: action.payload };
    case TEST_BOOKING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const testBookingListReducer = (state = { bookings: [] }, action) => {
  switch (action.type) {
    case TEST_BOOKING_LIST_REQUEST:
      return { loading: true };
    case TEST_BOOKING_LIST_SUCCESS:
      return { loading: false, bookings: action.payload };
    case TEST_BOOKING_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const testBookingCancelReducer = (state = {}, action) => {
  switch (action.type) {
    case TEST_BOOKING_CANCEL_REQUEST:
      return { loading: true };
    case TEST_BOOKING_CANCEL_SUCCESS:
      return { loading: false, success: true };
    case TEST_BOOKING_CANCEL_FAIL:
      return { loading: false, error: action.payload };
    case TEST_BOOKING_CANCEL_RESET:
      return {};
    default:
      return state;
  }
};

export const testBookingCompleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TEST_BOOKING_COMPLETE_REQUEST:
      return { loading: true };
    case TEST_BOOKING_COMPLETE_SUCCESS:
      return { loading: false, success: true };
    case TEST_BOOKING_COMPLETE_FAIL:
      return { loading: false, error: action.payload };
    case TEST_BOOKING_COMPLETE_RESET:
      return {};
    default:
      return state;
  }
};

export const testCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TEST_CREATE_REQUEST:
      return { loading: true };
    case TEST_CREATE_SUCCESS:
      return { loading: false, success: true, test: action.payload };
    case TEST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TEST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const testUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case TEST_UPDATE_REQUEST:
      return { loading: true };
    case TEST_UPDATE_SUCCESS:
      return { loading: false, success: true, test: action.payload };
    case TEST_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TEST_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const testDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TEST_DELETE_REQUEST:
      return { loading: true };
    case TEST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TEST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case TEST_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
