import {
  DOCTOR_LIST_REQUEST,
  DOCTOR_LIST_SUCCESS,
  DOCTOR_LIST_FAIL,
  DOCTOR_DETAILS_REQUEST,
  DOCTOR_DETAILS_SUCCESS,
  DOCTOR_DETAILS_FAIL,
  DOCTOR_DETAILS_RESET,
  DOCTOR_UPDATE_REQUEST,
  DOCTOR_UPDATE_SUCCESS,
  DOCTOR_UPDATE_FAIL,
  DOCTOR_UPDATE_RESET,
  DOCTOR_LIST_BY_SPECIALITY_REQUEST,
  DOCTOR_LIST_BY_SPECIALITY_SUCCESS,
  DOCTOR_LIST_BY_SPECIALITY_FAIL,
  DOCTOR_CREATE_REQUEST,
  DOCTOR_CREATE_SUCCESS,
  DOCTOR_CREATE_FAIL,
  DOCTOR_CREATE_RESET,
  DOCTOR_DELETE_REQUEST,
  DOCTOR_DELETE_SUCCESS,
  DOCTOR_DELETE_FAIL,
} from "../constants/doctorConstants";

const initialDoctorListState = {
  loading: false,
  doctors: [],
  error: null,
  lastUpdated: null
};

export const doctorListReducer = (state = initialDoctorListState, action) => {
  switch (action.type) {
    case DOCTOR_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DOCTOR_LIST_SUCCESS:
      return {
        loading: false,
        doctors: action.payload,
        error: null,
        lastUpdated: new Date().toISOString()
      };
    case DOCTOR_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        lastUpdated: new Date().toISOString()
      };
    default:
      return state;
  }
};

const initialDoctorDetailsState = {
  loading: false,
  doctor: null,
  error: null,
  lastUpdated: null
};

export const doctorDetailsReducer = (state = initialDoctorDetailsState, action) => {
  switch (action.type) {
    case DOCTOR_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DOCTOR_DETAILS_SUCCESS:
      return {
        loading: false,
        doctor: action.payload,
        error: null,
        lastUpdated: new Date().toISOString()
      };
    case DOCTOR_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        lastUpdated: new Date().toISOString()
      };
    case DOCTOR_DETAILS_RESET:
      return initialDoctorDetailsState;
    default:
      return state;
  }
};

const initialDoctorUpdateState = {
  loading: false,
  doctor: null,
  success: false,
  error: null,
  lastUpdated: null
};

export const doctorUpdateReducer = (state = initialDoctorUpdateState, action) => {
  switch (action.type) {
    case DOCTOR_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null
      };
    case DOCTOR_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        doctor: action.payload,
        error: null,
        lastUpdated: new Date().toISOString()
      };
    case DOCTOR_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
        lastUpdated: new Date().toISOString()
      };
    case DOCTOR_UPDATE_RESET:
      return initialDoctorUpdateState;
    default:
      return state;
  }
};

const initialDoctorListBySpecialityState = {
  loading: false,
  doctors: [],
  error: null,
  lastUpdated: null
};

export const doctorListBySpecialityReducer = (state = initialDoctorListBySpecialityState, action) => {
  switch (action.type) {
    case DOCTOR_LIST_BY_SPECIALITY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DOCTOR_LIST_BY_SPECIALITY_SUCCESS:
      return {
        loading: false,
        doctors: action.payload,
        error: null,
        lastUpdated: new Date().toISOString()
      };
    case DOCTOR_LIST_BY_SPECIALITY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        lastUpdated: new Date().toISOString()
      };
    default:
      return state;
  }
};

const initialDoctorDeleteState = {
  loading: false,
  success: false,
  error: null,
  lastUpdated: null
};

export const doctorDeleteReducer = (state = initialDoctorDeleteState, action) => {
  switch (action.type) {
    case DOCTOR_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null
      };
    case DOCTOR_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
        lastUpdated: new Date().toISOString()
      };
    case DOCTOR_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
        lastUpdated: new Date().toISOString()
      };
    default:
      return state;
  }
};

const initialDoctorCreateState = {
  loading: false,
  success: false,
  doctor: null,
  error: null,
  lastUpdated: null
};

export const doctorCreateReducer = (state = initialDoctorCreateState, action) => {
  switch (action.type) {
    case DOCTOR_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null
      };
    case DOCTOR_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        doctor: action.payload,
        error: null,
        lastUpdated: new Date().toISOString()
      };
    case DOCTOR_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
        lastUpdated: new Date().toISOString()
      };
    case DOCTOR_CREATE_RESET:
      return initialDoctorCreateState;
    default:
      return state;
  }
};
