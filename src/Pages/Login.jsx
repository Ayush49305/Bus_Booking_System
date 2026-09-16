import React, {
  useState,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError(
        "Please enter email and password."
      );

      return;
    }

    const result = login(
      email,
      password
    );

    if (!result.success) {
      setError(
        result.message
      );

      return;
    }

    alert(
      "Login successful!"
    );

    const bookingData =
      location.state;

    if (
      bookingData?.from ===
      "/seat-selection"
    ) {
      navigate(
        "/seat-selection",
        {
          state: {
            bus: bookingData.bus,
            searchData:
              bookingData.searchData,
          },
        }
      );
    } else if (
      bookingData?.from ===
      "/passenger-details"
    ) {
      navigate(
        "/passenger-details",
        {
          state: {
            bus: bookingData.bus,
            selectedSeats:
              bookingData.selectedSeats,
            totalPrice:
              bookingData.totalPrice,
            searchData:
              bookingData.searchData,
          },
        }
      );
    } else if (
      bookingData?.from ===
      "/payment"
    ) {
      navigate(
        "/payment",
        {
          state: {
            bus: bookingData.bus,
            selectedSeats:
              bookingData.selectedSeats,
            passengers:
              bookingData.passengers,
            totalPrice:
              bookingData.totalPrice,
            searchData:
              bookingData.searchData,
          },
        }
      );
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-[75vh] bg-gray-50 flex items-center justify-center px-4 py-10">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

          <div className="text-center mb-8">

            <h1 className="text-3xl font-semibold text-gray-800">
              Welcome Back
            </h1>

            <p className="text-gray-500 mt-2">
              Sign in to your Green Bus account
            </p>

          </div>

          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-5">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
          >

            <div className="mb-5">

              <label className="block text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
              />

            </div>

            <div className="mb-6">

              <label className="block text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
              />

            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg"
            >
              SIGN IN
            </button>

          </form>

          <p className="text-center text-gray-600 mt-6">

            Don't have an account?{" "}

            <Link
              to="/signup"
              state={
                location.state
              }
              className="text-green-600 font-semibold"
            >
              Sign Up
            </Link>

          </p>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default Login;