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

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { signup } =
    useAuth();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError(
        "Please fill all the fields."
      );

      return;
    }

    if (
      !/^\S+@\S+\.\S+$/.test(
        email
      )
    ) {
      setError(
        "Please enter a valid email address."
      );

      return;
    }

    if (
      password.length < 6
    ) {
      setError(
        "Password must be at least 6 characters."
      );

      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );

      return;
    }

    const result = signup(
      name,
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
      "Account created successfully!"
    );

    navigate("/login", {
      state:
        location.state,
    });
  };

  return (
    <>
      <Navbar />

      <div className="min-h-[75vh] bg-gray-50 flex items-center justify-center px-4 py-10">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

          <div className="text-center mb-8">

            <h1 className="text-3xl font-semibold">
              Create Account
            </h1>

            <p className="text-gray-500 mt-2">
              Join Green Bus today
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
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
              />

            </div>

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

            <div className="mb-5">

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
                placeholder="Create a password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
              />

            </div>

            <div className="mb-6">

              <label className="block text-gray-700 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                value={
                  confirmPassword
                }
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                placeholder="Confirm your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
              />

            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg"
            >
              CREATE ACCOUNT
            </button>

          </form>

          <p className="text-center text-gray-600 mt-6">

            Already have an account?{" "}

            <Link
              to="/login"
              state={
                location.state
              }
              className="text-green-600 font-semibold"
            >
              Sign In
            </Link>

          </p>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default Signup;