import React from "react";

const Feature = () => {
  const flooderServices = [
    {
      title: "Prediksi Banjir Berbasis Lokasi",
      description:
        "Sistem prediksi akurat yang menganalisis data curah hujan, topografi, dan hidrologi untuk memberikan peringatan dini banjir berdasarkan lokasi spesifik.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      gradient: "from-blue-500 to-cyan-400",
      iconBg: "bg-gradient-to-br from-blue-100 to-cyan-50",
      hoverIconBg: "group-hover:from-blue-200 group-hover:to-cyan-100",
    },
    {
      title: "Peta Interaktif & Data Historis",
      description:
        "Visualisasi peta Indonesia yang interaktif dengan overlay data cuaca real-time, riwayat banjir, dan prediksi curah hujan untuk analisis mendalam.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
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
      ),
      gradient: "from-emerald-500 to-teal-400",
      iconBg: "bg-gradient-to-br from-emerald-100 to-teal-50",
      hoverIconBg: "group-hover:from-emerald-200 group-hover:to-teal-100",
    },
    {
      title: "Notifikasi Peringatan Dini",
      description:
        "Sistem notifikasi otomatis yang mengirimkan peringatan dini kepada masyarakat dan instansi terkait ketika terdeteksi potensi banjir di wilayah tertentu.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-5 5v-5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 17v2a2 2 0 002 2h4m-6 0v-5a6 6 0 016-6v0a6 6 0 016 6v5h2a2 2 0 002-2v-2"
          />
        </svg>
      ),
      gradient: "from-orange-500 to-amber-400",
      iconBg: "bg-gradient-to-br from-orange-100 to-amber-50",
      hoverIconBg: "group-hover:from-orange-200 group-hover:to-amber-100",
    },
    {
      title: "Analisis Wilayah Rawan Banjir",
      description:
        "Identifikasi dan pemetaan zona-zona rawan banjir menggunakan analisis spasial untuk mendukung perencanaan mitigasi dan pembangunan infrastruktur.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      gradient: "from-purple-500 to-indigo-400",
      iconBg: "bg-gradient-to-br from-purple-100 to-indigo-50",
      hoverIconBg: "group-hover:from-purple-200 group-hover:to-indigo-100",
    },
  ];

  return (
    <section className="relative text-gray-900 py-16 md:py-24 px-4 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/50">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Fitur{" "}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
              Floonder
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Solusi komprehensif untuk prediksi dan mitigasi banjir di Indonesia
            dengan teknologi GIS terdepan dan analisis data spasial yang akurat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
          {flooderServices.map((service, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-white/50 shadow-xl
              transform transition-all duration-500 hover:scale-[1.02]
              hover:shadow-2xl hover:bg-white group relative overflow-hidden"
            >
              {/* Card gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
              ></div>

              <div className="relative z-10">
                <div className="flex flex-col items-start text-left mb-6">
                  <div
                    className={`${service.iconBg} ${service.hoverIconBg} p-4 rounded-2xl mb-4 transition-all duration-500 transform group-hover:scale-110`}
                  >
                    <span
                      className={`bg-gradient-to-br ${service.gradient} bg-clip-text text-transparent w-12 h-12 flex items-center justify-center`}
                    >
                      {service.icon}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors">
                    {service.title}
                  </h3>
                </div>

                <p className="text-sm md:text-base text-slate-600 mb-6 leading-relaxed group-hover:text-slate-700 transition-colors">
                  {service.description}
                </p>

                <button
                  className={`inline-flex items-center justify-center space-x-2 text-white 
                  bg-gradient-to-r ${service.gradient} hover:shadow-lg px-6 md:px-8 py-3 rounded-xl 
                  text-sm md:text-base font-semibold w-full
                  transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl
                  relative overflow-hidden group/btn`}
                >
                  <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                  <span className="relative z-10">Pelajari Lebih Lanjut</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover/btn:translate-x-1 relative z-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/60 shadow-2xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-200/30 to-blue-200/30 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-200/30 to-teal-200/30 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                Mengapa Memilih{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Floonder?
                </span>
              </h3>
              <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto">
                Floonder mengintegrasikan data dari berbagai sumber seperti
                BMKG, satelit, dan sensor IoT untuk memberikan prediksi banjir
                yang paling akurat di Indonesia.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
                  <div className="text-4xl mb-3 transform transition-transform group-hover:scale-110">
                    🌊
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">
                    Real-time Data
                  </h4>
                  <p className="text-sm text-slate-600">
                    Data cuaca dan hidrologi terkini
                  </p>
                </div>
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
                  <div className="text-4xl mb-3 transform transition-transform group-hover:scale-110">
                    🎯
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">
                    Akurasi Tinggi
                  </h4>
                  <p className="text-sm text-slate-600">
                    Prediksi dengan tingkat akurasi 95%
                  </p>
                </div>
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
                  <div className="text-4xl mb-3 transform transition-transform group-hover:scale-110">
                    📱
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">
                    User-Friendly
                  </h4>
                  <p className="text-sm text-slate-600">
                    Interface mudah digunakan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
