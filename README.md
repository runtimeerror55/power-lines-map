# Power Grid Wind Monitor

An interactive React web application that displays power grid transmission lines on a map and allows users to view wind conditions at different locations and time periods.

![Power Grid Wind Monitor](https://via.placeholder.com/800x400/2c3e50/ffffff?text=Power+Grid+Wind+Monitor)

## Features

- 🗺️ **Interactive Map**: Displays power transmission lines with different colors based on voltage levels
- 🌬️ **Wind Data Visualization**: Click on lines to view real-time wind speed, direction, and weather conditions
- ⏰ **Time Period Selection**: Adjust time ranges with preset options or custom date/time pickers
- 📊 **Real-time Updates**: Automatic data fetching with loading states and error handling
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- ⚡ **Modern Stack**: Built with React, Vite, Mapbox GL JS, and React Query

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd power-grid-wind-app
npm install
```

### 2. Get Mapbox Token (Optional)

For the full interactive map experience:

1. Go to [https://account.mapbox.com/](https://account.mapbox.com/)
2. Sign up for a free account
3. Create a new access token
4. Create a `.env` file in the project root:

```env
REACT_APP_MAPBOX_TOKEN=your_mapbox_token_here
```

**Note**: The app works without a Mapbox token using a fallback interface, but the interactive map won't be available.

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the application.

## How to Use

1. **View Power Lines**: The map displays transmission lines with different colors:

   - 🔵 Teal: 500+ kV (High voltage)
   - 🔵 Blue: 345+ kV (Medium voltage)
   - 🟢 Green: < 345 kV (Lower voltage)
   - 🔴 Red: Lines under maintenance

2. **Select a Line**: Click on any transmission line to view its wind conditions

3. **Adjust Time Period**: Use the time selector to choose:

   - Quick presets (Last Hour, 24 Hours, Week, etc.)
   - Custom date/time ranges with the custom selector

4. **View Wind Data**: Selected lines show:
   - Wind speed (m/s)
   - Wind direction (degrees with visual arrow)
   - Temperature, humidity, and pressure
   - Last updated timestamp

## Project Structure

```
src/
├── components/           # React components
│   ├── Map.jsx          # Main interactive map
│   ├── MapFallback.jsx  # Fallback when no Mapbox token
│   ├── WindDataPanel.jsx # Wind information display
│   └── TimeSelector.jsx # Time period controls
├── context/             # React Context for state management
│   └── AppContext.jsx   # Global application state
├── data/                # Sample data and utilities
│   └── powerLines.js    # Power grid GeoJSON data
├── hooks/               # Custom React hooks
│   └── useWindData.js   # Wind data fetching logic
├── services/            # API services
│   └── windDataService.js # Mock wind data service
├── App.jsx             # Main application component
└── main.jsx           # Application entry point
```

## Technical Stack

- **Frontend Framework**: React 18 with functional components and hooks
- **Build Tool**: Vite for fast development and building
- **Mapping**: Mapbox GL JS with react-map-gl wrapper
- **State Management**: React Context API with useReducer
- **Data Fetching**: TanStack React Query for caching and synchronization
- **Styling**: Inline styles with responsive design
- **Date Handling**: date-fns for time manipulation

## Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# Mapbox (optional - app works without it)
REACT_APP_MAPBOX_TOKEN=your_mapbox_token_here

# API Base URL (for future real API integration)
REACT_APP_API_BASE_URL=https://your-api.com/api
```

### Customization

#### Adding Real Wind Data

Replace the mock service in `src/services/windDataService.js`:

```javascript
// Replace the mock implementation with real API calls
async fetchWindData(lineId, startTime, endTime) {
  const response = await fetch(`${this.baseURL}/wind-data/${lineId}?start=${startTime.toISOString()}&end=${endTime.toISOString()}`);
  return response.json();
}
```

#### Adding More Power Lines

Edit `src/data/powerLines.js` to add your power grid data:

```javascript
export const powerLinesData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "your_line_id",
      properties: {
        id: "your_line_id",
        name: "Your Line Name",
        voltage: 500,
        status: "active",
        operator: "Your Utility",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [longitude1, latitude1],
          [longitude2, latitude2],
        ],
      },
    },
  ],
};
```

## Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Performance Features

- **React Query Caching**: Intelligent data caching and background updates
- **Lazy Loading**: Components load efficiently
- **Optimized Rendering**: Minimal re-renders with proper React patterns
- **Responsive Images**: Optimized for different screen sizes

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Enhancements

- [ ] Historical wind data charts and graphs
- [ ] Wind forecast visualization
- [ ] Real-time alerts for high wind conditions
- [ ] Export data functionality
- [ ] User authentication and personalized dashboards
- [ ] Integration with real power grid APIs
- [ ] Mobile app version
- [ ] Offline mode support

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Provide browser version, error messages, and steps to reproduce

---

**Note**: This application uses simulated wind data for demonstration purposes. In a production environment, it would connect to real weather APIs and power grid monitoring systems.
