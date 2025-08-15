// Configuration file for the Power Grid Wind Monitor application
// This handles environment variables safely for both development and production

const config = {
  // API Configuration
  api: {
    baseURL: "/api", // Dummy base URL for mock service
    timeout: 10000, // Request timeout in milliseconds
  },
  
  // Mapbox Configuration
  mapbox: {
    accessToken: "", // Add your Mapbox token here for full map functionality
    defaultStyle: "mapbox://styles/mapbox/light-v11",
    defaultCenter: {
      latitude: 39.8283, // Center of US
      longitude: -98.5795,
      zoom: 4,
    },
  },
  
  // Application Settings
  app: {
    name: "Power Grid Wind Monitor",
    version: "1.0.0",
    isDevelopment: true, // Set to false for production
  },
  
  // Wind Data Service Settings
  windData: {
    cacheSize: 50, // Maximum number of cached requests
    refreshInterval: 5 * 60 * 1000, // 5 minutes in milliseconds
    mockDataEnabled: true, // Use mock data instead of real API
  },
  
  // Time Range Presets
  timeRanges: {
    presets: [
      { label: "Last Hour", hours: 1 },
      { label: "Last 6 Hours", hours: 6 },
      { label: "Last 24 Hours", hours: 24 },
      { label: "Last 3 Days", hours: 72 },
      { label: "Last Week", hours: 168 },
    ],
    defaultRange: 24, // Default to last 24 hours
  },
};

export default config;
