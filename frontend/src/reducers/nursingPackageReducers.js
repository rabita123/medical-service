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

export const nursingPackageListReducer = (
  state = { nursingpackages: [] },
  action
) => {
  switch (action.type) {
    case NURSING_PACKAGE_LIST_REQUEST:
      return { loading: true, nursingpackages: [] };
    case NURSING_PACKAGE_LIST_SUCCESS:
      return {
        loading: false,
        nursingpackages: action.payload,
      };
    case NURSING_PACKAGE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const nursingPackageListByTypeReducer = (
  state = { nursingpackagesbytype: [] },
  action
) => {
  switch (action.type) {
    case NURSING_PACKAGE_TYPE_REQUEST:
      return { loading: true, nursingpackagesbytype: [] };
    case NURSING_PACKAGE_TYPE_SUCCESS:
      return {
        loading: false,
        nursingpackagesbytype: action.payload,
      };
    case NURSING_PACKAGE_TYPE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const nursingPackageFormReducer = (
  state = { nursingpackagesform: [] },
  action
) => {
  switch (action.type) {
    case NURSING_PACKAGE_SAVE_FORM_REQUEST:
      return { loading: true, nursingpackagesform: [] };
    case NURSING_PACKAGE_SAVE_FORM_SUCCESS:
      return {
        loading: false,
        nursingpackagesform: action.payload,
      };
    case NURSING_PACKAGE_SAVE_FORM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const nursingPackageFormDataReducer = (
  state = { nursingpackagesformdata: [] },
  action
) => {
  switch (action.type) {
    case NURSING_PACKAGE_FORM_DATA_REQUEST:
      return { loading: true, nursingpackagesformdata: [] };
    case NURSING_PACKAGE_FORM_DATA_SUCCESS:
      return {
        loading: false,

        nursingpackagesformdata: action.payload,
      };
    case NURSING_PACKAGE_FORM_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const nursingPackageDataByIdReducer = (
  state = { nursingpackagesdatabyid: [] },
  action
) => {
  switch (action.type) {
    case NURSING_PACKAGE_DATA_BY_ID_REQUEST:
      return { loading: true, nursingpackagesdatabyid: [] };
    case NURSING_PACKAGE_DATA_BY_ID_SUCCESS:
      return {
        loading: false,

        nursingpackagesdatabyid: action.payload,
      };
    case NURSING_PACKAGE_DATA_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
