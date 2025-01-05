import axios from "axios";
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
import { logout } from "./userActions";
export const physiotherapySaveForm = (
  name,
  user_id,

  phone,
  physiotherapyId,
  types,
  age,

  address,
  gender,
  bloodGroup,
  diagnosis,
  image,
  department,
  dateFrom,
  dateTo,
  timeFrom,
  timeTo,
  concernDoctor,

  paymentMethod
) => async (dispatch) => {
  try {
    dispatch({
      type: PHYSIOTHERAPY_SAVE_FORM_REQUEST,
    });

    const { data } = await axios.post("/api/physiotherapy/add", {
      name,
      user_id,

      phone,
      physiotherapyId,
      types,
      age,

      address,
      gender,
      bloodGroup,
      diagnosis,
      image,
      department,
      dateFrom,
      dateTo,
      timeFrom,
      timeTo,
      concernDoctor,

      paymentMethod,
    });

    dispatch({
      type: PHYSIOTHERAPY_SAVE_FORM_SUCCESS,
      payload: data,
    });
    // localStorage.setItem("nursingPackageItems", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: PHYSIOTHERAPY_SAVE_FORM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listuserorders = () => async (dispatch) => {
  try {
    dispatch({ type: USER_ORDER_LIST_REQUEST });

    const { data } = await axios.get("/api/physiotherapy/test/");

    dispatch({
      type: USER_ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const physioListPackages = () => async (dispatch) => {
  try {
    dispatch({ type: PHYSIOTHERAPY_PACKAGE_LIST_REQUEST });

    const { data } = await axios.get(`/api/physiotherapy`);

    dispatch({
      type: PHYSIOTHERAPY_PACKAGE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PHYSIOTHERAPY_PACKAGE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const markPayment = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MARK_PAYMENT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/physiotherapy/${id}/payment`,
      {},
      config
    );

    dispatch({
      type: MARK_PAYMENT_SUCCESS,
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
      type: MARK_PAYMENT_FAIL,
      payload: message,
    });
  }
};
