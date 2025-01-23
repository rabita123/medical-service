import axios from '../config/axios';
import {
  MEDICATION_LIST_REQUEST,
  MEDICATION_LIST_SUCCESS,
  MEDICATION_LIST_FAIL,
  MEDICATION_DETAILS_REQUEST,
  MEDICATION_DETAILS_SUCCESS,
  MEDICATION_DETAILS_FAIL,
  MEDICATION_CREATE_REQUEST,
  MEDICATION_CREATE_SUCCESS,
  MEDICATION_CREATE_FAIL,
  PRESCRIPTION_ORDER_CREATE_REQUEST,
  PRESCRIPTION_ORDER_CREATE_SUCCESS,
  PRESCRIPTION_ORDER_CREATE_FAIL,
  PRESCRIPTION_ORDER_LIST_REQUEST,
  PRESCRIPTION_ORDER_LIST_SUCCESS,
  PRESCRIPTION_ORDER_LIST_FAIL,
  PRESCRIPTION_ORDER_DETAILS_REQUEST,
  PRESCRIPTION_ORDER_DETAILS_SUCCESS,
  PRESCRIPTION_ORDER_DETAILS_FAIL,
  PRESCRIPTION_ORDER_STATUS_UPDATE_REQUEST,
  PRESCRIPTION_ORDER_STATUS_UPDATE_SUCCESS,
  PRESCRIPTION_ORDER_STATUS_UPDATE_FAIL,
} from '../constants/pharmacyConstants';

// List all medications
export const listMedications = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MEDICATION_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/pharmacy/medications', config);

    dispatch({
      type: MEDICATION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MEDICATION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get medication details
export const getMedicationDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: MEDICATION_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/pharmacy/medications/${id}`);

    dispatch({
      type: MEDICATION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MEDICATION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Create medication
export const createMedication = (medicationData) => async (dispatch, getState) => {
  try {
    dispatch({ type: MEDICATION_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('/api/pharmacy/medications', medicationData, config);

    dispatch({
      type: MEDICATION_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MEDICATION_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Create prescription order
export const createPrescriptionOrder = (orderData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRESCRIPTION_ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      '/api/pharmacy/prescription-orders',
      orderData,
      config
    );

    dispatch({
      type: PRESCRIPTION_ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRESCRIPTION_ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listPrescriptionOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRESCRIPTION_ORDER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/pharmacy/prescription-orders', config);

    dispatch({
      type: PRESCRIPTION_ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRESCRIPTION_ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPrescriptionOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRESCRIPTION_ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/pharmacy/prescription-orders/${id}`, config);

    dispatch({
      type: PRESCRIPTION_ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRESCRIPTION_ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updatePrescriptionOrderStatus = (orderId, status) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRESCRIPTION_ORDER_STATUS_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/pharmacy/prescription-orders/${orderId}/status`,
      { status },
      config
    );

    dispatch({
      type: PRESCRIPTION_ORDER_STATUS_UPDATE_SUCCESS,
      payload: data,
    });

    // Refresh the order list after status update
    dispatch(listPrescriptionOrders());
  } catch (error) {
    dispatch({
      type: PRESCRIPTION_ORDER_STATUS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}; 