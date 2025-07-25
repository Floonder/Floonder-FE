import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
  const canvasRef = useRef(null);
  // Animated wave background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();

    const waves = [];
    for (let i = 0; i < 3; i++) {
      waves.push({
        y: canvas.height * 0.5 + i * 50,
        amplitude: 30 + i * 10,
        frequency: 0.02 + i * 0.005,
        phase: (i * Math.PI) / 3,
        speed: 0.01 + i * 0.005,
        color:
          i === 0
            ? "rgba(59, 130, 246, 0.1)"
            : i === 1
            ? "rgba(34, 197, 94, 0.08)"
            : "rgba(14, 165, 233, 0.06)",
      });
    }

    let time = 0;
    let frameId;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, wave.y);

        for (let x = 0; x <= canvas.width; x += 5) {
          const y =
            wave.y +
            Math.sin(x * wave.frequency + wave.phase + time * wave.speed) *
              wave.amplitude;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      time += 1;
      frameId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const features = [
    {
      title: "Analisis Data Spasial",
      description:
        "Sistem analisis data geospasial yang mengolah data cuaca, topografi, dan pola historis untuk memberikan prediksi banjir yang akurat dan tepat waktu.",
      icon: "📊",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Monitoring Real-time",
      description:
        "Sistem pemantauan kontinyu dengan sensor yang tersebar di berbagai titik strategis untuk data yang selalu terkini dan up-to-date.",
      icon: "📡",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Visualisasi Interaktif",
      description:
        "Peta 3D interaktif dengan layer data yang intuitif, memudahkan interpretasi informasi geografis untuk pengambilan keputusan yang tepat.",
      icon: "🗺️",
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Sistem Peringatan Dini",
      description:
        "Notifikasi multi-channel yang memberikan peringatan tepat waktu kepada masyarakat dan instansi terkait melalui berbagai platform komunikasi.",
      icon: "🚨",
      color: "from-emerald-500 to-green-500",
    },
  ];

  const teamMembers = [
    {
      name: "Rahman Hakim",
      role: "GIS Specialist & Lead Analyst",
      expertise: "Geospatial Analysis • Remote Sensing",
      img: "/rahman.png",
      bio: "Ahli GIS dengan 8+ tahun pengalaman dalam analisis data spasial dan pengembangan sistem prediksi bencana. Lulusan Teknik Geodesi ITB dengan spesialisasi remote sensing.",
      achievements: [
        "15+ Proyek GIS",
        "Sertifikasi ESRI",
        "Research Publication",
      ],
    },
    {
      name: "Dewi Puspita",
      role: "Project Director & Strategy Lead",
      expertise: "Product Management • Agile Development",
      img: "/dewi.png",
      bio: "Manajer proyek bersertifikat PMP dengan track record mengelola proyek teknologi skala besar. Background dalam manajemen produk dan strategi bisnis digital.",
      achievements: ["20+ Proyek Sukses", "PMP Certified", "Agile Master"],
    },
    {
      name: "Aisha Nur Izzati",
      role: "Data Analyst & Business Intelligence",
      expertise: "Statistical Analysis • Data Visualization",
      img: "/icha.png",
      bio: "Data analyst dengan expertise dalam statistical modeling dan data visualization. Berpengalaman dalam mengembangkan model prediktif untuk aplikasi real-world.",
      achievements: [
        "Data Specialist",
        "Statistical Expert",
        "Research Papers",
      ],
    },
    {
      name: "Rio Ragil Ramdani",
      role: "Full-Stack Developer & Tech Lead",
      expertise: "React • Node.js • Cloud Architecture",
      img: "/rio.png",
      bio: "Senior developer dengan keahlian full-stack dan cloud architecture. Spesialis dalam membangun aplikasi web real-time yang scalable dan performant.",
      achievements: ["Cloud Architect", "React Expert", "DevOps Pro"],
    },
  ];

  const timeline = [
    {
      year: "Jan 2025",
      event: "Peluncuran resmi platform Floonder versi beta",
      icon: "🚀",
      color: "bg-blue-500",
    },
    {
      year: "Feb 2025",
      event: "Implementasi sistem monitoring di 3 kota pilot",
      icon: "📡",
      color: "bg-green-500",
    },
    {
      year: "Mar 2025",
      event: "Integrasi dengan BMKG untuk data cuaca real-time",
      icon: "🤝",
      color: "bg-blue-600",
    },
    {
      year: "Apr 2025",
      event: "Ekspansi coverage area ke 10 kota di Jawa",
      icon: "🏙️",
      color: "bg-green-600",
    },
    {
      year: "Mei 2025",
      event: "Peluncuran aplikasi mobile untuk masyarakat",
      icon: "📱",
      color: "bg-cyan-500",
    },
    {
      year: "Q3 2025",
      event: "Target melayani 25+ kota dengan sistem terintegrasi",
      icon: "🎯",
      color: "bg-emerald-500",
    },
  ];

  const visionMission = {
    vision: {
      title: "Visi Kami",
      content:
        "Menjadi platform prediksi banjir terdepan di Indonesia yang memanfaatkan teknologi geospasial untuk melindungi masyarakat dan menciptakan lingkungan yang lebih aman dan berkelanjutan.",
      icon: "🔮",
      color: "from-blue-500 to-cyan-500",
    },
    mission: {
      title: "Misi Kami",
      items: [
        "Mengembangkan sistem prediksi banjir yang akurat menggunakan teknologi GIS dan big data analytics",
        "Menyediakan platform monitoring real-time yang mudah diakses oleh pemerintah dan masyarakat",
        "Membangun sistem peringatan dini yang efektif untuk mengurangi risiko bencana banjir",
        "Mendukung pengambilan keputusan berbasis data untuk mitigasi bencana yang lebih baik",
        "Berkontribusi dalam pembangunan Indonesia yang tangguh terhadap perubahan iklim",
      ],
      icon: "🎯",
      color: "from-green-500 to-emerald-500",
    },
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 text-gray-900 min-h-screen overflow-hidden">
      {/* Animated Wave Background */}
      <Navbar />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
      />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-green-200/30 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-cyan-200/20 rounded-full blur-xl animate-pulse delay-2000" />

      {/* About Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                  <span>🎯</span> Tentang Floonder
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Mengubah Cara Dunia
                  <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                    {" "}
                    Menghadapi Banjir
                  </span>
                </h2>

                <p className="text-lg text-gray-600 leading-relaxed">
                  Floonder adalah platform WEB GIS revolusioner yang
                  menggabungkan analisis data spasial, sistem monitoring
                  canggih, dan teknologi cloud untuk memberikan prediksi banjir
                  yang akurat dan sistem peringatan dini yang dapat
                  menyelamatkan nyawa dan harta benda.
                </p>

                <p className="text-lg text-gray-600 leading-relaxed">
                  Dengan tim ahli yang terdiri dari spesialis GIS, data analyst,
                  dan engineer berpengalaman, kami berkomitmen untuk menciptakan
                  solusi teknologi yang memberikan dampak nyata bagi masyarakat
                  Indonesia.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    2024
                  </div>
                  <div className="text-sm text-blue-700 font-medium">
                    Tahun Didirikan
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    10M+
                  </div>
                  <div className="text-sm text-green-700 font-medium">
                    Data Diproses
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative z-10">
                <div className="absolute -top-6 -left-6 w-full h-full bg-gradient-to-br from-blue-200 to-green-200 rounded-3xl opacity-30" />
                <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-white/50">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
                    <img
                      src="/maps1.png"
                      alt="Floonder Dashboard"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="text-lg font-bold text-gray-900 mb-1">
                        Live Monitoring
                      </div>
                      <div className="text-sm text-gray-600">
                        Real-time flood prediction data
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">✓</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="relative z-10 py-20 px-6 bg-white/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>✨</span> Visi & Misi
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Komitmen & Tujuan Kami
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Landasan filosofis yang mengarahkan setiap langkah dalam
              menciptakan masa depan yang lebih aman
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="group"
            >
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-sm hover:shadow-lg transition-all duration-500 hover:scale-105 h-full">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${visionMission.vision.color} rounded-2xl flex items-center justify-center text-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {visionMission.vision.icon}
                </div>

                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  {visionMission.vision.title}
                </h3>

                <p className="text-lg text-gray-600 leading-relaxed">
                  {visionMission.vision.content}
                </p>

                <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                  <div className="text-sm text-blue-700 font-medium mb-1">
                    Target 2030
                  </div>
                  <div className="text-xs text-blue-600">
                    Melindungi 50+ kota di Indonesia dengan teknologi prediksi
                    banjir
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="group"
            >
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-sm hover:shadow-lg transition-all duration-500 hover:scale-105 h-full">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${visionMission.mission.color} rounded-2xl flex items-center justify-center text-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {visionMission.mission.icon}
                </div>

                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  {visionMission.mission.title}
                </h3>

                <div className="space-y-4">
                  {visionMission.mission.items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Values Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 grid md:grid-cols-3 gap-6"
          >
            {[
              {
                title: "Inovasi",
                description:
                  "Terus mengembangkan teknologi terdepan untuk solusi yang lebih baik",
                icon: "💡",
                color: "from-blue-500 to-blue-600",
              },
              {
                title: "Integritas",
                description:
                  "Transparan dan akuntabel dalam setiap layanan yang kami berikan",
                icon: "🤝",
                color: "from-green-500 to-green-600",
              },
              {
                title: "Dampak",
                description:
                  "Fokus pada hasil nyata yang memberikan manfaat bagi masyarakat",
                icon: "🌟",
                color: "from-purple-500 to-purple-600",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center text-xl text-white mb-4`}
                >
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {value.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>⚡</span> Teknologi Unggulan
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Inovasi Terdepan
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kombinasi analisis geospasial, big data, dan sistem monitoring
              untuk solusi prediksi banjir yang inovatif
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="group bg-white/70 backdrop-blur-sm p-8 rounded-3xl border border-white/50 shadow-sm hover:shadow-lg transition-all duration-500 hover:scale-105"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>📈</span> Perjalanan Kami
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Milestone & Pencapaian
              </span>
            </h2>
          </motion.div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? "text-right" : "text-left"
                  }`}
                >
                  <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-sm">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      {item.year}
                    </div>
                    <p className="text-gray-600">{item.event}</p>
                  </div>
                </div>
                <div
                  className={`w-6 h-6 ${item.color} rounded-full flex-shrink-0 border-4 border-white shadow-md`}
                />
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative z-10 py-20 px-6 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>👥</span> Tim Profesional
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Para Ahli Terbaik
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tim multidisiplin dengan keahlian tinggi yang berdedikasi
              menciptakan solusi teknologi terdepan
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="group bg-white/70 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/50 shadow-sm hover:shadow-lg transition-all duration-500 hover:scale-105"
              >
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-green-100 relative overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold text-sm mb-2">
                    {member.role}
                  </p>
                  <p className="text-green-600 text-xs font-medium mb-4">
                    {member.expertise}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {member.achievements.map((achievement, i) => (
                      <span
                        key={i}
                        className="bg-gradient-to-r from-blue-100 to-green-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-blue-500 to-green-500 rounded-3xl p-12 text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-green-600/20 backdrop-blur-sm" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Siap Bergabung dengan Masa Depan?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
                Jadilah bagian dari revolusi prediksi banjir. Mulai gunakan
                Floonder hari ini dan rasakan perbedaan teknologi geospasial
                dalam melindungi komunitas Anda.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-lg">
                  Mulai Sekarang - Gratis
                </button>
                <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300">
                  Konsultasi dengan Tim
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutUs;
