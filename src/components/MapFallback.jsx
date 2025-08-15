import React from "react";
import { useAppContext } from "../context/AppContext";
import { powerLinesData } from "../data/powerLines";

const MapFallback = () => {
  const { state, actions } = useAppContext();

  const handleLineSelect = (line) => {
    actions.selectLine(line);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "70vh",
        backgroundColor: "#e8f4f8",
        border: "2px dashed #3498db",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "20px",
      }}
    >
      {/* Map Placeholder */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <h3 style={{ color: "#2c3e50", margin: "0 0 10px 0" }}>
          🗺️ Interactive Map (Demo Mode)
        </h3>
        <p style={{ color: "#7f8c8d", margin: "0 0 20px 0" }}>
          To see the full interactive map, add your Mapbox access token to the
          Map component.
        </p>
        <div
          style={{
            backgroundColor: "#fff3cd",
            border: "1px solid #ffeaa7",
            borderRadius: "6px",
            padding: "10px",
            fontSize: "14px",
            color: "#856404",
          }}
        >
          Get a free token at: <strong>https://account.mapbox.com/</strong>
        </div>
      </div>

      {/* Power Lines List */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <h4 style={{ margin: "0 0 15px 0", color: "#2c3e50" }}>
          Available Power Lines (Click to Select):
        </h4>

        <div style={{ display: "grid", gap: "10px" }}>
          {powerLinesData.features.map((line, index) => (
            <button
              key={line.id}
              onClick={() => handleLineSelect(line)}
              style={{
                padding: "15px",
                backgroundColor:
                  state.selectedLine?.id === line.id ? "#3498db" : "#f8f9fa",
                color: state.selectedLine?.id === line.id ? "white" : "#2c3e50",
                border: "1px solid #dee2e6",
                borderRadius: "6px",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    {line.properties.name}
                  </div>
                  <div style={{ fontSize: "12px", opacity: 0.8 }}>
                    {line.properties.voltage} kV • {line.properties.operator} •{" "}
                    {line.properties.status}
                  </div>
                </div>
                <div
                  style={{
                    width: "20px",
                    height: "4px",
                    backgroundColor:
                      line.properties.status === "maintenance"
                        ? "#ff6b6b"
                        : line.properties.voltage >= 500
                        ? "#4ecdc4"
                        : line.properties.voltage >= 345
                        ? "#45b7d1"
                        : "#95e1d3",
                    borderRadius: "2px",
                  }}
                ></div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Loading overlay */}
      {state.loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            borderRadius: "8px",
          }}
        >
          Loading wind data...
        </div>
      )}
    </div>
  );
};

export default MapFallback;
