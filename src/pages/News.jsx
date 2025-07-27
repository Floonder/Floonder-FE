import { useState, useEffect, useRef } from "react";
import { Clock, Star, TrendingUp } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FloonderNews = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleElements, setVisibleElements] = useState(new Set());
  const elementRefs = useRef({});

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(
              (prev) => new Set([...prev, entry.target.dataset.id])
            );
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px 0px -50px 0px",
      }
    );

    Object.values(elementRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Set ref for elements
  const setElementRef = (id) => (ref) => {
    elementRefs.current[id] = ref;
  };

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle mouse movement for interactive background
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const categories = [
    "Semua",
    "Teknologi GIS",
    "Mitigasi Bencana",
    "IoT & Sensor",
    "Remote Sensing",
    "Community Alert",
    "Research & Development",
    "Kemitraan",
    "Tutorial GIS",
  ];

  const newsData = [
    {
      id: 1,
      title:
        "Sistem Prediksi Banjir AI Floonder Berhasil Prediksi Banjir Jakarta dengan Akurasi 98%",
      excerpt:
        "Platform Web GIS terdepan berhasil memberikan peringatan dini banjir 6 jam sebelum kejadian dengan tingkat akurasi tertinggi...",
      category: "Teknologi GIS",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400",
      time: "2 jam yang lalu",
      author: "GIS Analytics Team",
      featured: true,
    },
    {
      id: 2,
      title:
        "BMKG dan Floonder Kolaborasi Tingkatkan Sistem Peringatan Dini Banjir Nasional",
      excerpt:
        "Kerjasama strategis untuk mengintegrasikan data meteorologi real-time dengan teknologi Web GIS prediksi banjir...",
      category: "Kemitraan",
      image:
        "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400",
      time: "4 jam yang lalu",
      author: "Partnership Analyst",
      featured: false,
    },
    {
      id: 3,
      title:
        "Peta Interaktif Floonder Bantu Evakuasi 10.000 Warga Saat Banjir Bandung",
      excerpt:
        "Fitur real-time mapping dan route optimization membantu tim SAR dan warga dalam proses evakuasi darurat...",
      category: "Mitigasi Bencana",
      image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=400",
      time: "6 jam yang lalu",
      author: "Disaster Management Reporter",
      featured: true,
    },
    {
      id: 4,
      title:
        "Teknologi Sensor IoT Terintegrasi Floonder Perluas Cakupan Monitoring Curah Hujan",
      excerpt:
        "Penambahan 500 sensor IoT di seluruh Indonesia meningkatkan akurasi data hidrologi untuk prediksi banjir yang lebih tepat...",
      category: "IoT & Sensor",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
      time: "8 jam yang lalu",
      author: "IoT Technology Writer",
      featured: false,
    },
    {
      id: 5,
      title:
        "Floonder Raih Penghargaan 'Best GIS Innovation' di Indonesia Geospatial Expo 2024",
      excerpt:
        "Platform prediksi banjir berbasis Web GIS diakui sebagai inovasi terbaik dalam bidang geospasial dan mitigasi bencana...",
      category: "Penghargaan",
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400",
      time: "1 hari yang lalu",
      author: "Geospatial Correspondent",
      featured: true,
    },
  ];

  const recommendations = [
    {
      id: 6,
      title: "Tutorial: Membaca Peta Risiko Banjir di Platform Floonder",
      category: "Tutorial GIS",
      time: "3 jam yang lalu",
    },
    {
      id: 7,
      title: "Tips Menggunakan Data Satelit untuk Monitoring Banjir",
      category: "Remote Sensing",
      time: "5 jam yang lalu",
    },
    {
      id: 8,
      title: "Panduan Lengkap Sistem Peringatan Dini Banjir Berbasis Komunitas",
      category: "Community Alert",
      time: "7 jam yang lalu",
    },
  ];

  const bestOfWeek = [
    {
      id: 9,
      title: "Revolusi Prediksi Banjir: Dari Tradisional ke AI-Powered GIS",
      views: "125K",
      category: "Deep Dive GIS",
    },
    {
      id: 10,
      title:
        "Kisah Sukses Desa Tangguh Banjir dengan Bantuan Teknologi Floonder",
      views: "98K",
      category: "Community Impact",
    },
    {
      id: 11,
      title:
        "Breakthrough: Integrasi Big Data Cuaca dan Topografi untuk Prediksi Akurat",
      views: "87K",
      category: "Research & Development",
    },
  ];

  const filteredNews =
    activeCategory === "Semua"
      ? newsData
      : newsData.filter((news) => news.category === activeCategory);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />

        {/* Floating circles with parallax */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-20 animate-pulse"
              style={{
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                left: `${10 + i * 12}%`,
                top: `${5 + i * 8}%`,
                background:
                  i % 2 === 0
                    ? "linear-gradient(45deg, #3b82f6, #06b6d4)"
                    : "linear-gradient(45deg, #10b981, #34d399)",
                transform: `translateY(${
                  scrollY * (0.02 + i * 0.01)
                }px) translateX(${mousePosition.x * 0.02}px)`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Geometric shapes with mouse interaction */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={`geo-${i}`}
              className="absolute opacity-10"
              style={{
                width: `${80 + i * 30}px`,
                height: `${80 + i * 30}px`,
                right: `${5 + i * 8}%`,
                top: `${10 + i * 15}%`,
                background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                transform: `
                  translateY(${scrollY * (0.05 + i * 0.015)}px) 
                  translateX(${mousePosition.x * -0.03}px)
                  rotate(${mousePosition.x * 0.1 + i * 45}deg)
                `,
                borderRadius: i % 3 === 0 ? "50%" : i % 3 === 1 ? "20%" : "0%",
                animation: `float ${4 + i * 0.7}s ease-in-out infinite`,
                animationDelay: `${i * 0.8}s`,
              }}
            />
          ))}
        </div>

        {/* Waves animation */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden opacity-30">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-20"
            style={{
              transform: `translateY(${scrollY * -0.05}px)`,
            }}
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="url(#wave-gradient)"
              opacity="0.5"
            />
            <defs>
              <linearGradient
                id="wave-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating particles */}
        {/* <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `translateY(${
                  scrollY * (0.1 + Math.random() * 0.1)
                }px)`,
                animation: `floatParticle ${
                  5 + Math.random() * 5
                }s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div> */}
      </div>

      {/* Add keyframes for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes floatParticle {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.4;
          }
          25% {
            transform: translateY(-30px) translateX(10px);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-10px) translateX(-5px);
            opacity: 0.6;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.5) rotate(-5deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
        }
        .animate-zoomIn {
          animation: zoomIn 1s ease-out forwards;
        }
        .animate-delay-100 {
          animation-delay: 0.1s;
        }
        .animate-delay-200 {
          animation-delay: 0.2s;
        }
        .animate-delay-300 {
          animation-delay: 0.3s;
        }
        .animate-delay-400 {
          animation-delay: 0.4s;
        }
        .animate-delay-500 {
          animation-delay: 0.5s;
        }
        .animate-delay-600 {
          animation-delay: 0.6s;
        }
        .animate-delay-700 {
          animation-delay: 0.7s;
        }
        .animate-delay-800 {
          animation-delay: 0.8s;
        }
        .initial-hidden {
          opacity: 0;
        }
      `}</style>

      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16  relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Categories */}
            <div className="mb-8">
              <div
                ref={setElementRef("categories")}
                data-id="categories"
                className={`flex flex-wrap gap-2 mb-6 initial-hidden ${
                  visibleElements.has("categories") ? "animate-fadeInUp" : ""
                }`}
              >
                {categories.map((category, index) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 backdrop-blur-sm ${
                      activeCategory === category
                        ? "bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg"
                        : "bg-white/80 text-gray-700 border border-gray-300 hover:border-blue-500 hover:text-blue-600 hover:bg-white/90"
                    }`}
                    style={{
                      animationDelay: visibleElements.has("categories")
                        ? `${index * 0.1}s`
                        : "0s",
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured News */}
            <div className="mb-8">
              <h2
                ref={setElementRef("featured-title")}
                data-id="featured-title"
                className={`text-2xl font-bold text-gray-800 mb-6 flex items-center initial-hidden ${
                  visibleElements.has("featured-title")
                    ? "animate-slideInLeft"
                    : ""
                }`}
              >
                <Star className="w-6 h-6 mr-2 text-yellow-500" />
                Berita Utama
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredNews
                  .filter((news) => news.featured)
                  .map((news, index) => (
                    <article
                      key={news.id}
                      ref={setElementRef(`featured-${news.id}`)}
                      data-id={`featured-${news.id}`}
                      className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-white/95 initial-hidden ${
                        visibleElements.has(`featured-${news.id}`)
                          ? "animate-scaleIn"
                          : ""
                      }`}
                      style={{
                        animationDelay: visibleElements.has(
                          `featured-${news.id}`
                        )
                          ? `${index * 0.2}s`
                          : "0s",
                      }}
                    >
                      <div className="relative">
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {news.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                          {news.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {news.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {news.time}
                          </span>
                          <span>{news.author}</span>
                        </div>
                      </div>
                    </article>
                  ))}
              </div>
            </div>

            {/* All News */}
            <div>
              <h2
                ref={setElementRef("all-news-title")}
                data-id="all-news-title"
                className={`text-2xl font-bold text-gray-800 mb-6 initial-hidden ${
                  visibleElements.has("all-news-title")
                    ? "animate-slideInRight"
                    : ""
                }`}
              >
                Semua Berita
              </h2>
              <div className="space-y-6">
                {filteredNews.map((news, index) => (
                  <article
                    key={news.id}
                    ref={setElementRef(`news-${news.id}`)}
                    data-id={`news-${news.id}`}
                    className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:bg-white/95 initial-hidden ${
                      visibleElements.has(`news-${news.id}`)
                        ? index % 2 === 0
                          ? "animate-slideInLeft"
                          : "animate-slideInRight"
                        : ""
                    }`}
                    style={{
                      animationDelay: visibleElements.has(`news-${news.id}`)
                        ? `${(index % 4) * 0.15}s`
                        : "0s",
                    }}
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center mb-2">
                          <span className="bg-gradient-to-r from-blue-100 to-green-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mr-3">
                            {news.category}
                          </span>
                          <span className="text-gray-500 text-sm flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {news.time}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">
                          {news.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{news.excerpt}</p>
                        <div className="text-sm text-gray-500">
                          By {news.author}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Recommendations */}
            <div
              ref={setElementRef("recommendations")}
              data-id="recommendations"
              className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 hover:bg-white/95 transition-all duration-300 initial-hidden ${
                visibleElements.has("recommendations") ? "animate-zoomIn" : ""
              }`}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                Rekomendasi
              </h3>
              <div className="space-y-4">
                {recommendations.map((item, index) => (
                  <div
                    key={item.id}
                    className={`border-b border-gray-200 pb-4 last:border-b-0 last:pb-0 initial-hidden ${
                      visibleElements.has("recommendations")
                        ? "animate-fadeInUp"
                        : ""
                    }`}
                    style={{
                      animationDelay: visibleElements.has("recommendations")
                        ? `${0.3 + index * 0.1}s`
                        : "0s",
                    }}
                  >
                    <h4 className="font-semibold text-gray-800 mb-2 hover:text-blue-600 cursor-pointer transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {item.category}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {item.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Best of the Week */}
            <div
              ref={setElementRef("best-week")}
              data-id="best-week"
              className={`bg-gradient-to-br from-blue-500 to-green-500 rounded-xl shadow-lg p-6 text-white backdrop-blur-sm initial-hidden ${
                visibleElements.has("best-week")
                  ? "animate-scaleIn animate-delay-200"
                  : ""
              }`}
            >
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-300" />
                Best of the Week
              </h3>
              <div className="space-y-4">
                {bestOfWeek.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex items-start space-x-3 initial-hidden ${
                      visibleElements.has("best-week")
                        ? "animate-slideInRight"
                        : ""
                    }`}
                    style={{
                      animationDelay: visibleElements.has("best-week")
                        ? `${0.5 + index * 0.15}s`
                        : "0s",
                    }}
                  >
                    <div className="bg-white/20 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold">#{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1 hover:text-yellow-300 cursor-pointer transition-colors">
                        {item.title}
                      </h4>
                      <div className="flex items-center justify-between text-sm text-white/80">
                        <span className="bg-white/20 px-2 py-1 rounded text-xs">
                          {item.category}
                        </span>
                        <span>{item.views} views</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FloonderNews;
