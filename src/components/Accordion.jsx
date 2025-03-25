import React, { useState } from "react";

const FAQ = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <section className="relative bg-[#0F0F0F] text-white flex items-center justify-center px-6 py-1 overflow-hidden">
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

      <div className="relative z-10 max-w-[85rem] w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <div className="max-w-xs">
              <h2 className="text-2xl font-bold md:text-4xl md:leading-tight text-white">
                GIS <span className="text-cyan-400">FAQ</span>
                <br />
                (Frequently Asked Questions)
              </h2>
              <p className="mt-1 hidden md:block text-gray-400">
                Temukan jawaban komprehensif tentang layanan GIS kami. Kami siap
                membantu Anda memahami solusi geografis inovatif kami.
              </p>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="divide-y divide-gray-800">
              {[
                {
                  question: "Apa itu Teknologi GIS?",
                  answer:
                    "Sistem Informasi Geografis (GIS) adalah teknologi canggih yang memungkinkan analisis, manajemen, dan visualisasi data spasial dengan presisi tinggi.",
                },
                {
                  question: "Bagaimana GIS Dapat Membantu Bisnis Saya?",
                  answer:
                    "GIS dapat mengoptimalkan strategi bisnis Anda melalui analisis lokasi, pemetaan pasar, manajemen aset, dan pengambilan keputusan berbasis spasial.",
                },
                {
                  question: "Apakah Layanan GIS Kami Disesuaikan?",
                  answer:
                    "Kami menawarkan solusi GIS yang sepenuhnya dapat disesuaikan, disesuaikan dengan kebutuhan spesifik industri dan model bisnis Anda.",
                },
                {
                  question: "Berapa Lama Proses Implementasi?",
                  answer:
                    "Waktu implementasi bervariasi tergantung kompleksitas proyek, namun kami berkomitmen untuk proses yang efisien dan transparan.",
                },
                {
                  question: "Keamanan Data Bagaimana?",
                  answer:
                    "Keamanan data adalah prioritas utama kami. Kami menggunakan protokol enkripsi terkini dan praktik keamanan tercanggih.",
                },
                {
                  question: "Dukungan Pasca-Implementasi",
                  answer:
                    "Tim kami menyediakan dukungan berkelanjutan, pelatihan, dan pemeliharaan untuk memastikan kesuksesan jangka panjang solusi GIS Anda.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="py-6 border-b border-gray-800 
                  transform transition-all duration-300 hover:bg-[#1A1A1A]"
                >
                  <button
                    className="group inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-white rounded-lg transition hover:text-cyan-400"
                    aria-expanded={activeAccordion === index ? "true" : "false"}
                    onClick={() => toggleAccordion(index)}
                  >
                    {faq.question}
                    <svg
                      className={`shrink-0 size-5 text-gray-600 group-hover:text-cyan-400 ${
                        activeAccordion === index ? "rotate-180" : ""
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
                  </button>
                  <div
                    className={`w-full max-h-40 overflow-hidden transition-[height] duration-300 ${
                      activeAccordion === index ? "block" : "hidden"
                    }`}
                    role="region"
                  >
                    <p className="text-gray-400 mt-3">{faq.answer}</p>
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
