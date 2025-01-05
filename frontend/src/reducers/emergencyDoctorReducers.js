import {
  EMERGENCY_DOCTOR_CREATE_REQUEST,
  EMERGENCY_DOCTOR_CREATE_SUCCESS,
  EMERGENCY_DOCTOR_CREATE_FAIL,
  EMERGENCY_DOCTOR_DETAILS_REQUEST,
  EMERGENCY_DOCTOR_DETAILS_SUCCESS,
  EMERGENCY_DOCTOR_DETAILS_FAIL,
  EMERGENCY_DOCTOR_DETAILS_RESET,
  EMERGENCY_DOCTOR_UPDATE_REQUEST,
  EMERGENCY_DOCTOR_UPDATE_SUCCESS,
  EMERGENCY_DOCTOR_UPDATE_FAIL,
  EMERGENCY_DOCTOR_UPDATE_RESET,
  EMERGENCY_DOCTOR_LIST_REQUEST,
  EMERGENCY_DOCTOR_LIST_SUCCESS,
  EMERGENCY_DOCTOR_LIST_FAIL,
} from "../constants/emergencyDoctorConstants";

export const emergencyDoctorListReducer = (
  state = { emergencydoctors: [] },
  action
) => {
  switch (action.type) {
    case EMERGENCY_DOCTOR_LIST_REQUEST:
      return { loading: true, emergencydoctors: [] };
    case EMERGENCY_DOCTOR_LIST_SUCCESS:
      return {
        loading: false,
        emergencydoctors: action.payload,
      };
    case EMERGENCY_DOCTOR_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const emergencyDoctorCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EMERGENCY_DOCTOR_CREATE_REQUEST:
      return { loading: true };
    case EMERGENCY_DOCTOR_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        emergencydoctors: action.payload,
      };
    case EMERGENCY_DOCTOR_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const emergencyDoctorDetailsReducer = (
  state = { emergencydoctordetails: {} },
  action
) => {
  switch (action.type) {
    case EMERGENCY_DOCTOR_DETAILS_REQUEST:
      return { ...state, loading: true };
    case EMERGENCY_DOCTOR_DETAILS_SUCCESS:
      return { loading: false, emergencydoctordetails: action.payload };
    case EMERGENCY_DOCTOR_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case EMERGENCY_DOCTOR_DETAILS_RESET:
      return { emergencydoctordetails: {} };
    default:
      return state;
  }
};

export const emergencyDoctorUpdateReducer = (
  state = { emergencydoctorupdates: {} },
  action
) => {
  switch (action.type) {
    case EMERGENCY_DOCTOR_UPDATE_REQUEST:
      return { loading: true };
    case EMERGENCY_DOCTOR_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case EMERGENCY_DOCTOR_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case EMERGENCY_DOCTOR_UPDATE_RESET:
      return {
        emergencydoctorupdates: {},
      };
    default:
      return state;
  }
};
