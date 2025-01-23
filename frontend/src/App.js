import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/login/LoginScreen';
import RegisterScreen from './screens/register/RegisterScreen';
import DoctorProfileScreen from './screens/doctorPages/DoctorProfileScreen';
import BookingAppointmentScreen from './screens/appointmentPages/BookingAppointmentScreen';
import BookingSuccessScreen from './screens/BookingSuccessScreen';
import TestsScreen from './screens/TestsScreen';
import TestBookingScreen from './screens/TestBookingScreen';
import MyTestBookingsScreen from './screens/MyTestBookingsScreen';
import RescheduleSuccessScreen from './screens/RescheduleSuccessScreen';
import AdminDashboardScreen from './screens/admin/AdminDashboardScreen';
import AdminTestsScreen from './screens/admin/AdminTestsScreen';
import AdminBookingsScreen from './screens/admin/AdminBookingsScreen';
import AdminUsersScreen from './screens/admin/AdminUsersScreen';
import PharmacyScreen from './screens/pharmacy/PharmacyScreen';
import MedicationOrderScreen from './screens/pharmacy/MedicationOrderScreen';
import AdminPharmacyScreen from './screens/admin/AdminPharmacyScreen';
import AdminRoute from './components/AdminRoute';
import DoctorsBySpecialtyScreen from './screens/doctorPages/DoctorsBySpecialtyScreen';
import PrescriptionOrderScreen from './screens/pharmacy/PrescriptionOrderScreen';
import PrescriptionSuccessScreen from './screens/pharmacy/PrescriptionSuccessScreen';
import PrescriptionOrderListScreen from './screens/pharmacy/PrescriptionOrderListScreen';
import AdminPrescriptionOrdersScreen from './screens/admin/AdminPrescriptionOrdersScreen';
import AddPrescriptionOrderScreen from './screens/pharmacy/AddPrescriptionOrderScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/register-user" element={<RegisterScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/doctor/:id" element={<DoctorProfileScreen />} />
            <Route path="/booking-appointment/:id" element={<BookingAppointmentScreen />} />
            <Route path="/booking-success" element={<BookingSuccessScreen />} />
            <Route path="/tests" element={<TestsScreen />} />
            <Route path="/test/:id" element={<TestBookingScreen />} />
            <Route path="/my-test-bookings" element={<MyTestBookingsScreen />} />
            <Route path="/reschedule-success" element={<RescheduleSuccessScreen />} />
            <Route path="/admin" element={<AdminRoute><AdminDashboardScreen /></AdminRoute>} />
            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboardScreen /></AdminRoute>} />
            <Route path="/admin/tests" element={<AdminRoute><AdminTestsScreen /></AdminRoute>} />
            <Route path="/admin/bookings" element={<AdminRoute><AdminBookingsScreen /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><AdminUsersScreen /></AdminRoute>} />
            <Route path="/admin/pharmacy" element={<AdminRoute><AdminPharmacyScreen /></AdminRoute>} />
            <Route path="/admin/medication/:id/edit" element={<AdminRoute><AdminPharmacyScreen /></AdminRoute>} />
            <Route path="/pharmacy" element={<PharmacyScreen />} />
            <Route path="/pharmacy/order/:id" element={<MedicationOrderScreen />} />
            <Route path="/doctors/specialty/:specialty" element={<DoctorsBySpecialtyScreen />} />
            <Route path="/prescription-order" element={<PrescriptionOrderScreen />} />
            <Route path="/prescription-success" element={<PrescriptionSuccessScreen />} />
            <Route path="/prescription-orders" element={<PrescriptionOrderListScreen />} />
            <Route path="/admin/prescription-orders" element={<AdminRoute><AdminPrescriptionOrdersScreen /></AdminRoute>} />
            <Route path="/admin/prescription-orders/add" element={<AdminRoute><AddPrescriptionOrderScreen /></AdminRoute>} />
          </Routes>
        </Container>
      </main>
    </Router>
  );
}

export default App;

