// Comprehensive power grid transmission lines data with detailed coverage
export const powerLinesData = {
  type: "FeatureCollection",
  features: [
    // NORTHEAST CORRIDOR - Enhanced with more intermediate points
    {
      type: "Feature",
      id: "line_001",
      properties: {
        id: "line_001",
        name: "Northeast Corridor - Primary",
        voltage: 500,
        status: "active",
        operator: "Grid Corp A",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-71.0589, 42.3601], // Boston
          [-71.5376, 42.0629], // Framingham
          [-71.9133, 41.7003], // Worcester
          [-72.5851, 41.3084], // Hartford
          [-73.209, 41.0268], // Stamford
          [-73.7949, 40.7589], // Bronx
          [-74.0059, 40.7128], // Manhattan
          [-74.4057, 40.5795], // Newark
          [-74.7429, 40.2206], // Princeton
          [-75.1652, 39.9526], // Philadelphia
          [-75.9277, 39.6403], // Wilmington
          [-76.6122, 39.2904], // Baltimore
          [-77.0369, 38.9072], // Washington DC
        ],
      },
    },
    {
      type: "Feature",
      id: "line_002",
      properties: {
        id: "line_002",
        name: "Northeast Secondary Circuit",
        voltage: 345,
        status: "active",
        operator: "Grid Corp A",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-71.0589, 42.3601], // Boston
          [-72.0851, 42.3584], // Worcester West
          [-73.057, 42.3584], // Albany
          [-74.0059, 40.7128], // New York
          [-74.7562, 40.3573], // Trenton
          [-75.1652, 39.9526], // Philadelphia
          [-76.2859, 39.1637], // Annapolis
          [-77.0369, 38.9072], // Washington DC
        ],
      },
    },

    // TEXAS GRID - Comprehensive coverage
    {
      type: "Feature",
      id: "line_003",
      properties: {
        id: "line_003",
        name: "Texas Central Spine",
        voltage: 500,
        status: "active",
        operator: "ERCOT Grid",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-96.797, 32.7767], // Dallas
          [-97.0821, 32.7157], // Grand Prairie
          [-97.3307, 32.7555], // Fort Worth
          [-97.5164, 32.7343], // Weatherford
          [-97.7431, 30.2672], // Austin
          [-97.9642, 30.0853], // Dripping Springs
          [-98.4946, 29.4241], // San Antonio
          [-99.1013, 29.3491], // Uvalde
        ],
      },
    },
    {
      type: "Feature",
      id: "line_004",
      properties: {
        id: "line_004",
        name: "Texas Gulf Coast Line",
        voltage: 345,
        status: "active",
        operator: "Texas Electric",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-95.3698, 29.7604], // Houston
          [-95.0633, 29.5577], // Pasadena
          [-94.8266, 29.3013], // Galveston
          [-94.4274, 29.3433], // Texas City
          [-94.1265, 29.9077], // Beaumont
          [-93.9306, 30.1588], // Orange
          [-93.7441, 30.2266], // Lake Charles, LA
        ],
      },
    },
    {
      type: "Feature",
      id: "line_005",
      properties: {
        id: "line_005",
        name: "Texas Hill Country Circuit",
        voltage: 345,
        status: "active",
        operator: "Hill Country Electric",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-97.7431, 30.2672], // Austin
          [-98.1244, 30.0668], // Dripping Springs
          [-98.8733, 30.0455], // Fredericksburg
          [-99.2017, 29.8716], // Kerrville
          [-99.5075, 29.703], // Leakey
          [-99.7869, 29.5436], // Brackettville
        ],
      },
    },

    // CALIFORNIA GRID - Detailed coverage
    {
      type: "Feature",
      id: "line_006",
      properties: {
        id: "line_006",
        name: "California Coastal Corridor",
        voltage: 500,
        status: "active",
        operator: "CalISO",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-122.4194, 37.7749], // San Francisco
          [-122.2015, 37.4419], // Palo Alto
          [-121.8863, 37.3382], // San Jose
          [-121.2958, 36.9741], // Santa Cruz
          [-120.6596, 35.2828], // Monterey
          [-120.6577, 35.0275], // Salinas
          [-120.2153, 34.2347], // Santa Barbara
          [-119.6982, 34.4208], // Goleta
          [-118.2437, 34.0522], // Los Angeles
        ],
      },
    },
    {
      type: "Feature",
      id: "line_007",
      properties: {
        id: "line_007",
        name: "Central Valley Main Line",
        voltage: 500,
        status: "active",
        operator: "CalGrid",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-121.4944, 38.5816], // Sacramento
          [-121.3016, 38.2493], // Stockton
          [-120.9876, 37.6393], // Modesto
          [-120.4579, 37.061], // Merced
          [-119.7726, 36.7378], // Fresno
          [-119.4179, 36.1951], // Tulare
          [-119.0187, 35.3733], // Bakersfield
          [-118.7948, 35.2828], // Delano
          [-118.4912, 35.0664], // Wasco
        ],
      },
    },
    {
      type: "Feature",
      id: "line_008",
      properties: {
        id: "line_008",
        name: "Southern California Grid",
        voltage: 345,
        status: "active",
        operator: "SoCal Edison",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-118.2437, 34.0522], // Los Angeles
          [-117.9143, 33.8366], // Downey
          [-117.8612, 33.7175], // Anaheim
          [-117.732, 33.6781], // Huntington Beach
          [-117.5931, 33.6189], // Newport Beach
          [-117.426, 33.5615], // Laguna Beach
          [-117.2713, 33.1961], // Carlsbad
          [-117.1611, 32.7157], // San Diego
        ],
      },
    },

    // PACIFIC NORTHWEST - Enhanced detail
    {
      type: "Feature",
      id: "line_009",
      properties: {
        id: "line_009",
        name: "Cascade Mountain Line",
        voltage: 500,
        status: "active",
        operator: "BPA",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-122.3321, 47.6062], // Seattle
          [-122.1015, 47.674], // Bellevue
          [-121.9886, 47.4812], // Issaquah
          [-121.7357, 47.3287], // Snoqualmie
          [-121.1269, 47.2529], // Cle Elum
          [-120.5542, 47.1154], // Wenatchee
          [-119.8139, 46.948], // Moses Lake
          [-119.2781, 46.6607], // Richland
          [-118.9435, 46.2396], // Walla Walla
        ],
      },
    },
    {
      type: "Feature",
      id: "line_010",
      properties: {
        id: "line_010",
        name: "Oregon Valley Circuit",
        voltage: 345,
        status: "maintenance",
        operator: "Pacific Power",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-122.6765, 45.5152], // Portland
          [-122.9015, 45.0893], // McMinnville
          [-123.0351, 44.9429], // Salem
          [-123.0868, 44.7631], // Corvallis
          [-123.0307, 44.0462], // Eugene
          [-122.87, 43.8021], // Springfield
          [-122.7015, 43.2081], // Roseburg
          [-123.3479, 42.3265], // Grants Pass
        ],
      },
    },

    // MIDWEST COMPREHENSIVE GRID
    {
      type: "Feature",
      id: "line_011",
      properties: {
        id: "line_011",
        name: "Great Lakes Circuit",
        voltage: 345,
        status: "active",
        operator: "Midwest ISO",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-87.6298, 41.8781], // Chicago
          [-87.9073, 42.0334], // Elgin
          [-88.0173, 42.3314], // Lake Geneva
          [-87.9065, 43.0389], // Milwaukee
          [-87.2021, 43.5391], // Sheboygan
          [-87.7713, 44.6114], // Green Bay
          [-88.4154, 44.2619], // Appleton
          [-89.4012, 43.0731], // Madison
        ],
      },
    },
    {
      type: "Feature",
      id: "line_012",
      properties: {
        id: "line_012",
        name: "Ohio Valley Line",
        voltage: 500,
        status: "active",
        operator: "Ohio Valley Electric",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-83.0458, 42.3314], // Detroit
          [-83.6938, 42.0608], // Ann Arbor
          [-84.4777, 42.2776], // Jackson
          [-84.5555, 42.3314], // Lansing
          [-85.0005, 42.107], // Kalamazoo
          [-86.252, 41.6834], // South Bend
          [-87.0073, 41.4993], // Gary
          [-87.6298, 41.8781], // Chicago
        ],
      },
    },
    {
      type: "Feature",
      id: "line_013",
      properties: {
        id: "line_013",
        name: "Indiana-Kentucky Interconnect",
        voltage: 345,
        status: "active",
        operator: "Midwest Power Corp",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-86.1581, 39.7684], // Indianapolis
          [-86.5264, 39.1637], // Bloomington
          [-87.0073, 38.6781], // Evansville
          [-87.5287, 37.9781], // Henderson, KY
          [-85.7585, 38.2527], // Louisville
          [-84.512, 39.1031], // Cincinnati
          [-84.27, 39.3998], // Dayton
          [-83.0007, 39.9612], // Columbus
        ],
      },
    },

    // SOUTHEASTERN GRID
    {
      type: "Feature",
      id: "line_014",
      properties: {
        id: "line_014",
        name: "Carolina Coastal Line",
        voltage: 500,
        status: "active",
        operator: "Duke Energy",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-78.6569, 37.4316], // Richmond
          [-78.4767, 37.087], // Petersburg
          [-77.436, 36.8468], // Norfolk
          [-76.2859, 36.8468], // Virginia Beach
          [-75.9665, 36.2048], // Elizabeth City, NC
          [-76.6122, 34.7257], // Wilmington, NC
          [-78.8986, 33.8404], // Myrtle Beach, SC
          [-79.9311, 32.7764], // Charleston, SC
          [-81.0348, 32.0835], // Savannah, GA
        ],
      },
    },
    {
      type: "Feature",
      id: "line_015",
      properties: {
        id: "line_015",
        name: "Georgia-Florida Connector",
        voltage: 345,
        status: "active",
        operator: "Southern Company",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-84.388, 33.749], // Atlanta
          [-83.6324, 32.8407], // Macon
          [-82.3549, 31.2077], // Tifton
          [-83.2483, 30.4383], // Valdosta
          [-82.3248, 29.6516], // Gainesville, FL
          [-82.0798, 28.8056], // Ocala
          [-81.3792, 28.5383], // Orlando
        ],
      },
    },
    {
      type: "Feature",
      id: "line_016",
      properties: {
        id: "line_016",
        name: "Florida East Coast Grid",
        voltage: 345,
        status: "active",
        operator: "FPL",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-81.6557, 30.3322], // Jacksonville
          [-81.3018, 29.9012], // St. Augustine
          [-81.0287, 29.2108], // Daytona Beach
          [-80.7698, 28.5383], // Titusville
          [-80.6081, 28.0836], // Melbourne
          [-80.3374, 26.7153], // West Palm Beach
          [-80.1373, 26.1224], // Fort Lauderdale
          [-80.1918, 25.7617], // Miami
          [-80.3784, 24.5557], // Key Largo
        ],
      },
    },

    // MOUNTAIN WEST DETAILED COVERAGE
    {
      type: "Feature",
      id: "line_017",
      properties: {
        id: "line_017",
        name: "Rocky Mountain Spine",
        voltage: 500,
        status: "active",
        operator: "Western Area Power",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-105.0178, 39.7392], // Denver
          [-105.2705, 40.015], // Boulder
          [-105.5217, 40.3772], // Fort Collins
          [-104.8059, 41.14], // Cheyenne, WY
          [-106.3084, 41.14], // Laramie
          [-107.2903, 41.3114], // Rawlins
          [-108.5506, 41.0581], // Rock Springs
          [-109.029, 41.5868], // Green River
          [-111.891, 40.7608], // Salt Lake City
        ],
      },
    },
    {
      type: "Feature",
      id: "line_018",
      properties: {
        id: "line_018",
        name: "Colorado River Circuit",
        voltage: 345,
        status: "active",
        operator: "Desert Southwest Grid",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-111.891, 40.7608], // Salt Lake City
          [-111.9539, 40.2338], // Provo
          [-112.074, 39.5297], // Richfield
          [-113.5684, 37.6776], // Cedar City
          [-114.0719, 36.9719], // St. George
          [-114.9817, 36.0956], // Las Vegas
          [-114.6197, 35.1983], // Laughlin
          [-114.478, 34.4669], // Lake Havasu City
        ],
      },
    },

    // SOUTHWEST EXPANDED GRID
    {
      type: "Feature",
      id: "line_019",
      properties: {
        id: "line_019",
        name: "Arizona Central Grid",
        voltage: 500,
        status: "active",
        operator: "APS",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-112.074, 33.4484], // Phoenix
          [-111.8315, 33.3062], // Tempe
          [-111.94, 33.4151], // Scottsdale
          [-111.6563, 33.3884], // Mesa
          [-111.1841, 32.8628], // Casa Grande
          [-110.9265, 32.2217], // Tucson
          [-110.7542, 31.8457], // Sahuarita
          [-110.9463, 31.3479], // Nogales
        ],
      },
    },
    {
      type: "Feature",
      id: "line_020",
      properties: {
        id: "line_020",
        name: "New Mexico Transmission Line",
        voltage: 345,
        status: "active",
        operator: "PNM",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-106.6504, 35.0844], // Albuquerque
          [-106.3031, 35.687], // Santa Fe
          [-105.9378, 35.687], // Las Vegas, NM
          [-104.523, 36.4014], // Clayton
          [-103.231, 36.1001], // Dalhart, TX
          [-101.8313, 35.222], // Amarillo, TX
          [-100.9204, 35.222], // Canyon, TX
        ],
      },
    },

    // ADDITIONAL INTERCONNECTS AND LOCAL GRIDS
    {
      type: "Feature",
      id: "line_021",
      properties: {
        id: "line_021",
        name: "Northern Plains Grid",
        voltage: 345,
        status: "active",
        operator: "Midwest Power Pool",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-93.265, 44.9778], // Minneapolis
          [-93.5911, 44.8831], // St. Paul
          [-94.6859, 46.7296], // Bemidji
          [-95.2348, 47.925], // Grand Forks
          [-97.0384, 47.9253], // Fargo
          [-100.7837, 46.8131], // Bismarck
          [-103.231, 47.9254], // Williston
        ],
      },
    },
    {
      type: "Feature",
      id: "line_022",
      properties: {
        id: "line_022",
        name: "Oklahoma Wind Corridor",
        voltage: 345,
        status: "active",
        operator: "Oklahoma G&E",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-97.5164, 35.4676], // Oklahoma City
          [-96.9247, 35.994], // Guthrie
          [-96.3344, 36.154], // Tulsa
          [-95.9363, 36.3112], // Bartlesville
          [-95.089, 36.8442], // Coffeyville, KS
          [-94.7138, 37.0842], // Pittsburg, KS
          [-94.3496, 37.2423], // Joplin, MO
        ],
      },
    },
    {
      type: "Feature",
      id: "line_023",
      properties: {
        id: "line_023",
        name: "Arkansas River Valley",
        voltage: 345,
        status: "active",
        operator: "Arkansas Electric",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-92.2896, 34.7465], // Little Rock
          [-92.4426, 35.2087], // Conway
          [-93.0537, 35.3859], // Russellville
          [-94.1574, 35.3859], // Fort Smith
          [-94.6189, 36.0656], // Fayetteville
          [-94.1674, 36.3729], // Rogers
          [-93.6185, 36.4434], // Harrison
        ],
      },
    },
    {
      type: "Feature",
      id: "line_024",
      properties: {
        id: "line_024",
        name: "Mississippi River Grid",
        voltage: 500,
        status: "active",
        operator: "MISO",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-91.5407, 41.5868], // Davenport, IA
          [-90.5776, 41.524], // Rock Island, IL
          [-90.1994, 38.8906], // Quincy, IL
          [-90.0715, 29.9511], // New Orleans
          [-91.1871, 30.4515], // Baton Rouge
          [-91.8749, 30.9843], // Alexandria, LA
          [-93.7441, 32.5007], // Shreveport
          [-94.0436, 32.515], // Marshall, TX
        ],
      },
    },
    {
      type: "Feature",
      id: "line_025",
      properties: {
        id: "line_025",
        name: "Appalachian Mountain Line",
        voltage: 500,
        status: "active",
        operator: "Appalachian Power",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-79.9959, 40.4406], // Pittsburgh
          [-80.2201, 40.0181], // Washington, PA
          [-80.6101, 39.2951], // Morgantown, WV
          [-81.1357, 38.3498], // Charleston, WV
          [-82.2784, 37.5407], // Pikeville, KY
          [-82.5515, 36.5673], // Kingsport, TN
          [-82.354, 36.2098], // Johnson City, TN
          [-81.9746, 36.2168], // Boone, NC
        ],
      },
    },
    {
      type: "Feature",
      id: "line_026",
      properties: {
        id: "line_026",
        name: "Tennessee Valley Circuit",
        voltage: 345,
        status: "active",
        operator: "TVA",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-86.7816, 36.1627], // Nashville
          [-87.3594, 36.3103], // Clarksville
          [-88.0399, 36.5945], // Murray, KY
          [-88.3267, 36.6103], // Paducah
          [-89.5889, 36.3032], // Sikeston, MO
          [-90.049, 35.1495], // Memphis
          [-90.0048, 35.0048], // West Memphis, AR
        ],
      },
    },
    {
      type: "Feature",
      id: "line_027",
      properties: {
        id: "line_027",
        name: "Alabama Power Grid",
        voltage: 345,
        status: "active",
        operator: "Alabama Power",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-86.7816, 33.5207], // Birmingham
          [-85.8911, 33.6595], // Anniston
          [-85.0007, 32.4609], // Auburn
          [-86.3009, 32.3668], // Montgomery
          [-87.6232, 30.4883], // Mobile
          [-88.043, 30.6954], // Mobile Bay
        ],
      },
    },
    {
      type: "Feature",
      id: "line_028",
      properties: {
        id: "line_028",
        name: "Louisiana Delta Grid",
        voltage: 345,
        status: "active",
        operator: "Entergy",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-90.0715, 29.9511], // New Orleans
          [-90.7743, 29.9377], // Houma
          [-91.437, 29.6466], // Morgan City
          [-92.0198, 30.2266], // Lafayette
          [-92.4426, 30.1588], // Opelousas
          [-92.6379, 30.8405], // Alexandria
          [-93.086, 31.1801], // Many
        ],
      },
    },
    {
      type: "Feature",
      id: "line_029",
      properties: {
        id: "line_029",
        name: "Kansas Prairie Wind Grid",
        voltage: 345,
        status: "active",
        operator: "Evergy",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-94.6275, 39.1142], // Kansas City
          [-95.689, 39.0473], // Lawrence
          [-95.689, 39.0473], // Topeka
          [-97.3375, 39.3639], // Salina
          [-99.3269, 38.8422], // Hays
          [-100.0187, 37.6922], // Dodge City
          [-100.9204, 36.4014], // Liberal
        ],
      },
    },
    {
      type: "Feature",
      id: "line_030",
      properties: {
        id: "line_030",
        name: "Nebraska Cornhusker Line",
        voltage: 345,
        status: "active",
        operator: "NPPD",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [-96.6917, 40.8136], // Omaha
          [-96.6804, 40.8136], // Lincoln
          [-98.342, 40.9248], // Grand Island
          [-99.0819, 41.1289], // Kearney
          [-101.0504, 41.1344], // North Platte
          [-102.0579, 41.1579], // Sidney
          [-104.8202, 41.14], // Cheyenne, WY
        ],
      },
    },
  ],
};

// Mock wind data generator function
export const generateMockWindData = (lineId, timestamp) => {
  // Generate realistic wind data based on location and time
  const baseWind = {
    // Northeast Corridor
    line_001: { baseSpeed: 8, baseDirection: 225 }, // Northeast Primary - SW winds
    line_002: { baseSpeed: 9, baseDirection: 230 }, // Northeast Secondary - SW winds

    // Texas Grid
    line_003: { baseSpeed: 12, baseDirection: 180 }, // Texas Central - S winds
    line_004: { baseSpeed: 13, baseDirection: 140 }, // Texas Gulf Coast - SE winds
    line_005: { baseSpeed: 11, baseDirection: 200 }, // Texas Hill Country - S winds

    // California Grid
    line_006: { baseSpeed: 6, baseDirection: 270 }, // California Coastal - W winds
    line_007: { baseSpeed: 8, baseDirection: 280 }, // Central Valley - NW winds
    line_008: { baseSpeed: 7, baseDirection: 250 }, // Southern California - SW winds

    // Pacific Northwest
    line_009: { baseSpeed: 15, baseDirection: 270 }, // Cascade Mountain - W winds
    line_010: { baseSpeed: 14, baseDirection: 290 }, // Oregon Valley - NW winds

    // Midwest
    line_011: { baseSpeed: 10, baseDirection: 250 }, // Great Lakes - SW winds
    line_012: { baseSpeed: 11, baseDirection: 240 }, // Ohio Valley - SW winds
    line_013: { baseSpeed: 9, baseDirection: 220 }, // Indiana-Kentucky - SW winds

    // Southeast
    line_014: { baseSpeed: 9, baseDirection: 240 }, // Carolina Coastal - SW winds
    line_015: { baseSpeed: 8, baseDirection: 180 }, // Georgia-Florida - S winds
    line_016: { baseSpeed: 11, baseDirection: 120 }, // Florida East Coast - SE winds

    // Mountain West
    line_017: { baseSpeed: 14, baseDirection: 280 }, // Rocky Mountain - NW winds
    line_018: { baseSpeed: 12, baseDirection: 260 }, // Colorado River - W winds

    // Southwest
    line_019: { baseSpeed: 7, baseDirection: 250 }, // Arizona Central - SW winds
    line_020: { baseSpeed: 13, baseDirection: 270 }, // New Mexico - W winds

    // Additional Grids
    line_021: { baseSpeed: 16, baseDirection: 290 }, // Northern Plains - NW winds
    line_022: { baseSpeed: 15, baseDirection: 200 }, // Oklahoma Wind - S winds
    line_023: { baseSpeed: 10, baseDirection: 220 }, // Arkansas River - SW winds
    line_024: { baseSpeed: 12, baseDirection: 180 }, // Mississippi River - S winds
    line_025: { baseSpeed: 8, baseDirection: 250 }, // Appalachian Mountain - SW winds
    line_026: { baseSpeed: 9, baseDirection: 230 }, // Tennessee Valley - SW winds
    line_027: { baseSpeed: 10, baseDirection: 200 }, // Alabama Power - S winds
    line_028: { baseSpeed: 13, baseDirection: 140 }, // Louisiana Delta - SE winds
    line_029: { baseSpeed: 17, baseDirection: 190 }, // Kansas Prairie Wind - S winds
    line_030: { baseSpeed: 14, baseDirection: 250 }, // Nebraska Cornhusker - SW winds
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
