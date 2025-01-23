import axios from 'axios';
import {
  TEST_CATEGORY_LIST_REQUEST,
  TEST_CATEGORY_LIST_SUCCESS,
  TEST_CATEGORY_LIST_FAIL,
} from '../constants/testCategoryConstants';

export const listTestCategories = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TEST_CATEGORY_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/testcategories', config);
    console.log('Categories fetched:', data);

    dispatch({
      type: TEST_CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    dispatch({
      type: TEST_CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}; 