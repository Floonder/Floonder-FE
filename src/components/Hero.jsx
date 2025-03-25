import React from "react";

const Hero = () => {
  return (
    <section className="relative bg-[#0F0F0F] text-white py-16 md:py-24 px-4 overflow-hidden h-full">
      {/* Background Gradient Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] 
          bg-gradient-to-r from-cyan-500/20 via-blue-600/10 to-transparent 
          rounded-full blur-3xl opacity-50"
        ></div>
        <div
          className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] 
          bg-gradient-to-r from-cyan-500/20 via-blue-600/10 to-transparent 
          rounded-full blur-3xl opacity-50"
        ></div>
      </div>

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-grid-white/5 opacity-10 pointer-events-none"></div>

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
        <div className="mt-8 text-gray-500 text-sm">
          <p>Trusted by leading companies</p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center 
                justify-center hover:bg-gray-700 transition-all duration-300 
                transform hover:scale-110"
              >
                <span className="text-gray-400 text-xs">Logo</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
