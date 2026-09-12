import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

const translations = {
  English: {
    home: "Home",
    myBooking: "My Booking",
    about: "About",
    help: "Help",
    contact: "Contact",
    signIn: "Sign In",
    signUp: "Sign Up",
    bookTicket: "Book Your Ticket",
    from: "From",
    to: "To",
    journeyDate: "Journey Date",
    departureCity: "Enter departure city",
    destinationCity: "Enter destination city",
    searchBuses: "SEARCH BUSES",
  },

  Hindi: {
    home: "होम",
    myBooking: "मेरी बुकिंग",
    about: "हमारे बारे में",
    help: "सहायता",
    contact: "संपर्क",
    signIn: "साइन इन",
    signUp: "साइन अप",
    bookTicket: "अपना टिकट बुक करें",
    from: "से",
    to: "तक",
    journeyDate: "यात्रा की तारीख",
    departureCity: "प्रस्थान शहर दर्ज करें",
    destinationCity: "गंतव्य शहर दर्ज करें",
    searchBuses: "बस खोजें",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "English"
  );

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};