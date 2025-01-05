import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
} from "../constants/testCategoriesConstants";

export const testCategoriesReducer = (
  state = { testCategories: [] },
  action
) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true, testCategories: [] };
    case CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        testCategories: action.payload,
      };
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
