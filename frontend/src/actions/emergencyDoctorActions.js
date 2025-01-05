import axios from "axios";
import {
  EMERGENCY_DOCTOR_CREATE_REQUEST,
  EMERGENCY_DOCTOR_CREATE_SUCCESS,
  EMERGENCY_DOCTOR_CREATE_FAIL,
  EMERGENCY_DOCTOR_LIST_REQUEST,
  EMERGENCY_DOCTOR_LIST_SUCCESS,
  EMERGENCY_DOCTOR_LIST_FAIL,
  EMERGENCY_DOCTOR_UPDATE_REQUEST,
  EMERGENCY_DOCTOR_UPDATE_SUCCESS,
  EMERGENCY_DOCTOR_UPDATE_FAIL,
  EMERGENCY_DOCTOR_UPDATE_RESET,
  EMERGENCY_DOCTOR_DETAILS_REQUEST,
  EMERGENCY_DOCTOR_DETAILS_SUCCESS,
  EMERGENCY_DOCTOR_DETAILS_FAIL,
  EMERGENCY_DOCTOR_DETAILS_RESET,
} from "../constants/emergencyDoctorConstants";

import { logout } from "./userActions";

export const listEmergencyDoctors = () => async (dispatch, getState) => {
  try {
    dispatch({ type: EMERGENCY_DOCTOR_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/emergencydoctors", config);

    dispatch({
      type: EMERGENCY_DOCTOR_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMERGENCY_DOCTOR_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createEmergencyDoctor = (phone, textdetails) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: EMERGENCY_DOCTOR_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/emergencydoctors`, {
      phone,
      textdetails,
    });

    dispatch({
      type: EMERGENCY_DOCTOR_CREATE_SUCCESS,
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
      type: EMERGENCY_DOCTOR_CREATE_FAIL,
      payload: message,
    });
  }
};

export const getEmergencyDoctorDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMERGENCY_DOCTOR_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/emergencydoctors/${id}`, config);

    dispatch({
      type: EMERGENCY_DOCTOR_DETAILS_SUCCESS,
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
      type: EMERGENCY_DOCTOR_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const updateEmergencyDoctor = (emergencydoctor) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: EMERGENCY_DOCTOR_UPDATE_REQUEST,
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
      `/api/emergencydoctors/${emergencydoctor._id}`,
      emergencydoctor,
      config
    );

    dispatch({ type: EMERGENCY_DOCTOR_UPDATE_SUCCESS });

    dispatch({ type: EMERGENCY_DOCTOR_DETAILS_SUCCESS, payload: data });

    dispatch({ type: EMERGENCY_DOCTOR_DETAILS_RESET });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: EMERGENCY_DOCTOR_UPDATE_FAIL,
      payload: message,
    });
  }
};
