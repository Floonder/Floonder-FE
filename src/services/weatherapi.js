// weatherService.js
const API_KEY = "32e112f820f260e8fe88dffcd9ac61a6";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

class WeatherService {
  /**
   * Fetch current weather data for a city
   * @param {string} city - City name
   * @returns {Promise<Object>} Weather data
   */
  async getCurrentWeather(city) {
    try {
      const url = `${BASE_URL}/weather?q=${city}&units=metric&lang=id&appid=${API_KEY}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Gagal mengambil data cuaca");
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Error fetching current weather: ${error.message}`);
    }
  }

  /**
   * Fetch 5-day weather forecast for a city
   * @param {string} city - City name
   * @returns {Promise<Object>} Forecast data
   */
  async getForecast(city) {
    try {
      const url = `${BASE_URL}/forecast?q=${city}&units=metric&lang=id&appid=${API_KEY}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Gagal mengambil data ramalan");
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Error fetching forecast: ${error.message}`);
    }
  }

  /**
   * Fetch both current weather and forecast data
   * @param {string} city - City name
   * @returns {Promise<{current: Object, forecast: Object}>} Combined weather data
   */
  async getWeatherData(city) {
    try {
      const [currentWeather, forecast] = await Promise.all([
        this.getCurrentWeather(city),
        this.getForecast(city),
      ]);

      return {
        current: currentWeather,
        forecast: forecast,
      };
    } catch (error) {
      throw new Error(`Error fetching weather data: ${error.message}`);
    }
  }

  /**
   * Format hourly forecast data from API response
   * @param {Object} forecastData - Raw forecast data from API
   * @param {number} hours - Number of hours to return (default: 8)
   * @returns {Array} Formatted hourly forecast
   */
  formatHourlyForecast(forecastData, hours = 8) {
    if (!forecastData || !forecastData.list) return [];

    return forecastData.list.slice(0, hours).map((item) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      temp: Math.round(item.main.temp),
      condition: item.weather[0].icon,
      humidity: item.main.humidity,
      description: item.weather[0].description,
    }));
  }

  /**
   * Format daily forecast data from API response
   * @param {Object} forecastData - Raw forecast data from API
   * @param {number} days - Number of days to return (default: 7)
   * @returns {Array} Formatted daily forecast
   */
  formatDailyForecast(forecastData, days = 7) {
    if (!forecastData || !forecastData.list) return [];

    const dailyData = [];
    const processedDates = new Set();

    forecastData.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dateString = date.toDateString();

      if (!processedDates.has(dateString) && dailyData.length < days) {
        processedDates.add(dateString);

        const dayName = date.toLocaleDateString("id-ID", { weekday: "long" });
        const dateFormatted = date.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
        });

        // Get all forecasts for this date
        const dayForecasts = forecastData.list.filter(
          (f) => new Date(f.dt * 1000).toDateString() === dateString
        );

        // Calculate min/max temps and average humidity
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
          description: item.weather[0].description,
        });
      }
    });

    return dailyData;
  }

  /**
   * Get weather icon mapping
   * @param {string} condition - Weather condition code
   * @returns {string} Icon identifier for UI components
   */
  getWeatherIconType(condition) {
    const iconMap = {
      "01d": "sun-day",
      "01n": "sun-night",
      "02d": "cloud-day",
      "02n": "cloud-night",
      "03d": "cloud",
      "03n": "cloud",
      "04d": "cloud-heavy",
      "04n": "cloud-heavy",
      "09d": "rain",
      "09n": "rain",
      "10d": "rain",
      "10n": "rain",
      "11d": "thunder",
      "11n": "thunder",
      "13d": "snow",
      "13n": "snow",
      "50d": "mist",
      "50n": "mist",
    };

    return iconMap[condition] || "cloud";
  }

  /**
   * Get list of Indonesian cities
   * @returns {Array<string>} List of city names
   */
  getCities() {
    return [
      "Jakarta",
      "Bandung",
      "Surabaya",
      "Medan",
      "Semarang",
      "Makassar",
      "Palembang",
      "Yogyakarta",
      "Denpasar",
      "Balikpapan",
      "Manado",
      "Pontianak",
    ];
  }

  /**
   * Validate city name
   * @param {string} city - City name to validate
   * @returns {boolean} True if city is valid
   */
  isValidCity(city) {
    return this.getCities().includes(city);
  }
}

// Export singleton instance
const weatherService = new WeatherService();
export default weatherService;
