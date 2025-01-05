import axios from "axios";
import {
  MEDICINE_LIST_REQUEST,
  MEDICINE_LIST_SUCCESS,
  MEDICINE_LIST_FAIL,
} from "../constants/medicineConstants";

export const listAllMedicines = () => async (dispatch) => {
  try {
    dispatch({ type: MEDICINE_LIST_REQUEST });

    const { data } = await axios.get("/api/allmedicines");

    dispatch({
      type: MEDICINE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MEDICINE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
