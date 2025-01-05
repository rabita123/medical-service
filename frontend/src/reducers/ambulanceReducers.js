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

export const ambulanceListReducer = (state = { ambulances: [] }, action) => {
  switch (action.type) {
    case AMBULANCE_REQUEST:
      return { loading: true, ambulances: [] };
    case AMBULANCE_SUCCESS:
      return {
        loading: false,
        ambulances: action.payload,
      };
    case AMBULANCE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ambulanceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case AMBULANCE_DELETE_REQUEST:
      return { loading: true };
    case AMBULANCE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case AMBULANCE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ambulanceCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case AMBULANCE_CREATE_REQUEST:
      return { loading: true };
    case AMBULANCE_CREATE_SUCCESS:
      return { loading: false, success: true, specialists: action.payload };
    case AMBULANCE_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const ambulanceDetailsReducer = (
  state = { ambulancedetails: {} },
  action
) => {
  switch (action.type) {
    case AMBULANCE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case AMBULANCE_DETAILS_SUCCESS:
      return { loading: false, ambulancedetails: action.payload };
    case AMBULANCE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case AMBULANCE_DETAILS_RESET:
      return { ambulancedetails: {} };
    default:
      return state;
  }
};

export const ambulanceUpdateReducer = (
  state = { ambulanceupdates: {} },
  action
) => {
  switch (action.type) {
    case AMBULANCE_UPDATE_REQUEST:
      return { loading: true };
    case AMBULANCE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case AMBULANCE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case AMBULANCE_UPDATE_RESET:
      return {
        ambulanceupdates: {},
      };
    default:
      return state;
  }
};
