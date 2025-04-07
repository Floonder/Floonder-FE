import React from "react";
import { LinkedinIcon, XIcon, InstagramIcon } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative bg-transparent text-white py-12 overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 max-w-6xl bg-transparent">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">
              Flo<span className="text-cyan-400">oder</span>
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
            <div className="flex space-x-4 items-center justify-end mt-6">
              {[
                { name: "Telkom", src: "/telkom.png" },
                { name: "Chevalier SAS", src: "/navbar-logo.png" },
                { name: "MAPID", src: "/mapid-revamp.png" },
              ].map((partner, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-xl w-16 h-16 p-2 
      flex items-center justify-center shadow-md hover:scale-105 
      transition-transform duration-300"
                >
                  <img
                    src={partner.src}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition duration-300"
                  />
                </div>
              ))}
            </div>

            <div className="text-gray-400 text-right">
              <p className="text-sm">
                © {currentYear} Floonder. Hak Cipta Dilindungi.
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
