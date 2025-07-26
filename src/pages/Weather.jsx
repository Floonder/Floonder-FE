import React, { useState, useEffect } from "react";
import {
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Eye,
  MapPin,
  Calendar,
  Clock,
  CloudSnow,
  Zap,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const WeatherDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState("Bandung");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "32e112f820f260e8fe88dffcd9ac61a6";

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchWeatherData();
  }, [selectedCity]);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Current weather API
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=metric&lang=id&appid=${API_KEY}`;
      const currentResponse = await fetch(currentWeatherUrl);

      if (!currentResponse.ok) {
        throw new Error("Gagal mengambil data cuaca");
      }

      const currentData = await currentResponse.json();

      // 5-day forecast API
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&units=metric&lang=id&appid=${API_KEY}`;
      const forecastResponse = await fetch(forecastUrl);

      if (!forecastResponse.ok) {
        throw new Error("Gagal mengambil data ramalan");
      }

      const forecast = await forecastResponse.json();

      setWeatherData(currentData);
      setForecastData(forecast);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const cities = [
    "Jakarta",
    "Bandung",
    "Surabaya",
    "Medan",
    "Semarang",
    "Makassar",
    "Palembang",
    "Yogyakarta",
  ];

  const getWeatherIcon = (condition) => {
    const iconMap = {
      "01d": <Sun className="w-8 h-8 text-yellow-500" />, // clear sky day
      "01n": <Sun className="w-8 h-8 text-yellow-400" />, // clear sky night
      "02d": <Cloud className="w-8 h-8 text-gray-500" />, // few clouds day
      "02n": <Cloud className="w-8 h-8 text-gray-400" />, // few clouds night
      "03d": <Cloud className="w-8 h-8 text-gray-500" />, // scattered clouds
      "03n": <Cloud className="w-8 h-8 text-gray-400" />,
      "04d": <Cloud className="w-8 h-8 text-gray-600" />, // broken clouds
      "04n": <Cloud className="w-8 h-8 text-gray-500" />,
      "09d": <CloudRain className="w-8 h-8 text-blue-500" />, // shower rain
      "09n": <CloudRain className="w-8 h-8 text-blue-400" />,
      "10d": <CloudRain className="w-8 h-8 text-blue-500" />, // rain
      "10n": <CloudRain className="w-8 h-8 text-blue-400" />,
      "11d": <Zap className="w-8 h-8 text-purple-500" />, // thunderstorm
      "11n": <Zap className="w-8 h-8 text-purple-400" />,
      "13d": <CloudSnow className="w-8 h-8 text-blue-300" />, // snow
      "13n": <CloudSnow className="w-8 h-8 text-blue-200" />,
      "50d": <Cloud className="w-8 h-8 text-gray-400" />, // mist
      "50n": <Cloud className="w-8 h-8 text-gray-300" />,
    };

    return iconMap[condition] || <Cloud className="w-8 h-8 text-gray-500" />;
  };

  const formatHourlyForecast = () => {
    if (!forecastData) return [];

    return forecastData.list.slice(0, 8).map((item) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      temp: Math.round(item.main.temp),
      condition: item.weather[0].icon,
      humidity: item.main.humidity,
    }));
  };

  const formatDailyForecast = () => {
    if (!forecastData) return [];

    const dailyData = [];
    const processedDates = new Set();

    forecastData.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dateString = date.toDateString();

      if (!processedDates.has(dateString) && dailyData.length < 7) {
        processedDates.add(dateString);

        const dayName = date.toLocaleDateString("id-ID", { weekday: "long" });
        const dateFormatted = date.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
        });

        // Find min/max temps for the day
        const dayForecasts = forecastData.list.filter(
          (f) => new Date(f.dt * 1000).toDateString() === dateString
        );

        const temps = dayForecasts.map((f) => f.main.temp);
        const humidities = dayForecasts.map((f) => f.main.humidity);

        dailyData.push({
          day: dailyData.length === 0 ? "Hari Ini" : dayName,
          date: dateFormatted,
          temp: Math.round(Math.max(...temps)),
          tempMin: Math.round(Math.min(...temps)),
          condition: item.weather[0].icon,
          humidity: Math.round(
            humidities.reduce((a, b) => a + b, 0) / humidities.length
          ),
        });
      }
    });

    return dailyData;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div className="text-gray-600 text-lg">Memuat data cuaca...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center bg-red-50 p-8 rounded-xl border border-red-200">
          <div className="text-red-600 text-lg font-semibold mb-2">Error</div>
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={fetchWeatherData}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  const hourlyForecast = formatHourlyForecast();
  const dailyForecast = formatDailyForecast();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
      {/* Parallax Bubbles Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Large bubbles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-blue-300/30 rounded-full mix-blend-multiply animate-float"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-green-200/30 to-green-300/30 rounded-full mix-blend-multiply animate-float-delayed"></div>
        <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-gradient-to-br from-cyan-200/30 to-cyan-300/30 rounded-full mix-blend-multiply animate-float-slow"></div>
        <div className="absolute top-1/2 right-10 w-48 h-48 bg-gradient-to-br from-teal-200/30 to-teal-300/30 rounded-full mix-blend-multiply animate-float"></div>

        {/* Medium bubbles */}
        <div className="absolute top-60 left-1/2 w-32 h-32 bg-gradient-to-br from-blue-300/40 to-cyan-300/40 rounded-full mix-blend-multiply animate-float-delayed"></div>
        <div className="absolute bottom-60 right-1/3 w-40 h-40 bg-gradient-to-br from-green-300/40 to-teal-300/40 rounded-full mix-blend-multiply animate-float-slow"></div>
        <div className="absolute top-1/3 left-20 w-24 h-24 bg-gradient-to-br from-cyan-300/50 to-blue-300/50 rounded-full mix-blend-multiply animate-float"></div>

        {/* Small floating bubbles */}
        <div className="absolute top-32 right-1/2 w-16 h-16 bg-gradient-to-br from-green-400/60 to-cyan-400/60 rounded-full mix-blend-multiply animate-float-fast"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-blue-400/60 to-teal-400/60 rounded-full mix-blend-multiply animate-float-delayed"></div>
        <div className="absolute top-3/4 right-1/4 w-12 h-12 bg-gradient-to-br from-cyan-400/70 to-green-400/70 rounded-full mix-blend-multiply animate-float-fast"></div>
      </div>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(90deg);
          }
          50% {
            transform: translateY(-10px) translateX(-15px) rotate(180deg);
          }
          75% {
            transform: translateY(-30px) translateX(5px) rotate(270deg);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-30px) translateX(-10px) rotate(-90deg);
          }
          50% {
            transform: translateY(-15px) translateX(20px) rotate(-180deg);
          }
          75% {
            transform: translateY(-25px) translateX(-5px) rotate(-270deg);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          50% {
            transform: translateY(-40px) translateX(15px) scale(1.1);
          }
        }
        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
          }
          33% {
            transform: translateY(-15px) translateX(8px) rotate(120deg)
              scale(1.2);
          }
          66% {
            transform: translateY(-25px) translateX(-12px) rotate(240deg)
              scale(0.9);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 6s ease-in-out infinite;
        }
      `}</style>

      <div className="relative z-10 mt-10">
        {/* Header */}
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-800">
                {currentTime.toLocaleTimeString("id-ID")}
              </div>
              <div className="text-gray-600">
                {currentTime.toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>

          {/* City Selector */}
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-white/80 backdrop-blur-lg text-gray-800 px-6 py-3 rounded-2xl border border-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all mb-8"
          >
            {cities.map((city) => (
              <option key={city} value={city} className="text-gray-800">
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Weather Card */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Weather */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 border border-white/40 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 space-y-4 md:space-y-0">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">
                    Cuaca Saat Ini
                  </h2>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                    <span className="text-lg">
                      {weatherData?.name}, {weatherData?.sys?.country}
                    </span>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <div className="text-7xl font-bold text-gray-800 mb-2">
                    {Math.round(weatherData?.main?.temp)}°
                  </div>
                  <div className="text-gray-600 text-xl mb-1 capitalize">
                    {weatherData?.weather?.[0]?.description}
                  </div>
                  <div className="text-gray-500">
                    Terasa seperti {Math.round(weatherData?.main?.feels_like)}°C
                  </div>
                </div>
              </div>

              {/* Weather Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center hover:from-blue-100 hover:to-blue-200 transition-all duration-300 shadow-lg">
                  <Wind className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-gray-800 font-bold text-lg">
                    {weatherData?.wind?.speed} m/s
                  </div>
                  <div className="text-gray-600 text-sm">Kecepatan Angin</div>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-6 text-center hover:from-cyan-100 hover:to-cyan-200 transition-all duration-300 shadow-lg">
                  <Droplets className="w-8 h-8 text-cyan-600 mx-auto mb-3" />
                  <div className="text-gray-800 font-bold text-lg">
                    {weatherData?.main?.humidity}%
                  </div>
                  <div className="text-gray-600 text-sm">Kelembaban</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center hover:from-green-100 hover:to-green-200 transition-all duration-300 shadow-lg">
                  <Eye className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <div className="text-gray-800 font-bold text-lg">
                    {weatherData?.visibility
                      ? (weatherData.visibility / 1000).toFixed(1)
                      : "N/A"}{" "}
                    km
                  </div>
                  <div className="text-gray-600 text-sm">Jarak Pandang</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 text-center hover:from-orange-100 hover:to-orange-200 transition-all duration-300 shadow-lg">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mx-auto mb-3 flex items-center justify-center text-sm font-bold text-white">
                    P
                  </div>
                  <div className="text-gray-800 font-bold text-lg">
                    {weatherData?.main?.pressure} hPa
                  </div>
                  <div className="text-gray-600 text-sm">Tekanan Udara</div>
                </div>
              </div>
            </div>

            {/* Hourly Forecast */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 border border-white/40 shadow-2xl">
              <div className="flex items-center mb-6">
                <Clock className="w-6 h-6 text-blue-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-800">
                  Prediksi Per Jam
                </h3>
              </div>
              <div className="flex space-x-4 overflow-x-auto pb-4">
                {hourlyForecast.map((hour, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 text-center min-w-[120px] hover:from-gray-100 hover:to-gray-200 transition-all duration-300 shadow-lg"
                  >
                    <div className="text-gray-600 text-sm mb-3 font-medium">
                      {hour.time}
                    </div>
                    <div className="mb-3">{getWeatherIcon(hour.condition)}</div>
                    <div className="text-gray-800 font-bold text-lg mb-1">
                      {hour.temp}°
                    </div>
                    <div className="text-blue-600 text-sm font-medium">
                      {hour.humidity}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Indonesia Map Placeholder */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 border border-white/40 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Peta Indonesia
              </h3>
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl h-52 flex items-center justify-center shadow-lg">
                <div className="text-center text-gray-600">
                  <MapPin className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                  <div className="font-semibold text-lg text-gray-800">
                    Peta Cuaca Indonesia
                  </div>
                  <div className="text-sm">Integrasi dengan API peta</div>
                </div>
              </div>
            </div>

            {/* 7-Day Forecast */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 border border-white/40 shadow-2xl mb-5">
              <div className="flex items-center mb-6">
                <Calendar className="w-6 h-6 text-blue-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-800">
                  Ramalan 5 Hari
                </h3>
              </div>
              <div className="space-y-4">
                {dailyForecast.map((day, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-4 px-4 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-gray-100"
                  >
                    <div className="flex items-center space-x-4">
                      {getWeatherIcon(day.condition)}
                      <div>
                        <div className="text-gray-800 font-semibold">
                          {day.day}
                        </div>
                        <div className="text-gray-500 text-sm">{day.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-800 font-bold text-lg">
                        {day.temp}°
                      </div>
                      <div className="text-gray-500 text-sm">
                        {day.tempMin}°
                      </div>
                    </div>
                    <div className="text-blue-600 text-sm font-semibold">
                      {day.humidity}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default WeatherDashboard;
