import { generateMockWindData } from "../data/powerLines";
import config from "../config/config";

// Mock API service for wind data
// In a real application, this would make HTTP requests to your backend API

class WindDataService {
  constructor() {
    this.baseURL = config.api.baseURL;
    this.cache = new Map();
    this.maxCacheSize = config.windData.cacheSize;
  }

  // Generate cache key for request
  getCacheKey(lineId, startTime, endTime) {
    return `${lineId}_${startTime.getTime()}_${endTime.getTime()}`;
  }

  // Simulate API delay
  async delay(ms = 500) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Fetch wind data for a specific power line and time range
  async fetchWindData(lineId, startTime, endTime) {
    const cacheKey = this.getCacheKey(lineId, startTime, endTime);

    // Check cache first
    if (this.cache.has(cacheKey)) {
      console.log("Returning cached wind data for:", lineId);
      await this.delay(100); // Small delay for cache hits
      return this.cache.get(cacheKey);
    }

    console.log(
      "Fetching wind data for line:",
      lineId,
      "from:",
      startTime,
      "to:",
      endTime
    );

    try {
      // Simulate API delay
      await this.delay(800 + Math.random() * 400);

      // In a real app, this would be:
      // const response = await fetch(`${this.baseURL}/wind-data/${lineId}?start=${startTime.toISOString()}&end=${endTime.toISOString()}`);
      // const data = await response.json();

      // For now, generate mock data
      const mockData = this.generateTimeSeriesData(lineId, startTime, endTime);

      // Cache the result
      this.cache.set(cacheKey, mockData);

             // Clear old cache entries (simple cache management)
       if (this.cache.size > this.maxCacheSize) {
         const firstKey = this.cache.keys().next().value;
         this.cache.delete(firstKey);
       }

      return mockData;
    } catch (error) {
      console.error("Error fetching wind data:", error);
      throw new Error("Failed to fetch wind data. Please try again.");
    }
  }

  // Generate mock time series data
  generateTimeSeriesData(lineId, startTime, endTime) {
    const timeSeries = [];
    const current = new Date(startTime);
    const end = new Date(endTime);

    // Generate data points every hour
    while (current <= end) {
      const windData = generateMockWindData(lineId, current.getTime());
      timeSeries.push({
        ...windData,
        timestamp: new Date(current).toISOString(),
      });

      current.setHours(current.getHours() + 1);
    }

    // Return the most recent data point as current conditions
    // and include the full time series for potential future use
    const mostRecent =
      timeSeries[timeSeries.length - 1] ||
      generateMockWindData(lineId, end.getTime());

    return {
      current: mostRecent,
      timeSeries,
      metadata: {
        lineId,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        dataPoints: timeSeries.length,
        source: "Mock Weather API",
        units: {
          windSpeed: "m/s",
          windDirection: "degrees",
          temperature: "Celsius",
          humidity: "percentage",
          pressure: "hPa",
        },
      },
    };
  }

  // Get historical wind data (for charts/graphs)
  async fetchHistoricalData(lineId, startTime, endTime, interval = "hourly") {
    try {
      console.log("Fetching historical wind data for:", lineId);
      await this.delay(600);

      // Generate historical data with the specified interval
      return this.generateTimeSeriesData(lineId, startTime, endTime);
    } catch (error) {
      console.error("Error fetching historical wind data:", error);
      throw new Error("Failed to fetch historical wind data.");
    }
  }

  // Get wind forecast (future data)
  async fetchWindForecast(lineId, hours = 24) {
    try {
      console.log("Fetching wind forecast for:", lineId, "hours:", hours);
      await this.delay(700);

      const startTime = new Date();
      const endTime = new Date(Date.now() + hours * 60 * 60 * 1000);

      const forecastData = this.generateTimeSeriesData(
        lineId,
        startTime,
        endTime
      );

      return {
        ...forecastData,
        forecast: true,
        metadata: {
          ...forecastData.metadata,
          forecastHours: hours,
          source: "Mock Weather Forecast API",
        },
      };
    } catch (error) {
      console.error("Error fetching wind forecast:", error);
      throw new Error("Failed to fetch wind forecast.");
    }
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
    console.log("Wind data cache cleared");
  }

  // Get cache statistics
  getCacheStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Export singleton instance
export const windDataService = new WindDataService();
export default windDataService;
