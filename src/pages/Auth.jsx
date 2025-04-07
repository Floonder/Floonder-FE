import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [animateBackground, setAnimateBackground] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Start animation after component mounts
    setAnimateBackground(true);

    // Add floating particles effect
    const container = document.querySelector(".particles-container");
    if (container) {
      for (let i = 0; i < 15; i++) {
        createParticle(container);
      }
    }
  }, []);

  const createParticle = (container) => {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Random size between 5px and 15px
    const size = Math.random() * 10 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;

    // Random opacity
    particle.style.opacity = Math.random() * 0.6 + 0.2;

    // Random animation duration
    const duration = Math.random() * 20 + 10;
    particle.style.animation = `float ${duration}s ease-in-out infinite`;
    particle.style.animationDelay = `${Math.random() * 5}s`;

    container.appendChild(particle);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const apiUrl = `${import.meta.env.VITE_HOST_API}/api/auth/login`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        mode: "cors",
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = "Login failed";

        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          errorMessage = errorText || errorMessage;
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.data && data.data.access) {
        localStorage.setItem("accessToken", data.data.access);
      }
      if (data.data && data.data.email) {
        const userData = {
          email: data.data.email,
          id: data.data.id,
        };
        localStorage.setItem("user", JSON.stringify(userData));
      }

      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#121212] to-[#1e1e1e] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden particles-container">
        <div
          className={`absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5 ${
            animateBackground ? "animate-grid" : ""
          }`}
        ></div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl"></div>
      </div>

      <Navbar className="z-20 relative" />

      <div className="flex-grow flex items-center justify-center mt-40 mb-10 px-4 relative z-10">
        <div className="relative w-full max-w-md px-6 py-12 bg-[#121212]/80 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-2xl">
          {/* Card glow effect */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <div className="absolute inset-x-0 -top-40 -bottom-40 bg-gradient-to-r from-cyan-500/10 via-cyan-500/5 to-purple-500/10 transform rotate-12"></div>
          </div>

          {/* Card decorative accents */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-tr-full"></div>

          {/* Logo and heading */}
          <div className="text-center mb-8 relative">
            <Link
              to="/"
              className="inline-flex items-center justify-center mb-6 transform transition hover:scale-105"
            >
              <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">
                Floonder
              </span>
            </Link>
            <h2 className="text-2xl font-bold text-white">Welcome back</h2>
            <p className="text-gray-400 mt-2">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6 relative" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-sm animate-pulse">
                <div className="flex">
                  <svg
                    className="h-5 w-5 text-red-400 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p>{error}</p>
                </div>
              </div>
            )}

            <div className="group">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-cyan-400 transition-colors"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 group-hover:text-cyan-400 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#1e1e1e]/80 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="group">
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 group-hover:text-cyan-400 transition-colors"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-cyan-500 hover:text-cyan-400 transition duration-200"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 group-hover:text-cyan-400 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  id="password"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#1e1e1e]/80 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-600 rounded bg-gray-700"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-300"
              >
                Remember me
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-black bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition duration-200 disabled:opacity-70 transform hover:scale-105 active:scale-95"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>

          {/* Sign up link */}
          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-cyan-500 hover:text-cyan-400 transition duration-200"
            >
              Sign up for free
            </Link>
          </p>

          {/* Divider */}
          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#121212] text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social logins */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="flex justify-center items-center py-2 px-4 border border-gray-700 rounded-lg shadow-sm bg-[#1a1a1a] hover:bg-[#222] text-gray-300 transition duration-200 transform hover:scale-105 active:scale-95">
              <svg
                className="h-5 w-5 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
            <button className="flex justify-center items-center py-2 px-4 border border-gray-700 rounded-lg shadow-sm bg-[#1a1a1a] hover:bg-[#222] text-gray-300 transition duration-200 transform hover:scale-105 active:scale-95">
              <svg
                className="h-5 w-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm0 3.43c2.4 0 2.68.01 3.63.05.87.04 1.35.18 1.67.31.42.16.72.36 1.03.67.31.31.5.61.67 1.03.12.32.27.8.3 1.67.05.94.06 1.23.06 3.63s-.01 2.68-.05 3.63c-.04.87-.18 1.35-.31 1.67-.16.42-.36.72-.67 1.03-.31.31-.61.5-1.03.67-.32.12-.8.27-1.67.3-.94.05-1.23.06-3.63.06s-2.68-.01-3.63-.05c-.87-.04-1.35-.18-1.67-.31-.42-.16-.72-.36-1.03-.67-.31-.31-.5-.61-.67-1.03-.12-.32-.27-.8-.3-1.67-.05-.94-.06-1.23-.06-3.63s.01-2.68.05-3.63c.04-.87.18-1.35.31-1.67.16-.42.36-.72.67-1.03.31-.31.61-.5 1.03-.67.32-.12.8-.27 1.67-.3.94-.05 1.23-.06 3.63-.06z" />
                <path d="M12 15.88c-2.14 0-3.88-1.74-3.88-3.88S9.86 8.12 12 8.12s3.88 1.74 3.88 3.88-1.74 3.88-3.88 3.88zm0-9.88c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" />
                <circle cx="18.3" cy="5.7" r="1.2" />
              </svg>
              GitHub
            </button>
          </div>
        </div>
      </div>

      <Footer className="relative z-20" />

      {/* Add the CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }

        .particle {
          position: absolute;
          background-color: rgba(103, 232, 249, 0.15);
          border-radius: 50%;
          pointer-events: none;
        }

        .bg-grid-pattern {
          background-image: linear-gradient(
              to right,
              rgba(103, 232, 249, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(103, 232, 249, 0.1) 1px,
              transparent 1px
            );
          background-size: 30px 30px;
        }

        .animate-grid {
          animation: grid-move 20s linear infinite;
        }

        @keyframes grid-move {
          0% {
            background-position: 0px 0px;
          }
          100% {
            background-position: 30px 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default SignIn;
