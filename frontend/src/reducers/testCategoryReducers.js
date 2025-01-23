import {
  TEST_CATEGORY_LIST_REQUEST,
  TEST_CATEGORY_LIST_SUCCESS,
  TEST_CATEGORY_LIST_FAIL,
} from '../constants/testCategoryConstants';

export const testCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case TEST_CATEGORY_LIST_REQUEST:
      return { loading: true, categories: [] };
    case TEST_CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case TEST_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}; 