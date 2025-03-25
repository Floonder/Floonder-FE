import React from "react";
import { LinkedinIcon, XIcon, InstagramIcon } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative bg-[#0F0F0F] text-white py-12 overflow-hidden">
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

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">
              Geo<span className="text-cyan-400">Insight</span>
            </h2>
            <p className="text-gray-400 max-w-xs">
              Transformasi bisnis Anda melalui teknologi GIS canggih. Dari
              analisis spasial hingga pemetaan strategis.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-cyan-500 hover:text-cyan-400 transition-colors"
              >
                <LinkedinIcon size={24} />
              </a>
              <a
                href="#"
                className="text-cyan-500 hover:text-cyan-400 transition-colors"
              >
                <XIcon size={24} />
              </a>
              <a
                href="#"
                className="text-cyan-500 hover:text-cyan-400 transition-colors"
              >
                <InstagramIcon size={24} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4 text-white">Halaman</h3>
              <ul className="space-y-3 text-gray-400">
                {["Beranda", "Tentang", "Peta"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Kontak</h3>
              <ul className="space-y-3 text-gray-400">
                {["Email", "Telepon", "Dukungan"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-6">
            <div className="flex space-x-4 opacity-50 items-center justify-end">
              {["Partner 1", "Partner 2", "Partner 3"].map((partner, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-full w-12 h-12 
                  flex items-center justify-center text-gray-500 text-xs"
                >
                  {partner}
                </div>
              ))}
            </div>
            <div className="text-gray-400 text-right">
              <p className="text-sm">
                © {currentYear} GeoInsight. Hak Cipta Dilindungi.
              </p>
              <a
                href="#"
                className="text-xs text-gray-500 hover:text-cyan-400 transition-colors"
              >
                Ketentuan Hukum
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
