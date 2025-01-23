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
  TEST_CREATE_REQUEST,
  TEST_CREATE_SUCCESS,
  TEST_CREATE_FAIL,
  TEST_UPDATE_REQUEST,
  TEST_UPDATE_SUCCESS,
  TEST_UPDATE_FAIL,
  TEST_DELETE_REQUEST,
  TEST_DELETE_SUCCESS,
  TEST_DELETE_FAIL,
  TEST_BOOKING_COMPLETE_REQUEST,
  TEST_BOOKING_COMPLETE_SUCCESS,
  TEST_BOOKING_COMPLETE_FAIL,
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

export const createTest = (testData) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEST_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('/api/tests', testData, config);

    dispatch({
      type: TEST_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateTest = (id, testData) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEST_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/tests/${id}`, testData, config);

    dispatch({
      type: TEST_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEST_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTest = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEST_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/tests/${id}`, config);

    dispatch({ type: TEST_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: TEST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listAllTestBookings = () => async (dispatch, getState) => {
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

    const { data } = await axios.get('/api/tests/bookings', config);

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

export const completeTestBooking = (bookingId) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEST_BOOKING_COMPLETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/tests/booking/${bookingId}/complete`, {}, config);

    dispatch({ type: TEST_BOOKING_COMPLETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: TEST_BOOKING_COMPLETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
