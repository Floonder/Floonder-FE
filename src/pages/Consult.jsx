import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const slideInFromLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const slideInFromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const ConsultationPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const experts = [
    {
      id: 1,
      name: "Prof. Dr. Ir. Bambang Setiawan, M.T.",
      title: "Ahli Perencanaan Wilayah & Mitigasi Bencana",
      specialization: "Analisis Kelayakan Lahan, Zonasi Bencana",
      experience: "25+ tahun",
      certification: "IPM, PII, HAKI, AMDAL-A",
      rating: 4.9,
      projects: 180,
      location: "Jakarta, Bandung, Semarang",
      avatar:
        "https://api.dicebear.com/7.x/initials/svg?seed=Bambang+Setiawan&backgroundColor=2563eb",
      expertise: [
        "Analisis Risiko Banjir",
        "Perencanaan Tata Ruang",
        "Kelayakan Infrastruktur",
      ],
      price: "Rp 15.000.000 - 25.000.000",
    },
    {
      id: 2,
      name: "Dr. Ir. Sari Handayani, M.Sc.",
      title: "Spesialis Geoteknik & Stabilitas Tanah",
      specialization: "Analisis Tanah, Fondasi, Stabilitas Lereng",
      experience: "18+ tahun",
      certification: "PII, SKA Utama, HAKI",
      rating: 4.8,
      projects: 145,
      location: "Surabaya, Malang, Yogyakarta",
      avatar:
        "https://api.dicebear.com/7.x/initials/svg?seed=Sari+Handayani&backgroundColor=7dd3fc",
      expertise: [
        "Analisis Daya Dukung Tanah",
        "Mitigasi Longsor",
        "Desain Fondasi",
      ],
      price: "Rp 12.000.000 - 20.000.000",
    },
    {
      id: 3,
      name: "Ir. Ahmad Wijaya, Ph.D.",
      title: "Konsultan Infrastruktur & Utilitas",
      specialization: "Sistem Drainase, Utilitas Kota",
      experience: "20+ tahun",
      certification: "PII, HAKI, SKA Madya",
      rating: 4.9,
      projects: 165,
      location: "Medan, Padang, Palembang",
      avatar:
        "https://api.dicebear.com/7.x/initials/svg?seed=Ahmad+Wijaya&backgroundColor=84cc16",
      expertise: [
        "Perencanaan Drainase",
        "Infrastruktur Jalan",
        "Utilitas Underground",
      ],
      price: "Rp 10.000.000 - 18.000.000",
    },
  ];

  const consultationTypes = [
    {
      icon: "🏛️",
      title: "Pemerintah Daerah",
      description:
        "Konsultasi untuk perencanaan tata ruang, zonasi, dan pengembangan wilayah strategis",
      features: [
        "Masterplan Kota",
        "Zonasi Bencana",
        "Feasibility Study",
        "RTRW/RDTR",
      ],
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
    },
    {
      icon: "🏘️",
      title: "Developer Perumahan",
      description:
        "Analisis kelayakan lahan untuk pengembangan perumahan dan kawasan komersial",
      features: [
        "Site Analysis",
        "Drainage Master",
        "Infrastructure Planning",
        "Risk Assessment",
      ],
      bgColor: "bg-gradient-to-br from-sky-50 to-sky-100",
      borderColor: "border-sky-200",
    },
    {
      icon: "🏗️",
      title: "Perusahaan Konstruksi",
      description:
        "Konsultasi teknis untuk proyek konstruksi dan infrastruktur berskala besar",
      features: [
        "Soil Investigation",
        "Foundation Design",
        "Slope Stability",
        "Construction Method",
      ],
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      borderColor: "border-green-200",
    },
  ];

  const caseStudies = [
    {
      title: "Analisis Anti-Banjir Kawasan Perumahan Serpong",
      client: "PT. Alam Sutera Realty",
      description:
        "Evaluasi komprehensif sistem drainase dan mitigasi banjir untuk pengembangan 500 Ha",
      result: "Berhasil mengurangi risiko banjir hingga 95%",
      expert: "Prof. Dr. Ir. Bambang Setiawan",
      image: "/api/placeholder/400/200",
      tags: ["Drainage", "Flood Control", "Residential"],
    },
    {
      title: "Kelayakan Lahan Industri Cikarang",
      client: "Pemkab Bekasi",
      description:
        "Studi kelayakan pengembangan kawasan industri dengan fokus stabilitas tanah",
      result: "Zona industri aman dengan kapasitas 2000+ perusahaan",
      expert: "Dr. Ir. Sari Handayani",
      image: "/api/placeholder/400/200",
      tags: ["Industrial", "Soil Analysis", "Zoning"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-blue-50">
      {/* Hero Section */}
      <Navbar />

      <motion.section
        className="py-16 lg:py-24"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={slideInFromLeft}
              initial="hidden"
              animate="visible"
            >
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Konsultasi Bersertifikat
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Konsultasi Ahli
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">
                  {" "}
                  Sipil Wilayah
                </span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Dapatkan analisis profesional dari ahli sipil bersertifikat
                untuk perencanaan wilayah, mitigasi bencana, dan pengembangan
                infrastruktur yang berkelanjutan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-sky-400 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  Mulai Konsultasi
                </button>
                <button className="px-8 py-4 bg-white text-slate-700 rounded-xl font-semibold border-2 border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-300">
                  Lihat Studi Kasus
                </button>
              </div>
            </motion.div>
            <motion.div
              className="relative"
              variants={slideInFromRight}
              initial="hidden"
              animate="visible"
            >
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-slate-800">
                    Konsultasi Aktif
                  </h3>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Live
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-slate-600">
                      Analisis Risiko Banjir - Kota Bekasi
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-slate-600">
                      Perencanaan Perumahan - Tangerang
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-sky-500 rounded-full animate-pulse"></div>
                    <span className="text-slate-600">
                      Studi Kelayakan - Karawang
                    </span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <div className="text-sm text-slate-500 mb-2">
                    Progress Konsultasi
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-sky-400 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "75%" }}
                      transition={{ duration: 2, delay: 1 }}
                    ></motion.div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-400 rounded-2xl blur-xl opacity-20 scale-110"></div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Consultation Types */}
      <motion.section
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            variants={fadeIn}
            custom={0}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Layanan Konsultasi Profesional
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Kami melayani berbagai kebutuhan konsultasi untuk pemerintah,
              developer, dan perusahaan konstruksi
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {consultationTypes.map((type, index) => (
              <motion.div
                key={index}
                className={`${type.bgColor} ${type.borderColor} border-2 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
                variants={fadeIn}
                custom={index + 1}
              >
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm text-2xl">
                  {type.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {type.title}
                </h3>
                <p className="text-slate-600 mb-6">{type.description}</p>
                <ul className="space-y-2">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-slate-700">
                      <svg
                        className="w-4 h-4 text-green-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Expert Profiles */}
      <motion.section
        className="py-16 bg-gradient-to-br from-slate-50 to-sky-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            variants={fadeIn}
            custom={0}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Ahli Sipil Wilayah Bersertifikat
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Tim ahli dengan sertifikasi internasional dan pengalaman puluhan
              tahun
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {experts.map((expert, index) => (
              <motion.div
                key={expert.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                variants={fadeIn}
                custom={index + 1}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={expert.avatar}
                        alt={expert.name}
                        className="w-16 h-16 rounded-xl group-hover:scale-110 transition-transform duration-300"
                      />
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-2xl">⭐</span>
                          <span className="font-bold text-slate-900">
                            {expert.rating}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500">
                          {expert.projects} Proyek
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {expert.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-1">
                    {expert.title}
                  </p>
                  <p className="text-slate-600 text-sm mb-4">
                    {expert.specialization}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Pengalaman:</span>
                      <span className="font-medium text-slate-900">
                        {expert.experience}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Sertifikasi:</span>
                      <span className="font-medium text-slate-900">
                        {expert.certification}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Wilayah:</span>
                      <span className="font-medium text-slate-900">
                        {expert.location}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-slate-500 mb-2">
                      Keahlian Utama:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {expert.expertise.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl">
                    <p className="text-sm text-slate-600 mb-1">
                      Tarif Konsultasi:
                    </p>
                    <p className="font-bold text-slate-900">{expert.price}</p>
                  </div>

                  <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-400 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                    Konsultasi Sekarang
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Case Studies */}
      <motion.section
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            variants={fadeIn}
            custom={0}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Studi Kasus Sukses
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Lihat bagaimana konsultasi kami membantu klien mencapai hasil
              optimal
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-slate-50 to-sky-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                variants={slideInFromLeft}
                custom={index}
              >
                <div className="h-48 bg-gradient-to-br from-blue-400 to-sky-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute inset-0 bg-blue-600/20 group-hover:bg-blue-600/10 transition-colors duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-2">
                      {study.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-white/20 text-white rounded text-xs font-medium backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {study.title}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-3">
                    {study.client}
                  </p>
                  <p className="text-slate-600 mb-4">{study.description}</p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <p className="text-green-800 font-semibold">
                      Hasil: {study.result}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-500">
                      Konsultan: {study.expert}
                    </p>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
                      Selengkapnya →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Enhanced CTA Section */}
      <motion.section
        className="py-20 bg-gradient-to-br from-blue-600 via-sky-500 to-blue-700 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        <motion.div
          className="max-w-6xl mx-auto px-6 relative z-10"
          style={{ y }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div variants={slideInFromLeft}>
              <div className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Mulai Sekarang
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Siap Wujudkan
                <span className="text-sky-200"> Proyek Impian</span> Anda?
              </h2>

              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Konsultasikan kebutuhan analisis wilayah Anda dengan ahli
                terpercaya kami. Dapatkan solusi terbaik untuk setiap tantangan
                proyek Anda.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-white font-medium">
                    Konsultasi 24/7
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <span className="text-white font-medium">
                    Ahli Bersertifikat
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 4l9 16 9-16H3z" />
                    </svg>
                  </div>
                  <span className="text-white font-medium">Hasil Terukur</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                  <span className="text-white font-medium">Respons Cepat</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Jadwalkan Konsultasi</span>
                </motion.button>
                <motion.button
                  className="px-8 py-4 bg-transparent text-white border-2 border-white/30 rounded-xl font-semibold hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Hubungi Tim Kami</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Right Content - Stats Card */}
            <motion.div variants={slideInFromRight}>
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Mengapa Memilih Kami?
                  </h3>
                  <p className="text-blue-100">
                    Statistik pencapaian kami berbicara
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center">
                    <motion.div
                      className="text-4xl font-bold text-white mb-2"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      500+
                    </motion.div>
                    <p className="text-blue-100 text-sm">Proyek Selesai</p>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="text-4xl font-bold text-white mb-2"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                    >
                      98%
                    </motion.div>
                    <p className="text-blue-100 text-sm">Tingkat Kepuasan</p>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="text-4xl font-bold text-white mb-2"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                    >
                      25+
                    </motion.div>
                    <p className="text-blue-100 text-sm">Tahun Pengalaman</p>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="text-4xl font-bold text-white mb-2"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 1.1 }}
                    >
                      50+
                    </motion.div>
                    <p className="text-blue-100 text-sm">Kota Terjangkau</p>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-white text-sm mb-2">
                      <span>Analisis Akurasi</span>
                      <span>95%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-sky-300 to-white h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "95%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      ></motion.div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-white text-sm mb-2">
                      <span>Waktu Penyelesaian</span>
                      <span>92%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-sky-300 to-white h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "92%" }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                      ></motion.div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-white/10 rounded-xl border border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        Garansi Kepuasan
                      </p>
                      <p className="text-blue-100 text-sm">
                        100% uang kembali jika tidak puas
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-16"
            variants={fadeIn}
            custom={2}
          >
            <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex -space-x-2">
                <img
                  className="w-10 h-10 rounded-full border-2 border-white"
                  src="https://api.dicebear.com/7.x/initials/svg?seed=Expert1&backgroundColor=2563eb"
                  alt="Expert"
                />
                <img
                  className="w-10 h-10 rounded-full border-2 border-white"
                  src="https://api.dicebear.com/7.x/initials/svg?seed=Expert2&backgroundColor=7dd3fc"
                  alt="Expert"
                />
                <img
                  className="w-10 h-10 rounded-full border-2 border-white"
                  src="https://api.dicebear.com/7.x/initials/svg?seed=Expert3&backgroundColor=84cc16"
                  alt="Expert"
                />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">
                  Tim ahli siap membantu Anda
                </p>
                <p className="text-blue-100 text-sm">
                  Konsultasi gratis 15 menit pertama
                </p>
              </div>
              <button className="px-6 py-2 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                Mulai Chat
              </button>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default ConsultationPage;
