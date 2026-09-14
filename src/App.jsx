import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import SearchResults from "./Pages/SearchResult";
import SeatSelection from "./Pages/SeatSelection";
import PassengerDetails from "./Pages/PassengerDetails";
import Payment from "./Pages/Payment";
import BookingConfirmation from "./Pages/BookingConfirmation";

import MyBookings from "./Pages/MyBookings";
import About from "./Pages/About";
import Help from "./Pages/Help";
import Contact from "./Pages/Contact";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

const App = () => {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route
        path="/search-results"
        element={<SearchResults />}
      />

      <Route
        path="/seat-selection"
        element={<SeatSelection />}
      />

      <Route
        path="/passenger-details"
        element={<PassengerDetails />}
      />

      <Route
        path="/payment"
        element={<Payment />}
      />

      <Route
        path="/booking-confirmation"
        element={<BookingConfirmation />}
      />

      <Route
        path="/my-bookings"
        element={<MyBookings />}
      />

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

      {/* Authentication */}
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