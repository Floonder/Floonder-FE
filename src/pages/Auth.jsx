import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { loginUser, storeAuthData } from "../services/authapi";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Call login API
      const data = await loginUser(email, password);

      // Store authentication data
      storeAuthData(data);

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background Bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large decorative bubbles with parallax effect */}
        <div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 opacity-60 animate-pulse"
          style={{
            top: "10%",
            left: "5%",
            transform: `translate(${mousePosition.x * 0.02}px, ${
              mousePosition.y * 0.02
            }px)`,
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-green-100 to-green-200 opacity-50 animate-pulse"
          style={{
            top: "20%",
            right: "10%",
            transform: `translate(${mousePosition.x * -0.015}px, ${
              mousePosition.y * 0.015
            }px)`,
            animationDelay: "1s",
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-blue-50 to-cyan-100 opacity-40"
          style={{
            bottom: "15%",
            left: "15%",
            transform: `translate(${mousePosition.x * 0.01}px, ${
              mousePosition.y * -0.01
            }px)`,
          }}
        />
        <div
          className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-green-50 to-emerald-100 opacity-45 animate-pulse"
          style={{
            bottom: "25%",
            right: "5%",
            transform: `translate(${mousePosition.x * -0.02}px, ${
              mousePosition.y * -0.015
            }px)`,
            animationDelay: "2s",
          }}
        />

        {/* Small floating bubbles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0
                ? "bg-blue-200"
                : i % 3 === 1
                ? "bg-green-200"
                : "bg-cyan-200"
            } opacity-30 animate-bounce`}
            style={{
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 3}s`,
              transform: `translate(${
                mousePosition.x * (Math.random() * 0.01)
              }px, ${mousePosition.y * (Math.random() * 0.01)}px)`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <Navbar className="absolute top-0 left-0 w-full z-20 bg-transparent backdrop-blur-md shadow-none" />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-4 py-12 relative z-10 mt-10">
        <div className="w-full max-w-2xl">
          {/* Sign In Card - Expanded */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-100 p-12 relative overflow-hidden">
            {/* Card decorative elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-green-400/20 rounded-full -translate-y-12 translate-x-12"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full translate-y-10 -translate-x-10"></div>
            <div className="absolute top-1/2 right-0 w-16 h-16 bg-gradient-to-bl from-cyan-400/15 to-blue-400/15 rounded-full translate-x-8"></div>

            {/* Header */}
            <div className="text-center mb-10">
              {/* logo floonder url image*/}
              <img
                src="/Artboard 3.png"
                alt="Flounder Logo"
                className="mx-auto mb-6 w-20 h-20 rounded-full"
              />
              <h1 className="text-4xl font-bold text-gray-800 mb-3">
                Welcome back
              </h1>
              <p className="text-gray-600 text-lg">
                Sign in to your account to continue
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-8">
              {/* Form container */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl text-sm flex items-center">
                  <svg
                    className="h-5 w-5 text-red-500 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-base font-semibold text-gray-700 mb-3"
                >
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <svg
                      className="h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition-colors"
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
                    className="w-full pl-14 pr-5 py-5 rounded-2xl bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 focus:bg-white text-lg"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between mb-3">
                  <label
                    htmlFor="password"
                    className="block text-base font-semibold text-gray-700"
                  >
                    Password
                  </label>
                  <a
                    href="/forgot-password"
                    className="text-base text-blue-600 hover:text-blue-700 transition-colors font-medium"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <svg
                      className="h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition-colors"
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
                    className="w-full pl-14 pr-5 py-5 rounded-2xl bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 focus:bg-white text-lg"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center pt-2">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-base text-gray-700"
                >
                  Remember me for 30 days
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-5 px-8 border border-transparent rounded-2xl shadow-lg text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-70 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
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
            </form>

            {/* Sign up link */}
            <p className="mt-10 text-center text-base text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Sign up for free
              </Link>
            </p>

            {/* Divider */}
            <div className="mt-10 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-base">
                <span className="px-6 bg-white text-gray-500 font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social logins */}
            <div className="mt-8 grid grid-cols-2 gap-6">
              <button className="flex justify-center items-center py-4 px-6 border border-gray-200 rounded-2xl shadow-sm bg-white hover:bg-gray-50 text-gray-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] group">
                <svg
                  className="h-6 w-6 mr-3"
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
                <span className="font-medium text-base">Google</span>
              </button>
              <button className="flex justify-center items-center py-4 px-6 border border-gray-200 rounded-2xl shadow-sm bg-white hover:bg-gray-50 text-gray-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] group">
                <svg
                  className="h-6 w-6 mr-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="font-medium text-base">GitHub</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer className="relative z-20 mt-12" />
    </div>
  );
};

export default SignIn;
