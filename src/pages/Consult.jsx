import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const consultantCardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const Consult = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const ctx = canvas.getContext("2d");
    updateCanvasSize();

    const stars = [];
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        xRatio: Math.random(),
        yRatio: Math.random(),
        size: Math.random() * 2.5 + 0.8,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.04 + 0.01,
      });
    }

    let animationFrameId;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(15, 15, 15, 0.3)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        const x = star.xRatio * canvas.width;
        const y = star.yRatio * canvas.height;

        ctx.beginPath();
        ctx.fillStyle = `rgba(6, 182, 212, ${star.opacity})`;
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, star.size * 2, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, star.size * 2);
        gradient.addColorStop(0, `rgba(6, 182, 212, ${star.opacity * 0.5})`);
        gradient.addColorStop(1, "rgba(6, 182, 212, 0)");
        ctx.fillStyle = gradient;
        ctx.fill();

        star.opacity += star.speed;

        if (star.opacity >= 1 || star.opacity <= 0.1) {
          star.speed = -star.speed;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      cancelAnimationFrame(animationFrameId);
      setTimeout(() => {
        animationFrameId = requestAnimationFrame(animate);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const consultants = [
    {
      name: "Ir. Ahmad Hidayat",
      role: "Senior Civil Engineer",
      certifications: "IPM, PII, HAKI",
      bio: "Ahli struktur bangunan dengan pengalaman 15 tahun dalam perencanaan dan evaluasi properti komersial dan residensial. Memiliki keahlian dalam analisis kelayakan lahan.",
      img: "https://api.dicebear.com/7.x/initials/svg?seed=Ahmad+Hidayat",
      rating: 4.9,
      projects: 78,
    },
    {
      name: "Ir. Siti Rahayu, M.T.",
      role: "Land Development Specialist",
      certifications: "PII, SKA Madya",
      bio: "Spesialis pengembangan lahan dengan fokus pada analisis topografi dan mitigasi risiko bencana. Berpengalaman dalam konsultasi properti di berbagai jenis tanah.",
      img: "https://api.dicebear.com/7.x/initials/svg?seed=Siti+Rahayu",
      rating: 4.8,
      projects: 65,
    },
    {
      name: "Ir. Budi Santoso",
      role: "Infrastructure Consultant",
      certifications: "HAKI, SKA Utama",
      bio: "Ahli infrastruktur dengan spesialisasi pada sistem drainase dan utilitas. Membantu klien mengoptimalkan pemanfaatan lahan dengan perencanaan infrastruktur yang tepat.",
      img: "https://api.dicebear.com/7.x/initials/svg?seed=Budi+Santoso",
      rating: 4.7,
      projects: 92,
    },
    {
      name: "Ir. Dian Pertiwi, M.Sc.",
      role: "Environmental Engineer",
      certifications: "AMDAL-A, PII",
      bio: "Spesialis lingkungan dengan keahlian dalam analisis dampak lingkungan untuk pengembangan properti. Menerapkan prinsip pembangunan berkelanjutan dalam setiap proyek.",
      img: "https://api.dicebear.com/7.x/initials/svg?seed=Dian+Pertiwi",
      rating: 4.9,
      projects: 71,
    },
  ];

  const services = [
    {
      title: "Analisis Kelayakan Lahan",
      description:
        "Evaluasi komprehensif terhadap kesesuaian lahan untuk berbagai jenis pengembangan properti.",
      icon: "📊",
    },
    {
      title: "Konsultasi Zonasi & Perizinan",
      description:
        "Panduan untuk memahami regulasi zonasi dan membantu proses perizinan pembangunan.",
      icon: "📑",
    },
    {
      title: "Penilaian Risiko Geografis",
      description:
        "Identifikasi dan analisis risiko geografis seperti banjir, tanah longsor, dan kondisi tanah.",
      icon: "⚠️",
    },
    {
      title: "Perencanaan Infrastruktur",
      description:
        "Konsultasi untuk perencanaan infrastruktur optimal sesuai dengan kondisi lahan dan kebutuhan.",
      icon: "🏗️",
    },
    {
      title: "Analisis Investasi Properti",
      description:
        "Evaluasi potensi investasi berdasarkan data spasial dan kondisi pasar properti.",
      icon: "💰",
    },
    {
      title: "Survei & Pemetaan Lahan",
      description:
        "Layanan survei dan pemetaan profesional menggunakan teknologi GIS terkini.",
      icon: "🗺️",
    },
  ];

  return (
    <div className="bg-[#0F0F0F] text-white min-h-screen flex flex-col overflow-hidden relative">
      {/* Twinkling Stars Canvas */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full pointer-events-none z-0"
        />
      </div>

      {/* Background Gradient Circles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute top-[-25%] left-[-25%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] 
            bg-gradient-to-r from-cyan-500/20 via-blue-600/10 to-transparent 
            rounded-full blur-3xl opacity-50"
        ></div>
        <div
          className="absolute bottom-[-25%] right-[-25%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] 
            bg-gradient-to-r from-cyan-500/20 via-blue-600/10 to-transparent 
            rounded-full blur-3xl opacity-50"
        ></div>
      </div>

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-grid-white/5 opacity-10 pointer-events-none z-0" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 flex-1 flex flex-col box-border z-10">
        <Navbar className="z-20" />

        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16 mt-10 md:mt-20">
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              <span className="text-cyan-400">Konsultasi</span> Properti
              Berbasis GIS
            </h1>
            <p className="text-base md:text-lg text-gray-400 mb-6">
              Dapatkan panduan dari para ahli teknik sipil bersertifikasi untuk
              analisis properti Anda menggunakan data spasial yang akurat. Kami
              membantu Anda membuat keputusan investasi properti yang tepat
              melalui pendekatan berbasis data geografis.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                className="bg-cyan-500 hover:bg-cyan-600 text-black px-6 md:px-8 py-2 md:py-3 
                rounded-full font-medium transition-all duration-300 
                transform hover:-translate-y-1 hover:shadow-lg uppercase text-sm"
              >
                Jadwalkan Konsultasi
              </button>
              <a
                href="/maps"
                className="bg-transparent hover:bg-cyan-900/30 text-cyan-400 border border-cyan-500 
                px-6 md:px-8 py-2 md:py-3 rounded-full font-medium transition-all duration-300 
                transform hover:-translate-y-1 hover:shadow-lg uppercase text-sm"
              >
                Lihat Properti
              </a>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative h-64 sm:h-80 md:h-96 mt-6 md:mt-0 order-first md:order-last">
            <div className="absolute right-0 top-0 w-3/4 h-40 sm:h-48 md:h-56 z-10">
              <img
                src="/Consult1.jpg"
                alt="Konsultasi GIS"
                className="w-full h-full object-cover rounded-lg shadow-md border border-gray-800"
              />
            </div>

            <div className="absolute left-0 bottom-0 w-2/3 h-48 sm:h-56 md:h-64">
              <img
                src="/Consult2.jpg"
                alt="Analisis Properti"
                className="w-full h-full object-cover rounded-lg shadow-md border border-gray-800"
              />

              <div className="absolute right-4 md:right-6 bottom-4 md:bottom-6 bg-cyan-500 text-black px-4 md:px-6 py-2 md:py-3 rounded">
                <p className="font-bold text-xl md:text-2xl">300+</p>
                <p className="text-base md:text-lg">Konsultasi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-10 text-cyan-400">
            Layanan Konsultasi
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="bg-gradient-to-br from-[#1F2937] to-[#111827] rounded-2xl p-[1px] shadow-lg hover:shadow-xl transition-all duration-300"
                variants={consultantCardVariant}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden h-full p-6">
                  <div className="text-3xl mb-4">{service.icon}</div>
                  <h3 className="font-semibold text-white text-lg mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Consultants Section */}
        <div className="mb-16 md:mb-24">
          <div className="flex justify-between items-center mb-6 md:mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-cyan-400">
              Konsultan Bersertifikasi
            </h2>
            <a
              href="/consultants"
              className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center"
            >
              Lihat Semua
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {consultants.map((consultant, index) => (
              <motion.div
                key={consultant.name}
                className="group bg-gradient-to-br from-[#1F2937] to-[#111827] rounded-2xl p-[1px] shadow-lg hover:shadow-xl transition-all duration-300"
                variants={consultantCardVariant}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden flex flex-col h-full">
                  {/* Image */}
                  <div className="w-full h-40 sm:h-48 md:h-56 relative">
                    <img
                      src={consultant.img}
                      alt={consultant.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder-image.jpg";
                      }}
                    />
                    <div className="absolute top-3 right-3 bg-cyan-500 text-black px-2 py-1 rounded-md text-xs font-medium flex items-center">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      {consultant.rating}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5 md:p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="font-semibold text-white text-lg sm:text-xl mb-1">
                        {consultant.name}
                      </h3>
                      <div className="flex flex-col gap-2 mb-3">
                        <span className="inline-block bg-cyan-800/30 text-cyan-300 text-xs font-medium px-3 py-1 rounded-full">
                          {consultant.role}
                        </span>
                        <span className="text-gray-400 text-xs">
                          Sertifikasi: {consultant.certifications}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {consultant.projects} Proyek Selesai
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                        {consultant.bio}
                      </p>
                    </div>

                    <div className="mt-4 sm:mt-5">
                      <button className="inline-block w-full text-center bg-cyan-500 hover:bg-cyan-400 text-white text-sm sm:text-base font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                        Jadwalkan Konsultasi
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-10 text-cyan-400">
            Proses Konsultasi
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-gray-800 relative">
              <div className="absolute top-4 left-4 bg-cyan-500 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-semibold text-white text-lg mb-3 pl-10">
                Pengumpulan Data
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Kami mengumpulkan data spasial dan informasi properti yang
                relevan untuk analisis komprehensif.
              </p>
            </div>

            <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-gray-800 relative">
              <div className="absolute top-4 left-4 bg-cyan-500 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-semibold text-white text-lg mb-3 pl-10">
                Analisis GIS
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Tim ahli kami menganalisis data menggunakan teknologi GIS untuk
                mendapatkan insight mendalam.
              </p>
            </div>

            <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-gray-800 relative">
              <div className="absolute top-4 left-4 bg-cyan-500 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-semibold text-white text-lg mb-3 pl-10">
                Rekomendasi & Laporan
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Anda menerima laporan terperinci dengan rekomendasi spesifik
                berdasarkan analisis kami.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mb-16 md:mb-24">
          <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 rounded-2xl p-6 md:p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                Siap untuk mengoptimalkan investasi properti Anda?
              </h2>
              <p className="text-gray-300 text-base md:text-lg mb-6 max-w-2xl">
                Manfaatkan keahlian konsultan bersertifikasi kami untuk
                mendapatkan insight berbasis data geografis yang akan membantu
                Anda membuat keputusan investasi yang tepat.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-cyan-500 hover:bg-cyan-600 text-black px-6 md:px-8 py-2 md:py-3 rounded-full font-medium transition-all duration-300">
                  Jadwalkan Konsultasi Sekarang
                </button>
                <a
                  href="/maps"
                  className="bg-transparent hover:bg-white/10 text-white border border-white px-6 md:px-8 py-2 md:py-3 rounded-full font-medium transition-all duration-300"
                >
                  Lihat Properti di Peta
                </a>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Consult;
