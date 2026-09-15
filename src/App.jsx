import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import SearchResults from "./Pages/SearchResult";
import SeatSelection from "./Pages/SeatSelection";
import PassengerDetails from "./Pages/PassengerDetails";
import Payment from "./Pages/Payment";
import BookingConfirmation from "./Pages/BookingConfirmation";

import MyBookings from "./Pages/MyBookings";
import BookingDetails from "./Pages/BookingDetails";

import About from "./Pages/About";
import Help from "./Pages/Help";
import Contact from "./Pages/Contact";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

const App = () => {
  return (
    <Routes>

      {/* HOME */}
      <Route
        path="/"
        element={<Home />}
      />

      {/* BUS SEARCH */}
      <Route
        path="/search-results"
        element={<SearchResults />}
      />

      {/* SEAT SELECTION */}
      <Route
        path="/seat-selection"
        element={<SeatSelection />}
      />

      {/* PASSENGER DETAILS */}
      <Route
        path="/passenger-details"
        element={<PassengerDetails />}
      />

      {/* PAYMENT */}
      <Route
        path="/payment"
        element={<Payment />}
      />

      {/* BOOKING CONFIRMATION */}
      <Route
        path="/booking-confirmation"
        element={<BookingConfirmation />}
      />

      {/* MY BOOKINGS */}
      <Route
        path="/my-bookings"
        element={<MyBookings />}
      />

      {/* BOOKING DETAILS */}
      <Route
        path="/booking-details"
        element={<BookingDetails />}
      />

      {/* OTHER PAGES */}
      <Route
        path="/about"
        element={<About />}
      />

      <Route
        path="/help"
        element={<Help />}
      />

      <Route
        path="/contact"
        element={<Contact />}
      />

      {/* AUTH */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

    </Routes>
  );
};

export default App;