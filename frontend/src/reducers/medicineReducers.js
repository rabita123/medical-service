import {
  MEDICINE_LIST_REQUEST,
  MEDICINE_LIST_SUCCESS,
  MEDICINE_LIST_FAIL,
  MEDICINE_LIST_RESET,
} from "../constants/medicineConstants";

export const medicineListReducer = (state = { allmedicines: [] }, action) => {
  switch (action.type) {
    case MEDICINE_LIST_REQUEST:
      return { loading: true, allmedicines: [] };
    case MEDICINE_LIST_SUCCESS:
      return {
        loading: false,
        allmedicines: action.payload,
      };
    case MEDICINE_LIST_FAIL:
      return { loading: false, error: action.payload };

    case MEDICINE_LIST_RESET:
      return { allmedicines: {} };
    default:
      return state;
  }
};
