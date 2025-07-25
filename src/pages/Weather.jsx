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
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const WeatherDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState("Bandung");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock data - replace with real API data
  const weatherData = {
    current: {
      temp: 27,
      condition: "Berawan",
      humidity: 63,
      windSpeed: 1.2,
      windDirection: "Barat",
      visibility: 10,
      feelsLike: 28,
      pressure: 1013,
      uvIndex: 6,
    },
    forecast: [
      {
        day: "Hari Ini",
        date: "27 Juli",
        temp: 26,
        tempMin: 20,
        condition: "sunny",
        humidity: 69,
      },
      {
        day: "Besok",
        date: "28 Juli",
        temp: 20,
        tempMin: 18,
        condition: "rainy",
        humidity: 91,
      },
      {
        day: "Minggu",
        date: "29 Juli",
        temp: 21,
        tempMin: 19,
        condition: "cloudy",
        humidity: 92,
      },
      {
        day: "Senin",
        date: "30 Juli",
        temp: 20,
        tempMin: 18,
        condition: "rainy",
        humidity: 93,
      },
      {
        day: "Selasa",
        date: "31 Juli",
        temp: 23,
        tempMin: 20,
        condition: "cloudy",
        humidity: 91,
      },
      {
        day: "Rabu",
        date: "01 Agustus",
        temp: 20,
        tempMin: 18,
        condition: "rainy",
        humidity: 92,
      },
      {
        day: "Kamis",
        date: "02 Agustus",
        temp: 19,
        tempMin: 17,
        condition: "cloudy",
        humidity: 92,
      },
    ],
    hourly: [
      { time: "16:00", temp: 26, condition: "sunny", humidity: 69 },
      { time: "17:00", temp: 24, condition: "cloudy", humidity: 79 },
      { time: "18:00", temp: 23, condition: "cloudy", humidity: 82 },
      { time: "19:00", temp: 23, condition: "cloudy", humidity: 85 },
      { time: "20:00", temp: 23, condition: "cloudy", humidity: 88 },
      { time: "21:00", temp: 23, condition: "rainy", humidity: 88 },
      { time: "22:00", temp: 22, condition: "rainy", humidity: 88 },
      { time: "23:00", temp: 21, condition: "rainy", humidity: 90 },
    ],
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
    switch (condition) {
      case "sunny":
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case "cloudy":
        return <Cloud className="w-8 h-8 text-gray-500" />;
      case "rainy":
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      default:
        return <Cloud className="w-8 h-8 text-gray-500" />;
    }
  };

  const getWeatherBg = (condition) => {
    switch (condition) {
      case "sunny":
        return "from-yellow-400 to-orange-500";
      case "cloudy":
        return "from-gray-400 to-gray-600";
      case "rainy":
        return "from-blue-400 to-blue-600";
      default:
        return "from-blue-400 to-blue-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-4">
      {/* Header */}
      <Navbar />
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-white">
            Dashboard Cuaca Indonesia
          </h1>
          <div className="text-white text-right">
            <div className="text-lg font-semibold">
              {currentTime.toLocaleTimeString("id-ID")}
            </div>
            <div className="text-sm opacity-80">
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
          className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          {cities.map((city) => (
            <option key={city} value={city} className="text-gray-900">
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Weather Card */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Weather */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Cuaca Saat Ini
                </h2>
                <div className="flex items-center text-white/80">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{selectedCity}, Jawa Barat</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-6xl font-bold text-white">
                  {weatherData.current.temp}°
                </div>
                <div className="text-white/80">
                  {weatherData.current.condition}
                </div>
                <div className="text-sm text-white/60">
                  Terasa seperti {weatherData.current.feelsLike}°C
                </div>
              </div>
            </div>

            {/* Weather Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <Wind className="w-6 h-6 text-white mx-auto mb-2" />
                <div className="text-white font-semibold">
                  {weatherData.current.windSpeed} km/h
                </div>
                <div className="text-white/60 text-sm">
                  Angin {weatherData.current.windDirection}
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <Droplets className="w-6 h-6 text-white mx-auto mb-2" />
                <div className="text-white font-semibold">
                  {weatherData.current.humidity}%
                </div>
                <div className="text-white/60 text-sm">Kelembaban</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <Eye className="w-6 h-6 text-white mx-auto mb-2" />
                <div className="text-white font-semibold">
                  {weatherData.current.visibility} km
                </div>
                <div className="text-white/60 text-sm">Jarak Pandang</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="w-6 h-6 bg-yellow-500 rounded-full mx-auto mb-2 flex items-center justify-center text-xs font-bold">
                  UV
                </div>
                <div className="text-white font-semibold">
                  {weatherData.current.uvIndex}
                </div>
                <div className="text-white/60 text-sm">Indeks UV</div>
              </div>
            </div>
          </div>

          {/* Hourly Forecast */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
            <div className="flex items-center mb-4">
              <Clock className="w-5 h-5 text-white mr-2" />
              <h3 className="text-xl font-bold text-white">Prediksi Per Jam</h3>
            </div>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {weatherData.hourly.map((hour, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 bg-white/10 rounded-xl p-4 text-center min-w-[100px]"
                >
                  <div className="text-white/80 text-sm mb-2">{hour.time}</div>
                  <div className="mb-2">{getWeatherIcon(hour.condition)}</div>
                  <div className="text-white font-bold">{hour.temp}°</div>
                  <div className="text-white/60 text-xs">{hour.humidity}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Indonesia Map Placeholder */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">
              Peta Indonesia
            </h3>
            <div className="bg-white/20 rounded-xl h-48 flex items-center justify-center">
              <div className="text-center text-white/60">
                <MapPin className="w-12 h-12 mx-auto mb-2" />
                <div>Peta Cuaca Indonesia</div>
                <div className="text-sm">Integrasi dengan API peta</div>
              </div>
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
            <div className="flex items-center mb-4">
              <Calendar className="w-5 h-5 text-white mr-2" />
              <h3 className="text-xl font-bold text-white">Ramalan 7 Hari</h3>
            </div>
            <div className="space-y-3">
              {weatherData.forecast.map((day, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center space-x-3">
                    {getWeatherIcon(day.condition)}
                    <div>
                      <div className="text-white font-medium">{day.day}</div>
                      <div className="text-white/60 text-sm">{day.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">{day.temp}°</div>
                    <div className="text-white/60 text-sm">{day.tempMin}°</div>
                  </div>
                  <div className="text-white/60 text-sm">{day.humidity}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* API Integration Note */}
      <div className="max-w-7xl mx-auto mt-8">
        <div className="bg-yellow-500/20 backdrop-blur-md rounded-xl p-4 border border-yellow-500/30">
          <div className="text-yellow-200">
            <strong>Catatan:</strong> Ini adalah tampilan demo dengan data mock.
            Untuk implementasi penuh, integrasikan dengan API seperti:
            <br />• OpenWeatherMap API (gratis sampai 1000 calls/hari) •
            WeatherAPI (gratis sampai 1 juta calls/bulan) • AccuWeather API
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default WeatherDashboard;
