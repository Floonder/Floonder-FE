import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  Info,
  Map,
  AlertTriangle,
  Activity,
  MessageCircle,
  User,
  ChevronDown,
  Newspaper,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  const handleDropdown = (menu) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

  const menuItems = [
    {
      name: "Beranda",
      path: "/",
      icon: Home,
    },
    {
      name: "Peta Banjir",
      path: "/maps",
      icon: Map,
      // submenu: [
      //   { name: "Peta Real-time", path: "/maps/realtime" },
      //   { name: "Analisis Risiko", path: "/maps/risk-analysis" },
      //   { name: "Riwayat Banjir", path: "/maps/history" },
      // ],
    },
    {
      name: "Status Cuaca",
      path: "/weather",
      icon: AlertTriangle,
    },
    {
      name: "Anaitik",
      path: "/analytics",
      icon: Activity,
    },
    {
      name: "Konsultasi",
      path: "/consult",
      icon: MessageCircle,
    },
    {
      name: "Berita",
      path: "/news",
      icon: Newspaper,
    },
    {
      name: "Tentang",
      path: "/about",
      icon: Info,
    },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-100"
            : "bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div className="relative px-4 py-3 flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <a
            className="font-bold leading-none text-slate-800 flex items-center group"
            href="/"
          >
            <img src="Artboard 3.png" alt="logo" className="h-8 sm:h-10 mr-2" />
            <div className="flex flex-col">
              <span className="text-xl font-bold">
                Flo
                <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                  onder
                </span>
              </span>
              <span className="text-xs text-slate-500 -mt-1">
                GIS Flood System
              </span>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {menuItems.map((item) => (
              <div key={item.name} className="relative">
                {item.submenu ? (
                  <div className="relative">
                    <button
                      onClick={() => handleDropdown(item.name)}
                      className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.name}
                      <ChevronDown
                        className={`w-3 h-3 ml-1 transition-transform ${
                          dropdownOpen === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {dropdownOpen === item.name && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2">
                        {item.submenu.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.path}
                            className="block px-4 py-2 text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            onClick={() => setDropdownOpen(null)}
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.path}
                    className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Auth Button */}
          <div className="hidden lg:flex lg:items-center lg:space-x-3">
            <a
              href="/auth"
              className="flex items-center px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 text-sm font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <User className="w-4 h-4 mr-2" />
              Masuk
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              className="p-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              onClick={toggleMenu}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 z-50 transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={toggleMenu}
          />

          {/* Menu Panel */}
          <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <a
                href="/"
                className="flex items-center text-slate-800 font-bold"
                onClick={toggleMenu}
              >
                <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 p-2 rounded-xl mr-3">
                  <Map className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="text-lg">Floonder</span>
                  <div className="text-xs text-slate-500">GIS Flood System</div>
                </div>
              </a>
              <button
                onClick={toggleMenu}
                className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <div key={item.name}>
                    {item.submenu ? (
                      <div>
                        <button
                          onClick={() => handleDropdown(item.name)}
                          className="flex items-center justify-between w-full p-3 text-left text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        >
                          <div className="flex items-center">
                            <item.icon className="w-5 h-5 mr-3" />
                            {item.name}
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              dropdownOpen === item.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {dropdownOpen === item.name && (
                          <div className="ml-6 mt-2 space-y-1">
                            {item.submenu.map((subItem) => (
                              <a
                                key={subItem.name}
                                href={subItem.path}
                                className="block p-2 pl-4 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                onClick={toggleMenu}
                              >
                                {subItem.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <a
                        href={item.path}
                        className="flex items-center p-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        onClick={toggleMenu}
                      >
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.name}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Auth Section */}
            <div className="p-4 border-t border-slate-200 space-y-3">
              <a
                href="/auth"
                className="flex items-center justify-center w-full p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 font-semibold rounded-lg transition-all duration-300"
                onClick={toggleMenu}
              >
                <User className="w-5 h-5 mr-2" />
                Masuk
              </a>
            </div>

            {/* Footer */}
            <div className="p-4 text-center text-xs text-slate-500 border-t border-slate-200">
              © 2025 Floonder. Semua hak dilindungi.
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
