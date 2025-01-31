import { combineReducers } from '@reduxjs/toolkit';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './userReducers';
import { specialistReducer } from './specialistReducers';
import { sliderListReducer } from './sliderReducers';
import {
  doctorListReducer,
  doctorDetailsReducer,
  doctorUpdateReducer,
  doctorListBySpecialityReducer,
} from './doctorReducers';
import {
  testListReducer,
  testDetailsReducer,
  testDeleteReducer,
  testCreateReducer,
  testUpdateReducer,
  testBookingReducer,
  testBookingListReducer,
  testBookingCancelReducer,
} from './testReducers';
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
} from './orderReducers';
import {
  medicationListReducer,
  medicationDetailsReducer,
  medicationCreateReducer,
  prescriptionOrderCreateReducer,
  prescriptionOrderListReducer,
  prescriptionOrderDetailsReducer,
  prescriptionOrderStatusUpdateReducer,
} from './pharmacyReducers';
import { testCategoriesReducer } from './testCategoryReducers';
import { doctorProfileListReducer } from './doctorProfileReducers';

const rootReducer = combineReducers({
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
  doctorUpdate: doctorUpdateReducer,
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

export default rootReducer; 