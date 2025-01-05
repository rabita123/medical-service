import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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

const LoadingSpinner = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Suspense fallback={<LoadingSpinner />}>
          <main>
            <Switch>
              <Route path="/register-user" component={RegisterScreen} />
              <Route path="/login" component={LoginScreen} />
              <Route path="/doctor/:id" component={DoctorProfileScreen} />
              <Route path="/booking-appointment/:id" component={BookingAppointmentScreen} />
              <Route path="/booking-success" component={BookingSuccessScreen} />
              <Route path="/tests" component={TestsScreen} />
              <Route path="/test/:id" component={TestBookingScreen} />
              <Route path="/my-test-bookings" component={MyTestBookingsScreen} />
              <Route path="/reschedule-success" component={RescheduleSuccessScreen} />
              <Route path="/" component={HomeScreen} exact />
            </Switch>
          </main>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
