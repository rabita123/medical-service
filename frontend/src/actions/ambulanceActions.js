import axios from "axios";
import {
  AMBULANCE_REQUEST,
  AMBULANCE_SUCCESS,
  AMBULANCE_FAIL,
  AMBULANCE_DELETE_REQUEST,
  AMBULANCE_DELETE_SUCCESS,
  AMBULANCE_DELETE_FAIL,
  AMBULANCE_CREATE_REQUEST,
  AMBULANCE_CREATE_SUCCESS,
  AMBULANCE_CREATE_FAIL,
  AMBULANCE_DETAILS_REQUEST,
  AMBULANCE_DETAILS_SUCCESS,
  AMBULANCE_DETAILS_FAIL,
  AMBULANCE_DETAILS_RESET,
  AMBULANCE_UPDATE_REQUEST,
  AMBULANCE_UPDATE_SUCCESS,
  AMBULANCE_UPDATE_FAIL,
  AMBULANCE_UPDATE_RESET,
} from "../constants/ambulanceConstants";

import { logout } from "./userActions";

export const listAmbulances = () => async (dispatch) => {
  try {
    dispatch({ type: AMBULANCE_REQUEST });

    const { data } = await axios.get("/api/ambulances");

    dispatch({
      type: AMBULANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AMBULANCE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteAmbulance = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AMBULANCE_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${userInfo.token}`,
    //   },
    // };

    await axios.delete(`/api/ambulances/${id}`);

    dispatch({
      type: AMBULANCE_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: AMBULANCE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createAmbulance = (name, phone, image) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: AMBULANCE_CREATE_REQUEST,
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
      `/api/ambulances`,
      {
        name,
        phone,
        image,
      },
      config
    );

    dispatch({
      type: AMBULANCE_CREATE_SUCCESS,
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
      type: AMBULANCE_CREATE_FAIL,
      payload: message,
    });
  }
};

export const getAmbulanceDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AMBULANCE_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/ambulances/${id}`, config);

    dispatch({
      type: AMBULANCE_DETAILS_SUCCESS,
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
      type: AMBULANCE_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const updateAmbulance = (ambulance) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AMBULANCE_UPDATE_REQUEST,
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
      `/api/ambulances/${ambulance._id}`,
      ambulance,
      config
    );

    dispatch({ type: AMBULANCE_UPDATE_SUCCESS });

    dispatch({ type: AMBULANCE_DETAILS_SUCCESS, payload: data });

    dispatch({ type: AMBULANCE_DETAILS_RESET });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: AMBULANCE_UPDATE_FAIL,
      payload: message,
    });
  }
};
