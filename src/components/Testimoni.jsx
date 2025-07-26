import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const Testimoni = () => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: { perView: 1, spacing: 20 },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 20 },
      },
      "(min-width: 1200px)": {
        slides: { perView: 3, spacing: 30 },
      },
    },
  });

  const testimonials = [
    {
      name: "Dr. Rini Sari",
      role: "Kepala BPBD DKI Jakarta",
      title: "Sistem Peringatan Dini Terbaik",
      content:
        "Floonder telah membantu kami mengantisipasi banjir dengan akurasi yang luar biasa. Peringatan dini yang diberikan sangat membantu dalam koordinasi evakuasi dan mitigasi bencana di wilayah kami.",
      avatar: "DR",
      bgColor: "from-blue-50 to-cyan-50",
      iconColor: "text-blue-600",
      icon: "🚨",
    },
    {
      name: "Ahmad Susanto",
      role: "Warga Bandung, Jawa Barat",
      title: "Interface yang User-Friendly",
      content:
        "Sebagai masyarakat awam, saya sangat terbantu dengan tampilan Floonder yang mudah dipahami. Peta interaktif dan notifikasi real-time membuat saya selalu siap menghadapi potensi banjir di daerah saya.",
      avatar: "AS",
      bgColor: "from-emerald-50 to-green-50",
      iconColor: "text-emerald-600",
      icon: "👨‍💻",
    },
    {
      name: "Budi Prasetyo",
      role: "Dinas Pekerjaan Umum Jawa Tengah",
      title: "Data Akurat & Terpercaya",
      content:
        "Floonder menjadi partner penting dalam perencanaan pembangunan infrastruktur kami. Data historis dan analisis wilayah rawan banjir sangat membantu dalam pengambilan keputusan strategis.",
      avatar: "BP",
      bgColor: "from-purple-50 to-indigo-50",
      iconColor: "text-purple-600",
      icon: "📊",
    },
    {
      name: "Siti Nurhaliza",
      role: "Koordinator Tanggap Darurat Surabaya",
      title: "Respon Cepat & Efektif",
      content:
        "Dengan Floonder, tim kami dapat merespon potensi banjir dengan lebih cepat dan terorganisir. Integrasi data real-time memungkinkan kami mengambil tindakan preventif yang tepat waktu.",
      avatar: "SN",
      bgColor: "from-rose-50 to-pink-50",
      iconColor: "text-rose-600",
      icon: "⚡",
    },
  ];

  return (
    <section className="relative text-gray-900 py-16 md:py-24 px-4 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-100 mb-6">
            <span className="text-2xl">💬</span>
            <span className="text-sm font-medium text-blue-600">
              Testimoni Pengguna
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Cerita{" "}
            <span className="text-blue-600 relative">
              Sukses
              <svg
                className="absolute -bottom-2 left-0 w-full h-2"
                viewBox="0 0 100 8"
                fill="none"
              >
                <path
                  d="M0 6C20 2 40 2 60 6C80 2 100 2 100 6"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </span>{" "}
            Pengguna
          </h2>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Dengarkan pengalaman nyata dari berbagai instansi dan masyarakat
            yang telah merasakan manfaat sistem prediksi banjir Floonder
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => instanceRef.current?.prev()}
            className="group bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-blue-300 
            p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
          >
            <svg
              className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() => instanceRef.current?.next()}
            className="group bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-blue-300 
            p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
          >
            <svg
              className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Testimonials Slider */}
        <div ref={sliderRef} className="keen-slider">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="keen-slider__slide">
              <div
                className={`relative bg-gradient-to-br ${testimonial.bgColor} p-8 rounded-3xl border border-white/50 backdrop-blur-sm
                transform transition-all duration-500 hover:scale-105 hover:shadow-2xl 
                hover:-translate-y-2 group h-full`}
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-30 transition-opacity">
                  <svg
                    className="w-12 h-12 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                  </svg>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Title with Icon */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{testimonial.icon}</span>
                    <h3
                      className={`text-xl font-bold ${testimonial.iconColor}`}
                    >
                      {testimonial.title}
                    </h3>
                  </div>

                  {/* Content */}
                  <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/50">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center
                      ${testimonial.iconColor} bg-white/80 font-bold shadow-sm`}
                    >
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Bergabunglah dengan ribuan pengguna lainnya
            </h3>
            <p className="text-gray-600 mb-6">
              Rasakan sendiri keamanan dan kenyamanan dengan sistem prediksi
              banjir terdepan di Indonesia
            </p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold
              transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Mulai Sekarang Gratis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimoni;
