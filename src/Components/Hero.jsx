import React from "react";
import SearchBox from "./SearchBox";

const Hero = () => {
  return (
    <section
      className="relative min-h-[720px] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://static.abhibus.com/images/herosection/operators/tgsrtcmobile.webp')",
      }}
    >
      {/* Light overlay */}
      <div className="absolute inset-0 bg-white/10"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-12 pt-20">
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-black mt-10 -ml-3">
          Book Your Ticket
        </h1>

        {/* Search Box */}
        <div className="mt-8 w-full max-w-[600px] -ml-4">
          <SearchBox />
        </div>

      </div>
    </section>
  );
};

export default Hero;