import React from "react";

const Hero = () => {
  return (
    <section className="relative text-gray-900 py-16 md:py-24 px-4 overflow-hidden h-full">
      <div className="relative z-10 text-center max-w-4xl mx-auto mt-10">
        <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-gray-900 leading-tight">
          <span className="text-blue-600">Floonder</span> – Prediksi Banjir
          Berbasis Web GIS
        </h1>
        <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
          Platform prediksi banjir yang interaktif dan berbasis data spasial
          untuk membantu masyarakat dan pemerintah menghadapi risiko banjir di
          Indonesia.
        </p>

        {/* CTA Buttons */}
        <div className="mb-16 flex flex-wrap justify-center gap-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 
            rounded-xl font-semibold text-lg transition-all duration-300 
            transform hover:-translate-y-1 hover:shadow-xl shadow-lg flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Coba Sekarang
          </button>
          <button
            className="border-2 border-blue-600 text-blue-600 
            hover:bg-blue-600 hover:text-white hover:shadow-xl
            px-8 py-4 rounded-xl font-semibold text-lg
            transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            Lihat Peta
          </button>
        </div>

        {/* Statistics */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-16">
          {[
            { value: "34+", label: "Provinsi Terpantau", color: "blue-600" },
            { value: "95%", label: "Akurasi Prediksi", color: "indigo-600" },
            { value: "100K+", label: "Pengguna Aktif", color: "cyan-600" },
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
            Dipercaya oleh instansi pemerintah dan organisasi di Indonesia
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: "BMKG", icon: "🌦️" },
              { name: "BNPB", icon: "🚨" },
              { name: "Kementerian PUPR", icon: "🏗️" },
              { name: "Pemerintah Daerah", icon: "🏛️" },
            ].map((partner, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-2xl px-4 py-3
                flex items-center justify-center shadow-lg hover:scale-110 
                transition-all duration-300 hover:shadow-xl border border-gray-200 gap-2"
              >
                <span className="text-2xl">{partner.icon}</span>
                <span className="text-sm font-medium text-gray-700">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
