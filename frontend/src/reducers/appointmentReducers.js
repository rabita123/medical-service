import {
  APPOINTMENT_LIST_REQUEST,
  APPOINTMENT_LIST_SUCCESS,
  APPOINTMENT_LIST_FAIL,
} from "../constants/appointmentConstants";

export const appointmentListReducer = (
  state = { appointments: [] },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_LIST_REQUEST:
      return { loading: true, appointments: [] };
    case APPOINTMENT_LIST_SUCCESS:
      return {
        loading: false,
        appointments: action.payload,
      };
    case APPOINTMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
