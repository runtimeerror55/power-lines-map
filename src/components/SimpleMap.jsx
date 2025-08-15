import React from "react";
import { useAppContext } from "../context/AppContext";
import { powerLinesData } from "../data/powerLines";

const SimpleMap = () => {
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
          🗺️ Power Grid Transmission Lines
        </h3>
        <p style={{ color: "#7f8c8d", margin: "0 0 20px 0" }}>
          Interactive map view - Click any transmission line below to view wind
          data
        </p>
      </div>

      {/* Power Lines List */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          maxWidth: "800px",
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
                    <strong>Route:</strong> {line.geometry.coordinates.length}{" "}
                    points • <strong>Voltage:</strong> {line.properties.voltage}{" "}
                    kV • <strong>Operator:</strong> {line.properties.operator} •{" "}
                    <strong>Status:</strong> {line.properties.status}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      marginTop: "3px",
                      color: "#666",
                    }}
                  >
                    Coordinates: {line.geometry.coordinates[0][1].toFixed(3)}°N,{" "}
                    {line.geometry.coordinates[0][0].toFixed(3)}°W
                    {line.geometry.coordinates.length > 1 &&
                      ` → ${line.geometry.coordinates[
                        line.geometry.coordinates.length - 1
                      ][1].toFixed(3)}°N, ${line.geometry.coordinates[
                        line.geometry.coordinates.length - 1
                      ][0].toFixed(3)}°W`}
                  </div>
                </div>
                <div
                  style={{
                    width: "30px",
                    height: "6px",
                    backgroundColor:
                      line.properties.status === "maintenance"
                        ? "#ff6b6b"
                        : line.properties.voltage >= 500
                        ? "#4ecdc4"
                        : line.properties.voltage >= 345
                        ? "#45b7d1"
                        : "#95e1d3",
                    borderRadius: "3px",
                  }}
                ></div>
              </div>
            </button>
          ))}
        </div>

        {/* Legend */}
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f8f9fa",
            borderRadius: "6px",
          }}
        >
          <h5 style={{ margin: "0 0 10px 0", color: "#2c3e50" }}>
            Voltage Level Legend:
          </h5>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
              fontSize: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div
                style={{
                  width: "20px",
                  height: "4px",
                  backgroundColor: "#4ecdc4",
                }}
              ></div>
              <span>500+ kV (High)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div
                style={{
                  width: "20px",
                  height: "4px",
                  backgroundColor: "#45b7d1",
                }}
              ></div>
              <span>345+ kV (Medium)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div
                style={{
                  width: "20px",
                  height: "4px",
                  backgroundColor: "#95e1d3",
                }}
              ></div>
              <span>&lt; 345 kV (Lower)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div
                style={{
                  width: "20px",
                  height: "4px",
                  backgroundColor: "#ff6b6b",
                }}
              ></div>
              <span>Maintenance</span>
            </div>
          </div>
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

export default SimpleMap;
