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
            d="M15 17h5l-5 5v-5zM4.828 7l4.24-4.24a2 2 0 112.828 2.828L7.656 9.828A2 2 0 014.828 7zM10 10l8 8m-8-8L8.172 8.172M12 5l7 7-7 7"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
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
    },
  ];

  return (
    <section className="relative text-gray-900 py-16 md:py-24 px-4 overflow-hidden bg-gray-50">
      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Fitur <span className="text-blue-600">Floonder</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Solusi komprehensif untuk prediksi dan mitigasi banjir di Indonesia
            dengan teknologi GIS terdepan dan analisis data spasial yang akurat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
          {flooderServices.map((service, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-200
              transform transition-all duration-300 hover:scale-105
              hover:shadow-2xl hover:bg-white group shadow-lg"
            >
              <div className="flex flex-col items-start text-left mb-6">
                <div className="bg-blue-100 p-4 rounded-2xl mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                  <span className="text-blue-600 w-12 h-12 flex items-center justify-center">
                    {service.icon}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
              </div>

              <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              <a
                href="#"
                className="inline-flex items-center justify-center space-x-2 text-white 
                bg-blue-600 hover:bg-blue-700 px-6 md:px-8 py-3 rounded-xl 
                text-sm md:text-base font-semibold w-full
                transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                <span>Pelajari Lebih Lanjut</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1"
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
              </a>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 md:p-12 border border-blue-100">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Mengapa Memilih Floonder?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Floonder mengintegrasikan data dari berbagai sumber seperti BMKG,
              satelit, dan sensor IoT untuk memberikan prediksi banjir yang
              paling akurat di Indonesia.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/70 p-6 rounded-2xl">
                <div className="text-3xl mb-3">🌊</div>
                <h4 className="font-bold text-gray-900 mb-2">Real-time Data</h4>
                <p className="text-sm text-gray-600">
                  Data cuaca dan hidrologi terkini
                </p>
              </div>
              <div className="bg-white/70 p-6 rounded-2xl">
                <div className="text-3xl mb-3">🎯</div>
                <h4 className="font-bold text-gray-900 mb-2">Akurasi Tinggi</h4>
                <p className="text-sm text-gray-600">
                  Prediksi dengan tingkat akurasi 95%
                </p>
              </div>
              <div className="bg-white/70 p-6 rounded-2xl">
                <div className="text-3xl mb-3">📱</div>
                <h4 className="font-bold text-gray-900 mb-2">User-Friendly</h4>
                <p className="text-sm text-gray-600">
                  Interface mudah digunakan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
