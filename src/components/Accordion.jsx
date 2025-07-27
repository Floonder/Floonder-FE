import React, { useState } from "react";

const FAQ = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const gradients = [
    "from-blue-500 to-cyan-400",
    "from-emerald-500 to-teal-400",
    "from-orange-500 to-amber-400",
    "from-purple-500 to-indigo-400",
    "from-pink-500 to-rose-400",
  ];

  return (
    <section className="relative text-gray-900 flex items-center justify-center px-6 py-16 md:py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/50">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/5 w-80 h-80 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/5 w-96 h-96 bg-gradient-to-r from-emerald-200/15 to-teal-200/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-200/10 to-pink-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <div className="max-w-lg">
              <h2 className="text-4xl md:text-5xl font-bold md:leading-tight mb-6">
                Floonder{" "}
                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                  FAQ
                </span>
              </h2>
              <div className="relative">
                <p className="text-lg text-slate-600 leading-relaxed mb-8 font-semibold">
                  Pertanyaan yang Sering Diajukan
                </p>
                <div className="absolute -left-2 top-1 w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full"></div>
              </div>
              <p className="text-base text-slate-600 leading-relaxed relative">
                Temukan jawaban lengkap tentang sistem prediksi banjir Floonder.
                Kami siap membantu Anda memahami cara kerja platform kami dalam
                mencegah dan mitigasi banjir di Indonesia.
              </p>

              {/* Decorative element */}
              <div className="mt-8 flex items-center space-x-3">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full animate-pulse delay-75"></div>
                <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="space-y-4">
              {[
                {
                  question: "Apa itu Floonder dan bagaimana cara kerjanya?",
                  answer:
                    "Floonder adalah platform prediksi banjir berbasis Web GIS yang mengintegrasikan data curah hujan, topografi, hidrologi, dan cuaca real-time untuk memberikan prediksi banjir yang akurat. Sistem kami menggunakan algoritma machine learning dan analisis spasial untuk memproses data dari berbagai sumber seperti BMKG, satelit, dan sensor IoT.",
                },
                {
                  question: "Seberapa akurat prediksi banjir Floonder?",
                  answer:
                    "Floonder memiliki tingkat akurasi prediksi hingga 95% berdasarkan validasi data historis dan monitoring real-time. Akurasi ini dicapai melalui kombinasi data meteorologi, hidrologi, dan topografi yang diproses menggunakan algoritma AI terdepan.",
                },
                {
                  question: "Wilayah mana saja yang dicakup oleh Floonder?",
                  answer:
                    "Floonder mencakup seluruh wilayah Indonesia dengan fokus khusus pada 34 provinsi dan daerah rawan banjir. Sistem kami memberikan prediksi detail untuk kota-kota besar seperti Jakarta, Bandung, Surabaya, Medan, dan wilayah lainnya yang memiliki risiko banjir tinggi.",
                },
                {
                  question: "Apakah Floonder gratis untuk digunakan?",
                  answer:
                    "Floonder menyediakan akses gratis untuk fitur dasar seperti peta interaktif dan peringatan banjir umum. Untuk fitur premium seperti prediksi detail per lokasi, analisis historis mendalam, dan API access, tersedia paket berlangganan dengan harga terjangkau.",
                },
                {
                  question: "Bagaimana keamanan dan privasi data pengguna?",
                  answer:
                    "Keamanan data adalah prioritas utama Floonder. Kami menggunakan enkripsi end-to-end, protokol keamanan SSL, dan mematuhi standar keamanan internasional. Data lokasi pengguna hanya digunakan untuk memberikan prediksi yang akurat dan tidak dibagikan kepada pihak ketiga tanpa persetujuan.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-3xl p-6
                  transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] shadow-xl
                  relative overflow-hidden group"
                >
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      gradients[index % gradients.length]
                    } opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
                  ></div>

                  {/* Active indicator */}
                  {activeAccordion === index && (
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${
                        gradients[index % gradients.length]
                      } rounded-r-full`}
                    ></div>
                  )}

                  <div className="relative z-10">
                    <button
                      className="group/btn inline-flex items-center justify-between gap-x-3 w-full text-left
                      text-lg md:text-xl font-semibold text-slate-800 transition-all duration-300 hover:text-slate-900"
                      aria-expanded={
                        activeAccordion === index ? "true" : "false"
                      }
                      onClick={() => toggleAccordion(index)}
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {faq.question}
                      </span>
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-2xl border-2 
                        flex items-center justify-center transition-all duration-500 transform
                        ${
                          activeAccordion === index
                            ? `bg-gradient-to-br ${
                                gradients[index % gradients.length]
                              } border-transparent shadow-lg scale-110`
                            : "border-slate-300 group-hover/btn:border-slate-400 group-hover/btn:scale-110"
                        }`}
                      >
                        <svg
                          className={`w-5 h-5 transition-all duration-500 
                            ${
                              activeAccordion === index
                                ? "rotate-180 text-white"
                                : "text-slate-600 group-hover/btn:text-slate-700"
                            }`}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </div>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        activeAccordion === index
                          ? "max-h-96 opacity-100 mt-6"
                          : "max-h-0 opacity-0"
                      }`}
                      role="region"
                    >
                      <div className="pb-2 relative">
                        {/* Answer with gradient accent */}
                        <div className="relative pl-4">
                          <div
                            className={`absolute left-0 top-2 w-1 h-16 bg-gradient-to-b ${
                              gradients[index % gradients.length]
                            } rounded-full opacity-30`}
                          ></div>
                          <p className="text-slate-600 text-base leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50/80 to-cyan-50/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-lg">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  Masih ada pertanyaan?
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                  Tim support kami siap membantu Anda 24/7
                </p>
                <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                  <span>Hubungi Kami</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
