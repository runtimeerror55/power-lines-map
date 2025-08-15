import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "./context/AppContext";
import { useWindData } from "./hooks/useWindData";
import LeafletMap from "./components/LeafletMap";
import WindDataPanel from "./components/WindDataPanel";
import TimeSelector from "./components/TimeSelector";
import config from "./config/config";
import "./App.css";

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Main App component
function AppContent() {
  // Use the wind data hook to automatically fetch data when line/time changes
  useWindData();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "#2c3e50",
          color: "white",
          padding: "20px 0",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            ⚡ {config.app.name}
          </h1>
          <p
            style={{
              margin: "8px 0 0 0",
              fontSize: "16px",
              opacity: 0.9,
            }}
          >
            Interactive transmission line wind condition monitoring
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        {/* Instructions */}
        <div
          style={{
            backgroundColor: "#d4edda",
            border: "1px solid #c3e6cb",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "20px",
            color: "#155724",
          }}
        >
          <h3 style={{ margin: "0 0 8px 0", fontSize: "16px" }}>How to Use:</h3>
          <ol style={{ margin: 0, paddingLeft: "20px" }}>
            <li>
              Click on any power transmission line on the map to view its wind
              conditions
            </li>
            <li>
              Use the time selector below to adjust the time period for wind
              data
            </li>
            <li>
              Different line colors indicate voltage levels and operational
              status
            </li>
          </ol>
        </div>

        {/* Map Component */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            marginBottom: "20px",
          }}
        >
          <LeafletMap />
        </div>

        {/* Two Column Layout for Time Selector and Wind Data */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            "@media (max-width: 768px)": {
              gridTemplateColumns: "1fr",
            },
          }}
        >
          {/* Time Selector */}
          <div>
            <TimeSelector />
          </div>

          {/* Wind Data Panel */}
          <div>
            <WindDataPanel />
          </div>
        </div>

        {/* Footer */}
        <footer
          style={{
            textAlign: "center",
            marginTop: "40px",
            padding: "20px",
            color: "#6c757d",
            fontSize: "14px",
          }}
        >
          <p>
            🌬️ Wind data is simulated for demonstration purposes. In a
            production environment, this would connect to real weather APIs and
            power grid systems.
          </p>
          <p style={{ marginTop: "10px" }}>
            Built with React, Mapbox GL JS, and React Query
          </p>
        </footer>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
