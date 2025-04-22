import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const cardVariant = {
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

const AboutUs = () => {
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
        xRatio: Math.random(), // Posisi relatif (0-1)
        yRatio: Math.random(), // Posisi relatif (0-1)
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

  const teamMembers = [
    {
      name: "Rahman Hakim",
      role: "GIS Analyst",
      bio: "GIS expert with experience in spatial data analysis. Has expertise in processing and analyzing geospatial data to support decision making.",
      img: "/rahman.png",
    },
    {
      name: "Dewi Puspita",
      role: "Project Manager",
      bio: "Experienced project manager with a background in software development. Ensures projects run smoothly and according to schedule.",
      img: "/dewi.png",
    },
    {
      name: "Aisha Nur Izzati",
      role: "Business Analyst",
      bio: "Business analyst focusing on understanding user needs and developing data-driven solutions. Has experience in market analysis and business strategy.",
      img: "/icha.png",
    },
    {
      name: "Rio Ragil Ramdani",
      role: "Developer",
      bio: "Software developer with expertise in web and mobile application development. Experienced in various technologies and programming languages.",
      img: "/rio.png",
    },
  ];

  return (
    <div className="bg-[#0F0F0F] text-white min-h-screen flex flex-col overflow-x-hidden relative">
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

        {/* About Us Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16 mt-10 md:mt-20">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-cyan-400">
              TENTANG KAMI
            </h2>
            <p className="text-base md:text-lg text-gray-400 mb-6">
              Aplikasi GIS ini dibuat oleh tim yang terdiri dari para ahli data
              spasial dan pengembang perangkat lunak dengan tujuan menyediakan
              informasi geografis yang lebih mudah diakses dan dapat
              ditindaklanjuti. Kami bertujuan menghadirkan alat analisis spasial
              yang kuat untuk membantu organisasi membuat keputusan berbasis
              data melalui visualisasi intuitif dan kemampuan pemetaan yang
              canggih.
            </p>
            <button
              className="bg-cyan-500 hover:bg-cyan-600 text-black px-6 md:px-8 py-2 md:py-3 
              rounded-full font-medium transition-all duration-300 
              transform hover:-translate-y-1 hover:shadow-lg w-40 md:w-48 uppercase text-sm"
            >
              Jelajahi
            </button>
          </div>

          {/* Image Section */}
          <div className="relative h-64 sm:h-80 md:h-96 mt-6 md:mt-0 order-first md:order-last">
            <div className="absolute right-0 top-0 w-3/4 h-40 sm:h-48 md:h-56 z-10">
              <img
                src="/maps1.png"
                alt="Peta"
                className="w-full h-full object-cover rounded-lg shadow-md border border-gray-800"
              />
            </div>

            <div className="absolute left-0 bottom-0 w-2/3 h-48 sm:h-56 md:h-64">
              <img
                src="/maps2.png"
                alt="Peta"
                className="w-full h-full object-cover rounded-lg shadow-md border border-gray-800"
              />

              <div className="absolute right-4 md:right-6 bottom-4 md:bottom-6 bg-cyan-500 text-black px-4 md:px-6 py-2 md:py-3 rounded">
                <p className="font-bold text-xl md:text-2xl">10+</p>
                <p className="text-base md:text-lg">Lokasi</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16 md:mb-24">
          <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-10 text-cyan-400">
            Tim Kami
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4 sm:px-6 lg:px-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="group bg-gradient-to-br from-[#1F2937] to-[#111827] rounded-2xl p-[1px] shadow-lg hover:shadow-xl transition-all duration-300"
                variants={cardVariant}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden flex flex-col h-full">
                  {/* Image */}
                  <div className="w-full h-40 sm:h-48 md:h-56 relative">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder-image.jpg";
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5 md:p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="font-semibold text-white text-lg sm:text-xl mb-1">
                        {member.name}
                      </h3>
                      <span className="inline-block bg-cyan-800/30 text-cyan-300 text-xs font-medium px-3 py-1 rounded-full mb-3">
                        {member.role}
                      </span>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-4">
                        {member.bio}
                      </p>
                    </div>

                    <div className="mt-4 sm:mt-5">
                      <a
                        href="#"
                        className="inline-block w-full text-center bg-cyan-500 hover:bg-cyan-400 text-white text-sm sm:text-base font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                      >
                        Lihat Profil
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AboutUs;
