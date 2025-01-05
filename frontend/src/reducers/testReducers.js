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
  TEST_BOOKING_RESCHEDULE_REQUEST,
  TEST_BOOKING_RESCHEDULE_SUCCESS,
  TEST_BOOKING_RESCHEDULE_FAIL,
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
    default:
      return state;
  }
};

export const testBookingRescheduleReducer = (state = {}, action) => {
  switch (action.type) {
    case TEST_BOOKING_RESCHEDULE_REQUEST:
      return { loading: true };
    case TEST_BOOKING_RESCHEDULE_SUCCESS:
      return { loading: false, success: true };
    case TEST_BOOKING_RESCHEDULE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
