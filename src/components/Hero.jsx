import React from "react";

const Hero = () => {
  return (
    <section className="relative text-gray-900 py-16 md:py-24 px-4 overflow-hidden h-full">
      <div className="relative z-10 text-center max-w-4xl mx-auto mt-10">
        <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-gray-900 leading-tight">
          Discover the World with <span className="text-blue-600">GIS</span>
        </h1>
        <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
          Temukan wawasan geografis dengan teknologi GIS. Analisis data spasial,
          buat peta interaktif, dan jelajahi dunia dengan perspektif baru.
        </p>

        {/* CTA Buttons */}
        <div className="mb-16 flex flex-wrap justify-center gap-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 
            rounded-xl font-semibold text-lg transition-all duration-300 
            transform hover:-translate-y-1 hover:shadow-xl shadow-lg"
          >
            Get Started
          </button>
          <button
            className="border-2 border-gray-300 text-gray-700 
            hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50
            px-8 py-4 rounded-xl font-semibold text-lg
            transition-all duration-300 transform hover:-translate-y-1"
          >
            Learn More
          </button>
        </div>

        {/* Statistics */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-16">
          {[
            { value: "25M+", label: "Revenue Generated", color: "blue-600" },
            { value: "5-8X", label: "Average ROAS", color: "indigo-600" },
            { value: "100+", label: "Successful Campaigns", color: "cyan-600" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200
              transform transition-all duration-300 hover:scale-105 hover:shadow-xl 
              min-w-[160px] shadow-lg"
            >
              <span
                className={`text-3xl font-bold text-${stat.color} block mb-2`}
              >
                {stat.value}
              </span>
              <span className="text-gray-600 text-sm font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Trusted by Section */}
        <div className="text-gray-600">
          <p className="text-center mb-6 font-medium">
            Trusted by leading companies worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: "Telkom", src: "/telkom.png" },
              { name: "Chevalier SAS", src: "/navbar-logo.png" },
              { name: "MAPID", src: "/mapid-revamp.png" },
            ].map((partner, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-2xl w-20 h-20 p-3
                flex items-center justify-center shadow-lg hover:scale-110 
                transition-all duration-300 hover:shadow-xl border border-gray-200"
              >
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition duration-300"
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
