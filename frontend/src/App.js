import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import { CircularProgress } from '@mui/material';
import DoctorListScreen from './screens/DoctorListScreen';

// Lazy load components
const HomeScreen = React.lazy(() => import('./screens/HomeScreen'));
const LoginScreen = React.lazy(() => import('./screens/login/LoginScreen'));
const RegisterScreen = React.lazy(() => import('./screens/register/RegisterScreen'));
const DoctorProfileScreen = React.lazy(() => import('./screens/doctorPages/DoctorProfileScreen'));
const BookingAppointmentScreen = React.lazy(() => import('./screens/appointmentPages/BookingAppointmentScreen'));
const BookingSuccessScreen = React.lazy(() => import('./screens/BookingSuccessScreen'));
const TestsScreen = React.lazy(() => import('./screens/TestsScreen'));
const TestBookingScreen = React.lazy(() => import('./screens/TestBookingScreen'));
const MyTestBookingsScreen = React.lazy(() => import('./screens/MyTestBookingsScreen'));
const RescheduleSuccessScreen = React.lazy(() => import('./screens/RescheduleSuccessScreen'));
const AdminDashboardScreen = React.lazy(() => import('./screens/admin/AdminDashboardScreen'));
const AdminTestsScreen = React.lazy(() => import('./screens/admin/AdminTestsScreen'));
const AdminBookingsScreen = React.lazy(() => import('./screens/admin/AdminBookingsScreen'));
const AdminUsersScreen = React.lazy(() => import('./screens/admin/AdminUsersScreen'));
const PharmacyScreen = React.lazy(() => import('./screens/pharmacy/PharmacyScreen'));
const MedicationOrderScreen = React.lazy(() => import('./screens/pharmacy/MedicationOrderScreen'));
const AdminPharmacyScreen = React.lazy(() => import('./screens/admin/AdminPharmacyScreen'));
const AdminRoute = React.lazy(() => import('./components/AdminRoute'));
const DoctorsBySpecialtyScreen = React.lazy(() => import('./screens/doctorPages/DoctorsBySpecialtyScreen'));
const PrescriptionOrderScreen = React.lazy(() => import('./screens/pharmacy/PrescriptionOrderScreen'));
const PrescriptionSuccessScreen = React.lazy(() => import('./screens/pharmacy/PrescriptionSuccessScreen'));
const PrescriptionOrderListScreen = React.lazy(() => import('./screens/pharmacy/PrescriptionOrderListScreen'));
const AdminPrescriptionOrdersScreen = React.lazy(() => import('./screens/admin/AdminPrescriptionOrdersScreen'));
const AddPrescriptionOrderScreen = React.lazy(() => import('./screens/pharmacy/AddPrescriptionOrderScreen'));

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <main className="main-content">
          <Suspense fallback={<CircularProgress />}>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/doctor/:id" element={<DoctorProfileScreen />} />
              <Route path="/booking-appointment/:id" element={<BookingAppointmentScreen />} />
              <Route path="/booking-success" element={<BookingSuccessScreen />} />
              <Route path="/tests" element={<TestsScreen />} />
              <Route path="/test/:id" element={<TestBookingScreen />} />
              <Route path="/my-test-bookings" element={<MyTestBookingsScreen />} />
              <Route path="/reschedule-success" element={<RescheduleSuccessScreen />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminRoute><AdminDashboardScreen /></AdminRoute>} />
              <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboardScreen /></AdminRoute>} />
              <Route path="/admin/tests" element={<AdminRoute><AdminTestsScreen /></AdminRoute>} />
              <Route path="/admin/bookings" element={<AdminRoute><AdminBookingsScreen /></AdminRoute>} />
              <Route path="/admin/users" element={<AdminRoute><AdminUsersScreen /></AdminRoute>} />
              <Route path="/admin/pharmacy" element={<AdminRoute><AdminPharmacyScreen /></AdminRoute>} />
              <Route path="/admin/medication/:id/edit" element={<AdminRoute><AdminPharmacyScreen /></AdminRoute>} />
              
              {/* Pharmacy Routes */}
              <Route path="/pharmacy" element={<PharmacyScreen />} />
              <Route path="/pharmacy/order/:id" element={<MedicationOrderScreen />} />
              <Route path="/doctors/specialty/:specialty" element={<DoctorsBySpecialtyScreen />} />
              <Route path="/prescription-order" element={<PrescriptionOrderScreen />} />
              <Route path="/prescription-success" element={<PrescriptionSuccessScreen />} />
              <Route path="/prescription-orders" element={<PrescriptionOrderListScreen />} />
              <Route path="/admin/prescription-orders" element={<AdminRoute><AdminPrescriptionOrdersScreen /></AdminRoute>} />
              <Route path="/admin/prescription-orders/add" element={<AdminRoute><AddPrescriptionOrderScreen /></AdminRoute>} />
              <Route path="/doctors" element={<DoctorListScreen />} />
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>

      <style>
        {`
          .app-wrapper {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            background-color: #f8f9fa;
          }

          .main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            margin-top: 60px;
          }

          .main-content > *:last-child {
            margin-bottom: 0;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0;
          }

          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }

          ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}
      </style>
    </BrowserRouter>
  );
}

export default App;

