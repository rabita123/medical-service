import axios from "axios";
import config from "../config";
import {
  DOCTOR_LIST_REQUEST,
  DOCTOR_LIST_SUCCESS,
  DOCTOR_LIST_FAIL,
  DOCTOR_DETAILS_REQUEST,
  DOCTOR_DETAILS_SUCCESS,
  DOCTOR_DETAILS_FAIL,
  DOCTOR_UPDATE_REQUEST,
  DOCTOR_UPDATE_SUCCESS,
  DOCTOR_UPDATE_FAIL,
  DOCTOR_LIST_BY_SPECIALITY_REQUEST,
  DOCTOR_LIST_BY_SPECIALITY_SUCCESS,
  DOCTOR_LIST_BY_SPECIALITY_FAIL,
} from "../constants/doctorConstants";

// Create axios instance with base URL
const api = axios.create({
  baseURL: config.NODE_ENV === 'production' ? config.PRODUCTION_API_URL : config.API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log('Received response:', response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    if (error.response) {
      console.error('Error Response Data:', error.response.data);
      console.error('Error Response Status:', error.response.status);
    } else if (error.request) {
      console.error('No response received');
    } else {
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

// Helper function to handle errors
const handleError = (error) => {
  return error.response?.data?.message || error.message || 'An unexpected error occurred';
};

// Helper function to validate doctor data
const validateDoctorData = (data, expectArray = false) => {
  if (!data) {
    throw new Error('No data received from server');
  }
  if (expectArray && !Array.isArray(data)) {
    throw new Error('Invalid response format: expected an array of doctors');
  }
  if (!expectArray && typeof data !== 'object') {
    throw new Error('Invalid response format: expected a doctor object');
  }
  return data;
};

export const listDoctors = () => async (dispatch) => {
  try {
    dispatch({ type: DOCTOR_LIST_REQUEST });
    
    console.log('Fetching doctors list...');
    const { data } = await api.get("/api/doctors");
    console.log('Doctors data received:', data);
    
    if (!data) {
      throw new Error('No data received from server');
    }

    dispatch({
      type: DOCTOR_LIST_SUCCESS,
      payload: Array.isArray(data) ? data : data.doctors || [],
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    dispatch({
      type: DOCTOR_LIST_FAIL,
      payload: error.response?.data?.message || error.message || 'Failed to fetch doctors',
    });
  }
};

export const getDoctorDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DOCTOR_DETAILS_REQUEST });
    const { data } = await api.get(`/api/doctors/${id}`);
    const validatedData = validateDoctorData(data);
    dispatch({
      type: DOCTOR_DETAILS_SUCCESS,
      payload: validatedData,
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_DETAILS_FAIL,
      payload: handleError(error),
    });
  }
};

export const listDoctorsBySpeciality = (specialty) => async (dispatch) => {
  try {
    dispatch({ type: DOCTOR_LIST_BY_SPECIALITY_REQUEST });
    const { data } = await api.get(`/api/doctors/specialty/${specialty}`);
    const validatedData = validateDoctorData(data, true);
    dispatch({
      type: DOCTOR_LIST_BY_SPECIALITY_SUCCESS,
      payload: validatedData,
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_LIST_BY_SPECIALITY_FAIL,
      payload: handleError(error),
    });
  }
};

export const updateDoctor = (doctor) => async (dispatch, getState) => {
  try {
    dispatch({ type: DOCTOR_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    if (!userInfo?.token) {
      throw new Error('User must be logged in to update doctor information');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await api.put(`/api/doctors/${doctor._id}`, doctor, config);
    const validatedData = validateDoctorData(data);
    dispatch({ type: DOCTOR_UPDATE_SUCCESS, payload: validatedData });
  } catch (error) {
    dispatch({
      type: DOCTOR_UPDATE_FAIL,
      payload: handleError(error),
    });
  }
};
