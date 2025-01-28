import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
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
      <Header />
      <main className="py-3">
        <Container>
          <Suspense fallback={<CommonLoading />}>
<<<<<<< HEAD
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
              <Route path="/doctors" element={<DoctorListScreen />} />
            </Routes>
=======
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
            </Switch>
>>>>>>> origin/main
          </Suspense>
        </Container>
      </main>
    </BrowserRouter>
  );
}

export default App;

