import {
  SPECIALIST_REQUEST,
  SPECIALIST_SUCCESS,
  SPECIALIST_FAIL,
  SPECIALIST_DELETE_REQUEST,
  SPECIALIST_DELETE_SUCCESS,
  SPECIALIST_DELETE_FAIL,
  SPECIALIST_CREATE_REQUEST,
  SPECIALIST_CREATE_SUCCESS,
  SPECIALIST_CREATE_FAIL,
  SPECIALIST_DETAILS_REQUEST,
  SPECIALIST_DETAILS_SUCCESS,
  SPECIALIST_DETAILS_FAIL,
  SPECIALIST_DETAILS_RESET,
  SPECIALIST_UPDATE_REQUEST,
  SPECIALIST_UPDATE_SUCCESS,
  SPECIALIST_UPDATE_FAIL,
  SPECIALIST_UPDATE_RESET,
} from "../constants/specialistConstants";

export const specialistReducer = (state = { specialists: [] }, action) => {
  switch (action.type) {
    case 'SPECIALIST_LIST_REQUEST':
      return { loading: true, specialists: [] };
    case 'SPECIALIST_LIST_SUCCESS':
      return { loading: false, specialists: action.payload };
    case 'SPECIALIST_LIST_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const specialistDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SPECIALIST_DELETE_REQUEST:
      return { loading: true };
    case SPECIALIST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SPECIALIST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const specialistCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SPECIALIST_CREATE_REQUEST:
      return { loading: true };
    case SPECIALIST_CREATE_SUCCESS:
      return { loading: false, success: true, specialists: action.payload };
    case SPECIALIST_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const specialistDetailsReducer = (
  state = { specialistdetails: {} },
  action
) => {
  switch (action.type) {
    case SPECIALIST_DETAILS_REQUEST:
      return { ...state, loading: true };
    case SPECIALIST_DETAILS_SUCCESS:
      return { loading: false, specialistdetails: action.payload };
    case SPECIALIST_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case SPECIALIST_DETAILS_RESET:
      return { specialistdetails: {} };
    default:
      return state;
  }
};

export const specialistUpdateReducer = (
  state = { specialistupdates: {} },
  action
) => {
  switch (action.type) {
    case SPECIALIST_UPDATE_REQUEST:
      return { loading: true };
    case SPECIALIST_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case SPECIALIST_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SPECIALIST_UPDATE_RESET:
      return {
        specialistupdates: {},
      };
    default:
      return state;
  }
};
