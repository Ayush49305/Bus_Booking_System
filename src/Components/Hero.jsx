import React from "react";
import SearchBox from "./SearchBox";
import { useLanguage } from "../context/LanguageContext";
import heroBg from "../assets/hero_bg.png";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section
      className="min-h-[600px] md:min-h-[800px] bg-cover bg-center bg-no-repeat pb-12"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      {/* The left shift is applied only on large screens so nothing is cut off on phones/tablets */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-12 sm:pt-20 md:pt-32 lg:-translate-x-22">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal text-black mb-8">
          {t.bookTicket}
        </h1>

        {/* Search Box */}
        <SearchBox />
      </div>
    </section>
  );
};

export default Hero;
