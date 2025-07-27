import React from "react";

const Hero = () => {
  return (
    <section className="relative text-gray-900 py-16 md:py-24 px-4 overflow-hidden h-full bg-gradient-to-br from-slate-50 via-blue-50/40 to-cyan-50/60">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-r from-emerald-200/15 to-teal-200/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-200/10 to-pink-200/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto mt-10">
        <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
            Floonder
          </span>{" "}
          <span className="text-slate-800">– Prediksi Banjir</span>
          <br />
          <span className="text-slate-800">Berbasis Web GIS</span>
        </h1>
        <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
          Platform prediksi banjir yang interaktif dan berbasis data spasial
          untuk membantu masyarakat dan pemerintah menghadapi risiko banjir di
          Indonesia.
        </p>

        {/* Enhanced CTA Button */}
        <div className="mb-16 flex flex-wrap justify-center gap-4">
          <a
            href="/maps"
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white 
            px-8 py-4 rounded-2xl font-semibold text-lg
            transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl
            border-2 border-transparent hover:border-white/20
            before:absolute before:inset-0 before:bg-white/10 before:rounded-2xl before:opacity-0 
            hover:before:opacity-100 before:transition-opacity before:duration-300
            overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 relative z-10 transition-transform group-hover:scale-110 group-hover:rotate-12"
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
            <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
              Lihat Peta
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 relative z-10 transition-transform group-hover:translate-x-2"
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

        {/* Enhanced Statistics with individual gradients and animations */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-16">
          {[
            {
              value: "34+",
              label: "Provinsi Terpantau",
              gradient: "from-blue-500 to-cyan-400",
              icon: "🌍",
              delay: "delay-0",
            },
            {
              value: "95%",
              label: "Akurasi Prediksi",
              gradient: "from-emerald-500 to-teal-400",
              icon: "🎯",
              delay: "delay-150",
            },
            {
              value: "100K+",
              label: "Pengguna Aktif",
              gradient: "from-purple-500 to-indigo-400",
              icon: "👥",
              delay: "delay-300",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className={`group bg-white/90 backdrop-blur-sm p-6 rounded-3xl border border-white/60
              transform transition-all duration-500 hover:scale-110 hover:shadow-2xl 
              min-w-[180px] shadow-xl relative overflow-hidden ${stat.delay}
              animate-fade-in-up`}
            >
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
              ></div>

              {/* Icon */}
              <div className="text-3xl mb-2 transform group-hover:scale-125 transition-transform duration-300">
                {stat.icon}
              </div>

              {/* Value with gradient */}
              <span
                className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent block mb-2 relative z-10`}
              >
                {stat.value}
              </span>

              {/* Label */}
              <span className="text-slate-600 text-sm font-medium relative z-10 group-hover:text-slate-700 transition-colors">
                {stat.label}
              </span>

              {/* Floating particles effect */}
              <div
                className={`absolute top-2 right-2 w-2 h-2 bg-gradient-to-r ${stat.gradient} rounded-full opacity-60 group-hover:animate-bounce`}
              ></div>
              <div
                className={`absolute bottom-3 left-3 w-1 h-1 bg-gradient-to-r ${stat.gradient} rounded-full opacity-40 group-hover:animate-pulse`}
              ></div>
            </div>
          ))}
        </div>

        {/* Trusted by Section - keeping content unchanged but enhancing visuals */}
        <div className="text-slate-600">
          <div className="relative mb-6">
            <p className="text-center font-medium text-lg relative z-10">
              Dipercaya oleh instansi pemerintah dan organisasi di Indonesia
            </p>
            {/* Decorative underline */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full opacity-30"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              {
                name: "BMKG",
                src: "/BMKG.png",
                gradient: "from-blue-500 to-cyan-400",
              },
              {
                name: "BPNP",
                src: "/BNPB.png",
                gradient: "from-emerald-500 to-teal-400",
              },
              {
                name: "Kemendagri",
                src: "/Kemendagri.png",
                gradient: "from-orange-500 to-amber-400",
              },
              {
                name: "PUPR",
                src: "/PUPR.png",
                gradient: "from-purple-500 to-indigo-400",
              },
              {
                name: "Telkom University",
                src: "/telkom.png",
                gradient: "from-pink-500 to-rose-400",
              },
            ].map((partner, index) => (
              <div
                key={index}
                className={`group bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4
                flex items-center justify-center shadow-lg hover:scale-110 
                transition-all duration-500 hover:shadow-xl border border-white/60 gap-3
                relative overflow-hidden animate-fade-in delay-${index * 100}`}
              >
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${partner.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}
                ></div>

                <span className="text-2xl relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={partner.src}
                    alt={partner.name}
                    className="h-7 filter group-hover:brightness-110 transition-all duration-300"
                  />
                </span>
                <span className="text-sm font-medium text-slate-700 relative z-10 group-hover:text-slate-800 transition-colors">
                  {partner.name}
                </span>

                {/* Subtle glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${partner.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;
