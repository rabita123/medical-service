import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers';

import { specialistReducer } from './reducers/specialistReducers';

import { sliderListReducer } from './reducers/sliderReducers';

import {
  doctorListReducer,
  doctorDetailsReducer,
  doctorCreateReducer,
  doctorUpdateReducer,
  doctorDeleteReducer,
  doctorListBySpecialityReducer,
} from './reducers/doctorReducers';

import {
  testListReducer,
  testDetailsReducer,
  testDeleteReducer,
  testCreateReducer,
  testUpdateReducer,
  testBookingReducer,
  testBookingListReducer,
  testBookingCancelReducer,
} from './reducers/testReducers';

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListReducer,
  orderDeliverReducer,
  orderDeleteReducer,
  orderUserDetailsReducer,
  appointmentCreateReducer,
  appointmentDetailsReducer,
  medicineOrderCreateReducer,
} from './reducers/orderReducers';

import {
  medicationListReducer,
  medicationDetailsReducer,
  medicationCreateReducer,
  prescriptionOrderCreateReducer,
  prescriptionOrderListReducer,
  prescriptionOrderDetailsReducer,
  prescriptionOrderStatusUpdateReducer,
} from './reducers/pharmacyReducers';

import { testCategoriesReducer } from './reducers/testCategoryReducers';
import { doctorProfileListReducer } from './reducers/doctorProfileReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  specialistList: specialistReducer,
  sliderList: sliderListReducer,
  testCategories: testCategoriesReducer,
  doctorProfileList: doctorProfileListReducer,
  doctorList: doctorListReducer,
  doctorDetails: doctorDetailsReducer,
  doctorCreate: doctorCreateReducer,
  doctorUpdate: doctorUpdateReducer,
  doctorDelete: doctorDeleteReducer,
  doctorListBySpeciality: doctorListBySpecialityReducer,
  testList: testListReducer,
  testDetails: testDetailsReducer,
  testDelete: testDeleteReducer,
  testCreate: testCreateReducer,
  testUpdate: testUpdateReducer,
  testBooking: testBookingReducer,
  testBookingList: testBookingListReducer,
  testBookingCancel: testBookingCancelReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,
  orderDelete: orderDeleteReducer,
  orderUserDetails: orderUserDetailsReducer,
  appointmentCreate: appointmentCreateReducer,
  appointmentDetails: appointmentDetailsReducer,
  medicineOrderCreate: medicineOrderCreateReducer,
  medicationList: medicationListReducer,
  medicationDetails: medicationDetailsReducer,
  medicationCreate: medicationCreateReducer,
  prescriptionOrderCreate: prescriptionOrderCreateReducer,
  prescriptionOrderList: prescriptionOrderListReducer,
  prescriptionOrderDetails: prescriptionOrderDetailsReducer,
  prescriptionOrderStatusUpdate: prescriptionOrderStatusUpdateReducer,
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
