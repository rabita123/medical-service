import axios from "axios";
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
} from "../constants/testConstants";

export const listTests = () => async (dispatch) => {
  try {
    dispatch({ type: TEST_LIST_REQUEST });

    const { data } = await axios.get("/api/tests");

    dispatch({
      type: TEST_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTestDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TEST_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/tests/${id}`);

    dispatch({
      type: TEST_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEST_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const bookTest = (testId, bookingData) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEST_BOOKING_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/tests/${testId}/book`,
      bookingData,
      config
    );

    dispatch({
      type: TEST_BOOKING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEST_BOOKING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyTestBookings = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TEST_BOOKING_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/tests/mybookings", config);

    dispatch({
      type: TEST_BOOKING_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEST_BOOKING_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const cancelTestBooking = (bookingId) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEST_BOOKING_CANCEL_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/tests/booking/${bookingId}/cancel`, {}, config);

    dispatch({ type: TEST_BOOKING_CANCEL_SUCCESS });
    dispatch(listMyTestBookings());
  } catch (error) {
    dispatch({
      type: TEST_BOOKING_CANCEL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const rescheduleTestBooking = (bookingId, appointmentDate) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEST_BOOKING_RESCHEDULE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(
      `/api/tests/booking/${bookingId}/reschedule`,
      { appointmentDate },
      config
    );

    dispatch({ type: TEST_BOOKING_RESCHEDULE_SUCCESS });
    dispatch(listMyTestBookings());
  } catch (error) {
    dispatch({
      type: TEST_BOOKING_RESCHEDULE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
