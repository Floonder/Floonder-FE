import React, { useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { MapPin, AlertTriangle, TrendingUp, Users, Shield } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Sample data untuk dashboard
const floodRiskData = [
  { month: "Jan", low: 12, medium: 8, high: 3 },
  { month: "Feb", low: 15, medium: 6, high: 2 },
  { month: "Mar", low: 18, medium: 12, high: 7 },
  { month: "Apr", low: 22, medium: 18, high: 12 },
  { month: "May", low: 25, medium: 22, high: 18 },
  { month: "Jun", low: 20, medium: 25, high: 22 },
  { month: "Jul", low: 18, medium: 28, high: 25 },
  { month: "Aug", low: 16, medium: 24, high: 20 },
  { month: "Sep", low: 14, medium: 20, high: 15 },
  { month: "Oct", low: 16, medium: 15, high: 10 },
  { month: "Nov", low: 14, medium: 10, high: 6 },
  { month: "Dec", low: 12, medium: 8, high: 4 },
];

const regionData = [
  { name: "Jakarta Utara", value: 35, color: "#2563eb" },
  { name: "Jakarta Barat", value: 28, color: "#1d4ed8" },
  { name: "Jakarta Selatan", value: 22, color: "#60a5fa" },
  { name: "Jakarta Timur", value: 15, color: "#93c5fd" },
];

const alertData = [
  { time: "06:00", alerts: 3 },
  { time: "09:00", alerts: 7 },
  { time: "12:00", alerts: 15 },
  { time: "15:00", alerts: 22 },
  { time: "18:00", alerts: 18 },
  { time: "21:00", alerts: 12 },
  { time: "00:00", alerts: 8 },
];

// Animated Background Component
const AnimatedBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Floating geometric shapes */}
      <div
        className="absolute w-64 h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl opacity-20 -top-32 -left-32 transform rotate-45"
        style={{ transform: `translateY(${scrollY * 0.1}px) rotate(45deg)` }}
      />
      <div
        className="absolute w-48 h-48 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl opacity-25 top-1/4 right-10 transform -rotate-12"
        style={{ transform: `translateY(${scrollY * -0.05}px) rotate(-12deg)` }}
      />
      <div
        className="absolute w-32 h-32 bg-gradient-to-br from-blue-200 to-blue-300 rounded-xl opacity-30 bottom-1/4 left-1/4 transform rotate-12"
        style={{ transform: `translateY(${scrollY * 0.08}px) rotate(12deg)` }}
      />
      <div
        className="absolute w-56 h-56 bg-gradient-to-br from-green-200 to-green-300 rounded-full opacity-15 top-1/2 right-1/3"
        style={{ transform: `translateY(${scrollY * -0.12}px)` }}
      />

      {/* Gradient lines */}
      <div
        className="absolute w-full h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-20 top-1/3"
        style={{ transform: `translateX(${scrollY * 0.3}px)` }}
      />
      <div
        className="absolute w-full h-1 bg-gradient-to-r from-transparent via-green-300 to-transparent opacity-25 bottom-1/3"
        style={{ transform: `translateX(${scrollY * -0.2}px)` }}
      />
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon: Icon, title, value, change, color = "blue" }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {change && (
          <p
            className={`text-sm mt-1 flex items-center ${
              change > 0 ? "text-red-600" : "text-green-600"
            }`}
          >
            <TrendingUp className="w-4 h-4 mr-1" />
            {Math.abs(change)}% dari bulan lalu
          </p>
        )}
      </div>
      <div className={`p-3 rounded-lg bg-${color}-100`}>
        <Icon className={`w-6 h-6 text-${color}-600`} />
      </div>
    </div>
  </div>
);

// Chart Card Component
const ChartCard = ({ title, children, className = "" }) => (
  <div
    className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ${className}`}
  >
    <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
    {children}
  </div>
);

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isVisible, setIsVisible] = useState({});

  const chartRefs = {
    riskTrend: useRef(null),
    regionChart: useRef(null),
    alertChart: useRef(null),
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.dataset.chart]: true,
          }));
        }
      });
    }, observerOptions);

    Object.values(chartRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative">
      <AnimatedBackground />
      <Navbar />

      <div className="relative z-10 pt-20">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Analytics Dashboard
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive GIS flood prediction analytics untuk monitoring
              risiko banjir real-time
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-lg">
              {["overview", "trends", "regions"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {tab === "overview"
                    ? "Overview"
                    : tab === "trends"
                    ? "Trend Analysis"
                    : "Regional Data"}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={AlertTriangle}
              title="Active Alerts"
              value="247"
              change={12}
              color="red"
            />
            <StatCard
              icon={MapPin}
              title="Monitored Areas"
              value="1,284"
              change={-3}
              color="blue"
            />
            <StatCard
              icon={Users}
              title="Population at Risk"
              value="156K"
              change={8}
              color="orange"
            />
            <StatCard
              icon={Shield}
              title="Prediction Accuracy"
              value="94.2%"
              change={2}
              color="green"
            />
          </div>

          {/* Charts Section */}
          {activeTab === "overview" && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <ChartCard
                  title="Flood Risk Trend - 2024"
                  ref={chartRefs.riskTrend}
                  data-chart="riskTrend"
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={floodRiskData}>
                      <defs>
                        <linearGradient
                          id="colorHigh"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#dc2626"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#dc2626"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorMedium"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#f97316"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#f97316"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorLow"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#22c55e"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#22c55e"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="high"
                        stackId="1"
                        stroke="#dc2626"
                        fill="url(#colorHigh)"
                        name="High Risk"
                      />
                      <Area
                        type="monotone"
                        dataKey="medium"
                        stackId="1"
                        stroke="#f97316"
                        fill="url(#colorMedium)"
                        name="Medium Risk"
                      />
                      <Area
                        type="monotone"
                        dataKey="low"
                        stackId="1"
                        stroke="#22c55e"
                        fill="url(#colorLow)"
                        name="Low Risk"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartCard>

                <ChartCard
                  title="Regional Risk Distribution"
                  ref={chartRefs.regionChart}
                  data-chart="regionChart"
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={regionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {regionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>

              <ChartCard
                title="Daily Alert Pattern"
                ref={chartRefs.alertChart}
                data-chart="alertChart"
              >
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={alertData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="alerts"
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={{ fill: "#2563eb", strokeWidth: 2, r: 4 }}
                      name="Active Alerts"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </>
          )}

          {activeTab === "trends" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ChartCard title="Seasonal Flood Pattern">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={floodRiskData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="high" fill="#dc2626" name="High Risk" />
                    <Bar dataKey="medium" fill="#f97316" name="Medium Risk" />
                    <Bar dataKey="low" fill="#22c55e" name="Low Risk" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Risk Escalation Trend">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={floodRiskData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="high"
                      stroke="#dc2626"
                      strokeWidth={2}
                      name="High Risk"
                    />
                    <Line
                      type="monotone"
                      dataKey="medium"
                      stroke="#f97316"
                      strokeWidth={2}
                      name="Medium Risk"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          )}

          {activeTab === "regions" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {regionData.map((region, index) => (
                <div
                  key={region.name}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {region.name}
                    </h3>
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: region.color }}
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Risk Level:</span>
                      <span className="font-medium text-gray-900">
                        {region.value}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${region.value}%`,
                          backgroundColor: region.color,
                        }}
                      />
                    </div>
                    <div className="text-sm text-gray-500">
                      Population: {Math.floor(Math.random() * 50000) + 10000}{" "}
                      residents
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Recent Activities */}
          <div className="mt-12">
            <ChartCard title="Recent System Activities">
              <div className="space-y-4">
                {[
                  {
                    time: "10:30 AM",
                    event: "High risk alert triggered in Jakarta Utara",
                    type: "alert",
                  },
                  {
                    time: "09:15 AM",
                    event: "Weather data updated from meteorological station",
                    type: "update",
                  },
                  {
                    time: "08:45 AM",
                    event: "Prediction model recalibrated",
                    type: "system",
                  },
                  {
                    time: "07:20 AM",
                    event: "New sensor data received from 12 monitoring points",
                    type: "data",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${
                        activity.type === "alert"
                          ? "bg-red-500"
                          : activity.type === "update"
                          ? "bg-blue-500"
                          : activity.type === "system"
                          ? "bg-green-500"
                          : "bg-orange-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">
                        {activity.event}
                      </p>
                      <p className="text-gray-500 text-sm">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Analytics;
