import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("greenBusUser");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  const signup = (name, email, password) => {
    const existingAccount =
      localStorage.getItem("greenBusAccount");

    if (existingAccount) {
      const account = JSON.parse(existingAccount);

      if (
        account.email.toLowerCase() ===
        email.toLowerCase()
      ) {
        return {
          success: false,
          message:
            "An account with this email already exists.",
        };
      }
    }

    const account = {
      name,
      email,
      password,
    };

    localStorage.setItem(
      "greenBusAccount",
      JSON.stringify(account)
    );

    return {
      success: true,
      message: "Account created successfully.",
    };
  };

  const login = (email, password) => {
    const savedAccount =
      localStorage.getItem("greenBusAccount");

    if (!savedAccount) {
      return {
        success: false,
        message:
          "No account found. Please sign up first.",
      };
    }

    const account = JSON.parse(savedAccount);

    if (
      account.email.toLowerCase() ===
        email.toLowerCase() &&
      account.password === password
    ) {
      const loggedInUser = {
        name: account.name,
        email: account.email,
      };

      setUser(loggedInUser);

      localStorage.setItem(
        "greenBusUser",
        JSON.stringify(loggedInUser)
      );

      return {
        success: true,
        message: "Login successful.",
      };
    }

    return {
      success: false,
      message: "Invalid email or password.",
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("greenBusUser");
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
  return useContext(AuthContext);
};