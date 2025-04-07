import React, { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.8, // Larger size
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.04 + 0.01,
      });
    }

    const animate = () => {
      ctx.fillStyle = "rgba(15, 15, 15, 0.3)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(6, 182, 212, ${star.opacity})`;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          star.size * 2
        );
        gradient.addColorStop(0, `rgba(6, 182, 212, ${star.opacity * 0.5})`);
        gradient.addColorStop(1, "rgba(6, 182, 212, 0)");
        ctx.fillStyle = gradient;
        ctx.fill();

        star.opacity += star.speed;

        if (star.opacity >= 1 || star.opacity <= 0.1) {
          star.speed = -star.speed;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-[#0F0F0F] text-white min-h-screen flex flex-col overflow-x-hidden relative">
      {/* Twinkling Stars Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                name: "Rahman Hakim",
                role: "Pengembang Backend",
                bio: "Pengembang backend berpengalaman dengan spesialisasi di Golang. Sangat tertarik membangun API yang skalabel dan layanan mikro.",
                img: "/maps1.png",
              },
              {
                name: "Dewi Puspita",
                role: "Desainer UI/UX",
                bio: "Desainer pemenang penghargaan dengan ketelitian tinggi. Menciptakan pengalaman pengguna yang menarik melalui sistem desain yang penuh pemikiran.",
                img: "/team2.jpg", // Fixed: Changed numeric value to proper image path
              },
              {
                name: "Aisha Nur Izzati",
                role: "Manajer Proyek",
                bio: "PM bersertifikat dengan pengalaman memimpin tim lintas fungsi. Memastikan proyek diselesaikan tepat waktu dan sesuai ruang lingkup.",
                img: "/team3.jpg", // Fixed: Changed numeric value to proper image path
              },
              {
                name: "Rio Ragil Ramdani",
                role: "Pengembang Frontend",
                bio: "Pengembang frontend dengan spesialisasi React dan Vue.js. Senang menciptakan aplikasi web interaktif dengan fokus pada performa.",
                img: "/team4.jpg", // Fixed: Changed numeric value to proper image path
              },
            ].map((member) => (
              <div
                key={member.name}
                className="bg-[#1A1A1A] rounded-lg overflow-hidden shadow border border-gray-800 
        transform transition-all duration-300 hover:bg-[#2A2A2A] hover:-translate-y-1"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-48 md:h-56 object-cover"
                />
                <div className="p-4 md:p-6">
                  <h3 className="font-bold text-white text-lg mb-1">
                    {member.name}
                  </h3>
                  <p className="text-cyan-400 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-400 mb-3 md:mb-4 text-base">
                    {member.bio}
                  </p>

                  <a
                    href="#"
                    className="text-cyan-400 hover:text-cyan-300 text-sm md:text-base font-medium"
                  >
                    Lihat Profil
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AboutUs;
