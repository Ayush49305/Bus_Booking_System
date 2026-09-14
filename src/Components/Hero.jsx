import React from "react";
import SearchBox from "./SearchBox";
import { useLanguage } from "../context/LanguageContext";
import heroBg from "../assets/hero.png";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section
      className="min-h-[800px] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32">
        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-normal text-black mb-8">
          {t.bookTicket}
        </h1>

        {/* Search Box */}
        <SearchBox />
      </div>
    </section>
  );
};

export default Hero;