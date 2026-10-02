import React, {
  createContext,
  useContext,
  useState,
} from "react";

import API from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const savedUser =
      localStorage.getItem("greenBusUser");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });


  const signup = async (
    name,
    email,
    password
  ) => {

    try {

      const response = await API.post(
        "/auth/signup",
        {
          name,
          email,
          password,
        }
      );

      return {
        success: true,
        message:
          response.data.message,
      };

    } catch (error) {

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Signup failed.",
      };

    }

  };


  const login = async (
    email,
    password
  ) => {

    try {

      const response = await API.post(
        "/auth/login",
        {
          email,
          password,
        }
      );


      const {
        token,
        user,
      } = response.data;


      localStorage.setItem(
        "token",
        token
      );


      localStorage.setItem(
        "greenBusUser",
        JSON.stringify(user)
      );


      setUser(user);


      return {
        success: true,
        message:
          response.data.message,
      };

    } catch (error) {

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Login failed.",
      };

    }

  };


  const logout = () => {

    setUser(null);

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "greenBusUser"
    );

  };


  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

};


export const useAuth = () => {

  return useContext(
    AuthContext
  );

};