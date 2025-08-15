// Sample power grid transmission lines data
export const powerLinesData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "line_001",
      properties: {
        id: "line_001",
        name: "Northeast Corridor - Line 1",
        voltage: 500, // kV
        status: "active",
        operator: "Grid Corp A",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-74.0059, 40.7128], // New York
          [-75.1652, 39.9526], // Philadelphia
          [-77.0369, 38.9072], // Washington DC
        ],
      },
    },
    {
      type: "Feature",
      id: "line_002",
      properties: {
        id: "line_002",
        name: "Texas Grid - East West",
        voltage: 345,
        status: "active",
        operator: "Texas Electric",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-97.7431, 30.2672], // Austin
          [-95.3698, 29.7604], // Houston
          [-94.0436, 30.0632], // Beaumont
        ],
      },
    },
    {
      type: "Feature",
      id: "line_003",
      properties: {
        id: "line_003",
        name: "California Central Valley",
        voltage: 500,
        status: "active",
        operator: "CalGrid",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-121.4944, 38.5816], // Sacramento
          [-121.8863, 37.3382], // San Jose
          [-119.0187, 35.3733], // Bakersfield
        ],
      },
    },
    {
      type: "Feature",
      id: "line_004",
      properties: {
        id: "line_004",
        name: "Great Lakes Connector",
        voltage: 345,
        status: "active",
        operator: "Midwest Power",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-87.6298, 41.8781], // Chicago
          [-83.0458, 42.3314], // Detroit
          [-81.6944, 41.4993], // Cleveland
        ],
      },
    },
    {
      type: "Feature",
      id: "line_005",
      properties: {
        id: "line_005",
        name: "Pacific Northwest Line",
        voltage: 500,
        status: "maintenance",
        operator: "Northwest Grid",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-122.3321, 47.6062], // Seattle
          [-123.0351, 44.9429], // Salem, OR
          [-123.0307, 44.0462], // Eugene, OR
        ],
      },
    },
    {
      type: "Feature",
      id: "line_006",
      properties: {
        id: "line_006",
        name: "Rocky Mountain High",
        voltage: 345,
        status: "active",
        operator: "Mountain Electric",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-104.9903, 39.7392], // Denver
          [-111.891, 40.7608], // Salt Lake City
          [-116.2023, 43.615], // Boise
        ],
      },
    },
    {
      type: "Feature",
      id: "line_007",
      properties: {
        id: "line_007",
        name: "Eastern Seaboard Interconnect",
        voltage: 765,
        status: "active",
        operator: "Atlantic Grid Corp",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-71.0589, 42.3601], // Boston
          [-74.0059, 40.7128], // New York
          [-75.1652, 39.9526], // Philadelphia
          [-76.6122, 39.2904], // Baltimore
          [-77.0369, 38.9072], // Washington DC
          [-78.6569, 37.4316], // Richmond
        ],
      },
    },
    {
      type: "Feature",
      id: "line_008",
      properties: {
        id: "line_008",
        name: "Florida Peninsula Link",
        voltage: 500,
        status: "active",
        operator: "Florida Power Grid",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-81.3792, 28.5383], // Orlando
          [-80.1918, 25.7617], // Miami
          [-82.4572, 27.9506], // Tampa
        ],
      },
    },
    {
      type: "Feature",
      id: "line_009",
      properties: {
        id: "line_009",
        name: "Southwest Desert Corridor",
        voltage: 500,
        status: "active",
        operator: "Desert Power Co",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-112.074, 33.4484], // Phoenix
          [-115.1398, 36.1699], // Las Vegas
          [-118.2437, 34.0522], // Los Angeles
          [-117.1611, 32.7157], // San Diego
        ],
      },
    },
    {
      type: "Feature",
      id: "line_010",
      properties: {
        id: "line_010",
        name: "Canadian Border Tie",
        voltage: 345,
        status: "active",
        operator: "Northern Grid",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-123.1207, 49.2827], // Vancouver, BC
          [-122.3321, 47.6062], // Seattle
          [-116.2146, 43.615], // Boise
          [-111.891, 40.7608], // Salt Lake City
        ],
      },
    },
    {
      type: "Feature",
      id: "line_011",
      properties: {
        id: "line_011",
        name: "Midwest Industrial Belt",
        voltage: 345,
        status: "active",
        operator: "Industrial Power Corp",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-87.6298, 41.8781], // Chicago
          [-86.1581, 39.7684], // Indianapolis
          [-84.512, 39.1031], // Cincinnati
          [-84.388, 33.749], // Atlanta
        ],
      },
    },
    {
      type: "Feature",
      id: "line_012",
      properties: {
        id: "line_012",
        name: "Gulf Coast Energy Corridor",
        voltage: 500,
        status: "active",
        operator: "Gulf States Power",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-95.3698, 29.7604], // Houston
          [-90.0715, 29.9511], // New Orleans
          [-88.0399, 30.6954], // Mobile
          [-87.2169, 30.4518], // Pensacola
          [-81.6557, 30.3322], // Jacksonville
        ],
      },
    },
  ],
};

// Mock wind data generator function
export const generateMockWindData = (lineId, timestamp) => {
  // Generate realistic wind data based on location and time
  const baseWind = {
    line_001: { baseSpeed: 8, baseDirection: 225 }, // Northeast - SW winds
    line_002: { baseSpeed: 12, baseDirection: 180 }, // Texas - S winds
    line_003: { baseSpeed: 6, baseDirection: 270 }, // California - W winds
    line_004: { baseSpeed: 10, baseDirection: 250 }, // Great Lakes - SW winds
    line_005: { baseSpeed: 15, baseDirection: 270 }, // Pacific NW - W winds
    line_006: { baseSpeed: 14, baseDirection: 280 }, // Rocky Mountains - NW winds
    line_007: { baseSpeed: 9, baseDirection: 240 }, // Eastern Seaboard - SW winds
    line_008: { baseSpeed: 11, baseDirection: 120 }, // Florida - SE winds
    line_009: { baseSpeed: 7, baseDirection: 250 }, // Southwest Desert - SW winds
    line_010: { baseSpeed: 16, baseDirection: 280 }, // Canadian Border - NW winds
    line_011: { baseSpeed: 9, baseDirection: 220 }, // Midwest Industrial - SW winds
    line_012: { baseSpeed: 13, baseDirection: 140 }, // Gulf Coast - SE winds
  };

  const base = baseWind[lineId] || { baseSpeed: 8, baseDirection: 180 };

  // Add some randomness based on timestamp
  const timeVariation = Math.sin(timestamp / 1000000) * 0.3;
  const randomVariation = (Math.random() - 0.5) * 0.4;

  const speed = Math.max(
    0,
    base.baseSpeed + base.baseSpeed * (timeVariation + randomVariation)
  );
  const direction =
    (base.baseDirection + (Math.random() - 0.5) * 60 + 360) % 360;

  return {
    windSpeed: Math.round(speed * 10) / 10, // m/s
    windDirection: Math.round(direction), // degrees
    timestamp: new Date(timestamp).toISOString(),
    temperature: Math.round(15 + Math.random() * 20), // Celsius
    humidity: Math.round(40 + Math.random() * 40), // percentage
    pressure: Math.round(1000 + Math.random() * 50), // hPa
  };
};
