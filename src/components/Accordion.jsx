import React, { useState } from "react";

const FAQ = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <section className="relative text-gray-900 flex items-center justify-center px-6 py-16 md:py-24 overflow-hidden bg-gray-50">
      <div className="relative z-10 max-w-7xl w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <div className="max-w-lg">
              <h2 className="text-4xl md:text-5xl font-bold md:leading-tight text-gray-900 mb-6">
                Floonder <span className="text-blue-600">FAQ</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Pertanyaan yang Sering Diajukan
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Temukan jawaban lengkap tentang sistem prediksi banjir Floonder.
                Kami siap membantu Anda memahami cara kerja platform kami dalam
                mencegah dan mitigasi banjir di Indonesia.
              </p>
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
                  className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6
                  transform transition-all duration-300 hover:shadow-lg hover:scale-[1.02] shadow-md"
                >
                  <button
                    className="group inline-flex items-center justify-between gap-x-3 w-full text-left
                    text-lg md:text-xl font-semibold text-gray-900 transition-colors hover:text-blue-600"
                    aria-expanded={activeAccordion === index ? "true" : "false"}
                    onClick={() => toggleAccordion(index)}
                  >
                    {faq.question}
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full border-2 border-gray-300 
                      flex items-center justify-center transition-all duration-300
                      ${
                        activeAccordion === index
                          ? "border-blue-600 bg-blue-600"
                          : "group-hover:border-blue-600"
                      }`}
                    >
                      <svg
                        className={`w-4 h-4 transition-all duration-300 
                          ${
                            activeAccordion === index
                              ? "rotate-180 text-white"
                              : "text-gray-600 group-hover:text-blue-600"
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
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      activeAccordion === index
                        ? "max-h-96 opacity-100 mt-4"
                        : "max-h-0 opacity-0"
                    }`}
                    role="region"
                  >
                    <div className="pb-2">
                      <p className="text-gray-600 text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
