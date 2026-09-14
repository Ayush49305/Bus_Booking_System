import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const Login = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    setError("");

    // Check fields
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    const result = login(
      email,
      password
    );

    if (!result.success) {
      setError(result.message);
      return;
    }

    alert("Login successful!");

    navigate("/");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-[75vh] bg-gray-50 flex items-center justify-center px-4 py-10">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

          {/* Heading */}
          <div className="text-center mb-8">

            <h1 className="text-3xl font-semibold text-gray-800">
              Welcome Back
            </h1>

            <p className="text-gray-500 mt-2">
              Sign in to your Green Bus account
            </p>

          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="mb-5">

              <label className="block text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              />

            </div>

            {/* Password */}
            <div className="mb-6">

              <label className="block text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              />

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
            >
              SIGN IN
            </button>

          </form>

          {/* Signup Link */}
          <p className="text-center text-gray-600 mt-6">

            Don't have an account?{" "}

            <Link
              to="/signup"
              className="text-green-600 font-semibold hover:underline"
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