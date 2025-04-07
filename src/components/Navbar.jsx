import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

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

    // Prevent body scrolling when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#12121200]/90 backdrop-blur-md shadow-sm"
            : "bg-[#1212126d]"
        }`}
      >
        <div className="relative px-4 py-4 flex justify-between items-center max-w-6xl mx-auto">
          <Link
            className="text-xs font-bold leading-none text-white flex items-center"
            to="/"
          >
            <svg
              className="h-8 sm:h-10 mr-2"
              alt="logo"
              viewBox="0 0 10240 10240"
            ></svg>
            <span className="text-sm sm:text-base">Floonder</span>
          </Link>
          <div className="lg:hidden">
            <button
              className="navbar-burger flex items-center text-white p-2"
              onClick={toggleMenu}
            >
              <svg
                className="block h-5 w-5 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Mobile menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </button>
          </div>
          <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-8">
            <li>
              <Link
                to="/"
                className="text-sm text-white hover:text-[#8b8b8b] transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li className="text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                className="w-4 h-4 current-fill"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </li>
            <li>
              <Link
                to="/about"
                className="text-sm text-white hover:text-[#8b8b8b] transition-colors duration-300"
              >
                About Us
              </Link>
            </li>
            <li className="text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                className="w-4 h-4 current-fill"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </li>
            <li>
              <Link
                to="/maps"
                className="text-sm text-white hover:text-[#8b8b8b] transition-colors duration-300"
              >
                Maps
              </Link>
            </li>
          </ul>
          <div className="hidden lg:block">
            <Link
              className="lg:ml-auto lg:mr-3 py-2 px-6 border border-[#6afffa] text-white hover:bg-cyan-600 hover:text-white text-sm font-bold rounded-full transition duration-300"
              to="/auth"
            >
              Sign In
            </Link>
            <Link
              className="lg:inline-block py-2 px-6 bg-cyan-500 hover:bg-white text-black font-bold rounded-full transition duration-300"
              to="/signup"
            >
              Sign up
            </Link>
          </div>
        </div>
        {/* Mobile Menu */}
        <div
          className={`navbar-menu fixed inset-0 z-50 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <div
            className="navbar-backdrop fixed inset-0 bg-black/90"
            onClick={toggleMenu}
          ></div>
          <nav className="fixed inset-0 w-full h-full bg-[#121212] overflow-auto">
            <div className="container mx-auto h-full flex flex-col">
              <div className="flex items-center justify-between p-4">
                <Link
                  className="text-2xl font-bold leading-none text-white flex items-center"
                  to="/"
                >
                  <svg
                    className="h-10 mr-2"
                    alt="logo"
                    viewBox="0 0 10240 10240"
                  ></svg>
                  Floonder
                </Link>
                <button
                  className="navbar-close text-white hover:text-[#8b8b8b]"
                  onClick={toggleMenu}
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="flex-grow px-4 py-2">
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/"
                      className="flex items-center p-3 text-base font-semibold text-white hover:bg-[#8b8b8b]/20 rounded-lg"
                      onClick={toggleMenu}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="flex items-center p-3 text-base font-semibold text-white hover:bg-[#8b8b8b]/20 rounded-lg"
                      onClick={toggleMenu}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/maps"
                      className="flex items-center p-3 text-base font-semibold text-white hover:bg-[#8b8b8b]/20 rounded-lg"
                      onClick={toggleMenu}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                        />
                      </svg>
                      Maps
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="p-4 mt-auto">
                <Link
                  to="/signin"
                  className="block w-full mb-3 px-4 py-3 text-center text-white border border-[#6afffa] hover:bg-cyan-600 font-semibold rounded-lg transition duration-300"
                  onClick={toggleMenu}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block w-full px-4 py-3 text-center text-black font-semibold bg-cyan-500 hover:bg-white rounded-lg transition duration-300"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </div>
              <div className="p-4 text-center text-white/50 text-sm">
                <p>© 2025 Floonder. All rights reserved.</p>
              </div>
            </div>
          </nav>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
