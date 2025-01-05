import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  doctorListReducer,
  doctorDetailsReducer,
} from "./reducers/doctorReducers";
import { specialistReducer } from "./reducers/specialistReducers";
import { sliderListReducer } from "./reducers/sliderReducers";
import { testCategoriesReducer } from "./reducers/testCategoriesReducers";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import { doctorProfileListReducer } from "./reducers/doctorProfileReducers";
import {
  testListReducer,
  testDetailsReducer,
  testBookingReducer,
  testBookingListReducer,
  testBookingCancelReducer,
  testBookingRescheduleReducer,
} from './reducers/testReducers';

const reducer = combineReducers({
  doctorList: doctorListReducer,
  doctorDetails: doctorDetailsReducer,
  specialistList: specialistReducer,
  sliderList: sliderListReducer,
  testCategories: testCategoriesReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  doctorProfileList: doctorProfileListReducer,
  testList: testListReducer,
  testDetails: testDetailsReducer,
  testBooking: testBookingReducer,
  testBookingList: testBookingListReducer,
  testBookingCancel: testBookingCancelReducer,
  testBookingReschedule: testBookingRescheduleReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
