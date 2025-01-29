import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import { CommonLoading } from 'react-loadingg';
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
          <Suspense fallback={<CommonLoading />}>
            <Switch>
              <Route exact path="/" component={HomeScreen} />
              <Route exact path="/login" component={LoginScreen} />
              <Route exact path="/register" component={RegisterScreen} />
              <Route exact path="/doctor/:id" component={DoctorProfileScreen} />
              <Route exact path="/booking-appointment/:id" component={BookingAppointmentScreen} />
              <Route exact path="/booking-success" component={BookingSuccessScreen} />
              <Route exact path="/tests" component={TestsScreen} />
              <Route exact path="/test/:id" component={TestBookingScreen} />
              <Route exact path="/my-test-bookings" component={MyTestBookingsScreen} />
              <Route exact path="/reschedule-success" component={RescheduleSuccessScreen} />
              <Route exact path="/admin" render={props => (
                <AdminRoute>
                  <AdminDashboardScreen {...props} />
                </AdminRoute>
              )} />
              <Route exact path="/admin/dashboard" render={props => (
                <AdminRoute>
                  <AdminDashboardScreen {...props} />
                </AdminRoute>
              )} />
              <Route exact path="/admin/tests" render={props => (
                <AdminRoute>
                  <AdminTestsScreen {...props} />
                </AdminRoute>
              )} />
              <Route exact path="/admin/bookings" render={props => (
                <AdminRoute>
                  <AdminBookingsScreen {...props} />
                </AdminRoute>
              )} />
              <Route exact path="/admin/users" render={props => (
                <AdminRoute>
                  <AdminUsersScreen {...props} />
                </AdminRoute>
              )} />
              <Route exact path="/admin/pharmacy" render={props => (
                <AdminRoute>
                  <AdminPharmacyScreen {...props} />
                </AdminRoute>
              )} />
              <Route exact path="/admin/medication/:id/edit" render={props => (
                <AdminRoute>
                  <AdminPharmacyScreen {...props} />
                </AdminRoute>
              )} />
              <Route exact path="/pharmacy" component={PharmacyScreen} />
              <Route exact path="/pharmacy/order/:id" component={MedicationOrderScreen} />
              <Route exact path="/doctors/specialty/:specialty" component={DoctorsBySpecialtyScreen} />
              <Route exact path="/prescription-order" component={PrescriptionOrderScreen} />
              <Route exact path="/prescription-success" component={PrescriptionSuccessScreen} />
              <Route exact path="/prescription-orders" component={PrescriptionOrderListScreen} />
              <Route exact path="/admin/prescription-orders" render={props => (
                <AdminRoute>
                  <AdminPrescriptionOrdersScreen {...props} />
                </AdminRoute>
              )} />
              <Route exact path="/admin/prescription-orders/add" render={props => (
                <AdminRoute>
                  <AddPrescriptionOrderScreen {...props} />
                </AdminRoute>
              )} />
              <Route exact path="/doctors" component={DoctorListScreen} />
            </Switch>
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
            margin-top: 60px; /* Add margin to account for fixed header */
          }

          /* Remove any margin from the last child of main-content to prevent extra space before footer */
          .main-content > *:last-child {
            margin-bottom: 0;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0;
          }

          /* Modern scrollbar */
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

