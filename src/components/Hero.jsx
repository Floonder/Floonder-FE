import React from "react";

const Hero = () => {
  return (
    <section className="relative text-white py-16 md:py-24 px-4 overflow-hidden h-full">
      <div className="relative z-10 text-center max-w-4xl mx-auto mt-10">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
          Discover the World with <span className="text-cyan-400">GIS</span>
        </h1>
        <p className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          Temukan wawasan geografis dengan teknologi GIS. Analisis data spasial,
          buat peta interaktif, dan jelajahi dunia dengan perspektif baru.
        </p>

        {/* Statistics */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8">
          {[
            { value: "25M+", label: "Revenue Generated", color: "cyan-400" },
            { value: "5-8X", label: "Average ROAS", color: "cyan-400" },
            { value: "100+", label: "Successful Campaigns", color: "cyan-400" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-[#1A1A1A] p-4 rounded-xl border border-gray-800 
              transform transition-all duration-300 hover:bg-[#2A2A2A] w-36"
            >
              <span className={`text-2xl font-bold text-${stat.color} block`}>
                {stat.value}
              </span>
              <span className="text-gray-400 text-xs">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            className="bg-cyan-500 hover:bg-cyan-600 text-black px-6 py-2 
            rounded-full font-medium transition-all duration-300 
            transform hover:-translate-y-1 hover:shadow-lg"
          >
            Get Started
          </button>
          <button
            className="border border-cyan-400 text-cyan-400 
            hover:bg-cyan-500/10 px-6 py-2 rounded-full font-medium 
            transition-all duration-300 transform hover:-translate-y-1"
          >
            Learn More
          </button>
        </div>

        {/* Trusted by Section */}
        <div className="mt-8 text-gray-400 text-sm">
          <p className="text-center mb-4">Trusted by leading companies</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "Telkom", src: "/telkom.png" },
              { name: "Chevalier SAS", src: "/navbar-logo.png" },
              { name: "MAPID", src: "/mapid-revamp.png" },
            ].map((partner, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-xl w-16 h-16 p-2 
        flex items-center justify-center shadow-md hover:scale-105 
        transition-transform duration-300"
              >
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
