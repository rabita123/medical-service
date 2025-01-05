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

export const sliderListReducer = (state = { sliders: [] }, action) => {
  switch (action.type) {
    case 'SLIDER_LIST_REQUEST':
      return { loading: true, sliders: [] };
    case 'SLIDER_LIST_SUCCESS':
      return { loading: false, sliders: action.payload };
    case 'SLIDER_LIST_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sliderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SLIDER_DELETE_REQUEST:
      return { loading: true };
    case SLIDER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SLIDER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sliderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SLIDER_CREATE_REQUEST:
      return { loading: true };
    case SLIDER_CREATE_SUCCESS:
      return { loading: false, success: true, sliders: action.payload };
    case SLIDER_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const sliderDetailsReducer = (state = { sliderdetails: {} }, action) => {
  switch (action.type) {
    case SLIDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case SLIDER_DETAILS_SUCCESS:
      return { loading: false, sliderdetails: action.payload };
    case SLIDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case SLIDER_DETAILS_RESET:
      return { sliderdetails: {} };
    default:
      return state;
  }
};

export const sliderUpdateReducer = (state = { sliderupdates: {} }, action) => {
  switch (action.type) {
    case SLIDER_UPDATE_REQUEST:
      return { loading: true };
    case SLIDER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case SLIDER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SLIDER_UPDATE_RESET:
      return {
        sliderupdates: {},
      };
    default:
      return state;
  }
};
