import axios from "../axios";
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
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000
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
    console.log('Response received:', response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    if (error.response) {
      console.error('Error Response:', error.response.data);
    } else if (error.request) {
      console.error('No response received');
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
    const response = await axios.get("/api/doctors");
    console.log('Raw API response:', response);
    
    let doctorsData = response.data;
    console.log('Response data:', doctorsData);

    // Ensure we have an array of doctors
    if (!Array.isArray(doctorsData)) {
      if (typeof doctorsData === 'object' && doctorsData !== null) {
        doctorsData = doctorsData.doctors || [doctorsData];
      } else {
        doctorsData = [];
      }
    }

    // Validate each doctor object
    doctorsData = doctorsData.map(doctor => ({
      _id: doctor._id || '',
      name: doctor.name || '',
      image: doctor.image || '/assets/img/doctors/doctor-thumb-01.jpg',
      fees: doctor.fees || '',
      location: doctor.location || '',
      degree: doctor.degree || '',
      specialization: doctor.specialization || '',
      days: doctor.days || '',
      times: doctor.times || '',
      rating: doctor.rating || '4.5',
      experience: doctor.experience || '5+'
    }));

    console.log('Processed doctors data:', doctorsData);

    dispatch({
      type: DOCTOR_LIST_SUCCESS,
      payload: doctorsData,
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    console.error('Error details:', {
      message: error.message,
      response: error.response,
      request: error.request,
    });
    
    let errorMessage = 'Failed to fetch doctors';
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    dispatch({
      type: DOCTOR_LIST_FAIL,
      payload: errorMessage,
    });
  }
};

export const getDoctorDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DOCTOR_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/doctors/${id}`);
    dispatch({
      type: DOCTOR_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_DETAILS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const listDoctorsBySpeciality = (specialty) => async (dispatch) => {
  try {
    dispatch({ type: DOCTOR_LIST_BY_SPECIALITY_REQUEST });
    const { data } = await axios.get(`/api/doctors/specialty/${specialty}`);
    dispatch({
      type: DOCTOR_LIST_BY_SPECIALITY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_LIST_BY_SPECIALITY_FAIL,
      payload: error.response?.data?.message || error.message,
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

    const { data } = await axios.put(`/api/doctors/${doctor._id}`, doctor, config);
    const validatedData = validateDoctorData(data);
    dispatch({ type: DOCTOR_UPDATE_SUCCESS, payload: validatedData });
  } catch (error) {
    dispatch({
      type: DOCTOR_UPDATE_FAIL,
      payload: handleError(error),
    });
  }
};
