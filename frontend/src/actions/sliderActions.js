import axios from "axios";
import {
  SLIDER_REQUEST,
  SLIDER_SUCCESS,
  SLIDER_FAIL,
  SLIDER_DELETE_REQUEST,
  SLIDER_DELETE_SUCCESS,
  SLIDER_DELETE_FAIL,
  SLIDER_CREATE_REQUEST,
  SLIDER_CREATE_SUCCESS,
  SLIDER_CREATE_FAIL,
  SLIDER_DETAILS_REQUEST,
  SLIDER_DETAILS_SUCCESS,
  SLIDER_DETAILS_FAIL,
  SLIDER_DETAILS_RESET,
  SLIDER_UPDATE_REQUEST,
  SLIDER_UPDATE_SUCCESS,
  SLIDER_UPDATE_FAIL,
  SLIDER_UPDATE_RESET,
} from "../constants/sliderConstants";

import { logout } from "./userActions";

export const listSliders = () => async (dispatch) => {
  try {
    dispatch({ type: "SLIDER_LIST_REQUEST" });

    const { data } = await axios.get("/api/sliders");

    dispatch({
      type: "SLIDER_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "SLIDER_LIST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSlider = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SLIDER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${userInfo.token}`,
    //   },
    // };

    await axios.delete(`/api/sliders/${id}`);

    dispatch({
      type: SLIDER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: SLIDER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createSlider = (name, image) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SLIDER_CREATE_REQUEST,
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
      `/api/sliders`,
      {
        name,
        image,
      },
      config
    );

    dispatch({
      type: SLIDER_CREATE_SUCCESS,
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
      type: SLIDER_CREATE_FAIL,
      payload: message,
    });
  }
};

export const getSliderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SLIDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/sliders/${id}`, config);

    dispatch({
      type: SLIDER_DETAILS_SUCCESS,
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
      type: SLIDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const updateSlider = (slider) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SLIDER_UPDATE_REQUEST,
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
      `/api/sliders/${slider._id}`,
      slider,
      config
    );

    dispatch({ type: SLIDER_UPDATE_SUCCESS });

    dispatch({ type: SLIDER_DETAILS_SUCCESS, payload: data });

    dispatch({ type: SLIDER_DETAILS_RESET });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: SLIDER_UPDATE_FAIL,
      payload: message,
    });
  }
};
