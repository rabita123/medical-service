import axios from "axios";
import {
  NURSING_PACKAGE_LIST_REQUEST,
  NURSING_PACKAGE_LIST_SUCCESS,
  NURSING_PACKAGE_LIST_FAIL,
  NURSING_PACKAGE_TYPE_REQUEST,
  NURSING_PACKAGE_TYPE_SUCCESS,
  NURSING_PACKAGE_TYPE_FAIL,
  NURSING_PACKAGE_SAVE_FORM_REQUEST,
  NURSING_PACKAGE_SAVE_FORM_SUCCESS,
  NURSING_PACKAGE_SAVE_FORM_FAIL,
  NURSING_PACKAGE_FORM_DATA_REQUEST,
  NURSING_PACKAGE_FORM_DATA_SUCCESS,
  NURSING_PACKAGE_FORM_DATA_FAIL,
  NURSING_PACKAGE_DATA_BY_ID_REQUEST,
  NURSING_PACKAGE_DATA_BY_ID_SUCCESS,
  NURSING_PACKAGE_DATA_BY_ID_FAIL,
} from "../constants/nursingPackageConstants";

export const nursingListPackages = () => async (dispatch) => {
  try {
    dispatch({ type: NURSING_PACKAGE_LIST_REQUEST });

    const { data } = await axios.get(`/api/allnursingpackages`);

    dispatch({
      type: NURSING_PACKAGE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NURSING_PACKAGE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const nursingListPackagesByType = (id) => async (dispatch) => {
  try {
    dispatch({ type: NURSING_PACKAGE_TYPE_REQUEST });

    const { data } = await axios.get(`/api/allnursingpackages/${id}`);

    //const { data } = await axios.get('/api/doctors/5fabcaa30008e835e87000bd')

    dispatch({
      type: NURSING_PACKAGE_TYPE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NURSING_PACKAGE_TYPE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const nursingPackageSaveForm = (
  name,
  nursingPackageId,
  phone,
  age,
  address,
  gender,
  bloodGroup,
  diagnosis,
  concernDoctor,
  addPrescription,
  paymentMethod,
  promoCode
) => async (dispatch) => {
  try {
    dispatch({
      type: NURSING_PACKAGE_SAVE_FORM_REQUEST,
    });

    const { data } = await axios.post("/api/allnursingpackages/save-form/", {
      name,
      nursingPackageId,
      phone,
      age,
      address,
      gender,
      bloodGroup,
      diagnosis,
      concernDoctor,
      addPrescription,
      paymentMethod,
      promoCode,
    });

    dispatch({
      type: NURSING_PACKAGE_SAVE_FORM_SUCCESS,
      payload: data,
    });
    localStorage.setItem("nursingPackageItems", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: NURSING_PACKAGE_SAVE_FORM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const nursingPackagesFormData = () => async (dispatch) => {
  try {
    dispatch({ type: NURSING_PACKAGE_FORM_DATA_REQUEST });

    const { data } = await axios.get("/api/nursingpackagesdata/");

    dispatch({
      type: NURSING_PACKAGE_FORM_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NURSING_PACKAGE_FORM_DATA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const nursingPackagesDataById = (id) => async (dispatch) => {
  try {
    dispatch({ type: NURSING_PACKAGE_DATA_BY_ID_REQUEST });

    const { data } = await axios.get(`/api/nursingpackagesdata/${id}`);
    // const { data } = await axios.get(
    //   "/api/nursingpackagesdata/5fe8319136c7d645189c16d6"
    // );

    dispatch({
      type: NURSING_PACKAGE_DATA_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NURSING_PACKAGE_DATA_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
