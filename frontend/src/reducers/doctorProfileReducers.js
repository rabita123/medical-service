import {
  DOCTOR_PROFILE_REQUEST,
  DOCTOR_PROFILE_SUCCESS,
  DOCTOR_PROFILE_FAIL,
} from "../constants/doctorProfileConstants";

export const doctorProfileListReducer = (
  state = { loading: true, doctorsprofiles: { education: {}, doctor_id: {} } },

  action
) => {
  switch (action.type) {
    case DOCTOR_PROFILE_REQUEST:
      return { ...state, loading: true };
    case DOCTOR_PROFILE_SUCCESS:
      return {
        loading: false,
        doctorsprofiles: action.payload,
      };
    case DOCTOR_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
