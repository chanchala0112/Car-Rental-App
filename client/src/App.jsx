import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Listing from './pages/Listing';
import CarDetails from './pages/CarDetails';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Contact from './pages/Contact';
import MyBookings from './pages/MyBookings';
import BookingForm from './pages/BookingForm';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Footer from './components/Footer';

// Owner components
import OwnerLayout from './components/owner/OwnerLayout';
import Dashboard from './pages/owner/Dashboard';
import AddCar from './pages/owner/AddCar';
import EditCar from './pages/owner/EditCar';
import ListCar from './pages/ListCar';
import OwnerLogin from './pages/owner/OwnerLogin';
import ManageUsers from './pages/owner/ManageUsers';
import ManageBookings from './pages/owner/ManageBookings';
import OwnerProtectedRoute from './components/owner/OwnerProtectedRoute';
import UserTracker from './components/UserTracker';

const App = () => {
  const { pathname } = useLocation();
  const isOwnerPath = pathname.startsWith('/owner');

  return (
    <>
      <UserTracker />
      {!isOwnerPath && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/listing/:id" element={<CarDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book/:id" element={<BookingForm />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignUpPage />} />

          {/* Owner Routes */}
          <Route path="/owner/login" element={<OwnerLogin />} />

          <Route path="/owner" element={<OwnerProtectedRoute />}>
            <Route element={<OwnerLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="manage-users" element={<ManageUsers />} />
              <Route path="manage-bookings" element={<ManageBookings />} />
              <Route path="add-car" element={<AddCar />} />
              <Route path="edit-car/:id" element={<EditCar />} />
              <Route path="list-car" element={<ListCar />} />
            </Route>
          </Route>
        </Routes>
      </main>
      {!isOwnerPath && <Footer />}
    </>
  );
};

export default App;
