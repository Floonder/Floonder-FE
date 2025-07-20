import React from "react";
import {
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Shield,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative bg-gradient-to-br from-blue-50 via-cyan-50 to-slate-100 border-t border-blue-200 py-12 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-cyan-200 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 items-start">
          {/* Brand Section */}
          <div className="space-y-4 md:col-span-1">
            <h2 className="text-3xl font-bold text-slate-800">
              Flo<span className="text-blue-600">onder</span>
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Sistem GIS terdepan untuk penanganan banjir dan mitigasi risiko.
              Membantu pemerintah dan masyarakat dalam penanggulangan bencana.
            </p>
            <div className="flex space-x-3 pt-2">
              <a
                href="#"
                className="bg-blue-100 p-2 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="bg-blue-100 p-2 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="bg-blue-100 p-2 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800 text-lg border-b border-blue-200 pb-2">
              Navigasi
            </h3>
            <ul className="space-y-3 text-slate-600">
              {[
                "Beranda",
                "Peta Banjir",
                "Monitoring",
                "Peringatan Dini",
                "Tentang Kami",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-blue-600 transition-colors duration-200 text-sm flex items-center space-x-2"
                  >
                    <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800 text-lg border-b border-blue-200 pb-2">
              Layanan GIS
            </h3>
            <ul className="space-y-3 text-slate-600">
              {[
                "Analisis Risiko Banjir",
                "Pemetaan Area Rawan",
                "Sistem Peringatan",
                "Dashboard Monitoring",
                "Laporan Kejadian",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-blue-600 transition-colors duration-200 text-sm flex items-center space-x-2"
                  >
                    <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800 text-lg border-b border-blue-200 pb-2">
              Kontak
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-slate-600 text-sm">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Mail size={16} className="text-blue-600" />
                </div>
                <span>info@floonder.id</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600 text-sm">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Phone size={16} className="text-blue-600" />
                </div>
                <span>+62 21 5555 0123</span>
              </div>
              <div className="flex items-start space-x-3 text-slate-600 text-sm">
                <div className="bg-blue-100 p-2 rounded-lg mt-0.5">
                  <MapPin size={16} className="text-blue-600" />
                </div>
                <span>
                  Jakarta, Indonesia
                  <br />
                  Pusat Teknologi GIS
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Partners */}
          <div className="flex items-center space-x-4">
            <span className="text-slate-500 text-sm font-medium">
              Didukung oleh:
            </span>
            <div className="flex space-x-3">
              {[
                { name: "BMKG", src: "/bmkg-logo.png" },
                { name: "BPBD", src: "/bpbd-logo.png" },
                { name: "Kemendagri", src: "/kemendagri-logo.png" },
              ].map((partner, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg w-12 h-12 p-2 
                  flex items-center justify-center shadow-sm hover:shadow-md 
                  transition-all duration-300 border border-blue-100"
                >
                  <img
                    src={partner.src}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition duration-300"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentNode.innerHTML = `<span class="text-xs text-slate-400 font-medium">${partner.name}</span>`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-slate-500 text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end space-x-2 mb-1">
              <Shield size={16} className="text-blue-600" />
              <p className="text-sm font-medium">
                © {currentYear} Floonder GIS. Hak Cipta Dilindungi.
              </p>
            </div>
            <div className="flex space-x-4 text-xs justify-center md:justify-end">
              <a
                href="#"
                className="text-slate-400 hover:text-blue-600 transition-colors"
              >
                Kebijakan Privasi
              </a>
              <span className="text-slate-300">•</span>
              <a
                href="#"
                className="text-slate-400 hover:text-blue-600 transition-colors"
              >
                Syarat & Ketentuan
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
