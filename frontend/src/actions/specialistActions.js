import axios from "axios";
import {
  SPECIALIST_REQUEST,
  SPECIALIST_SUCCESS,
  SPECIALIST_FAIL,
  SPECIALIST_DELETE_REQUEST,
  SPECIALIST_DELETE_SUCCESS,
  SPECIALIST_DELETE_FAIL,
  SPECIALIST_CREATE_REQUEST,
  SPECIALIST_CREATE_SUCCESS,
  SPECIALIST_CREATE_FAIL,
  SPECIALIST_DETAILS_REQUEST,
  SPECIALIST_DETAILS_SUCCESS,
  SPECIALIST_DETAILS_FAIL,
  SPECIALIST_DETAILS_RESET,
  SPECIALIST_UPDATE_REQUEST,
  SPECIALIST_UPDATE_SUCCESS,
  SPECIALIST_UPDATE_FAIL,
  SPECIALIST_UPDATE_RESET,
} from "../constants/specialistConstants";

import { logout } from "./userActions";

export const listSpecialists = () => async (dispatch) => {
  try {
    dispatch({ type: 'SPECIALIST_LIST_REQUEST' });

    const { data } = await axios.get('/api/specialists');

    dispatch({
      type: 'SPECIALIST_LIST_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'SPECIALIST_LIST_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSpecialist = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SPECIALIST_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${userInfo.token}`,
    //   },
    // };

    await axios.delete(`/api/specialists/${id}`);

    dispatch({
      type: SPECIALIST_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: SPECIALIST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createSpecialist = (name) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SPECIALIST_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/specialists`,
      {
        name,
      },
      config
    );

    dispatch({
      type: SPECIALIST_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: SPECIALIST_CREATE_FAIL,
      payload: message,
    });
  }
};

export const getSpecialistDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SPECIALIST_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/specialists/${id}`, config);

    dispatch({
      type: SPECIALIST_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: SPECIALIST_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const updateSpecialist = (specialist) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SPECIALIST_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/specialists/${specialist._id}`,
      specialist,
      config
    );

    dispatch({ type: SPECIALIST_UPDATE_SUCCESS });

    dispatch({ type: SPECIALIST_DETAILS_SUCCESS, payload: data });

    dispatch({ type: SPECIALIST_DETAILS_RESET });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: SPECIALIST_UPDATE_FAIL,
      payload: message,
    });
  }
};
