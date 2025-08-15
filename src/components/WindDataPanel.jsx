import React from "react";
import { useAppContext } from "../context/AppContext";

// Wind direction helper function
const getWindDirectionText = (degrees) => {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

// Wind arrow component
const WindArrow = ({ direction, size = 40 }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "inline-block",
        margin: "0 10px",
      }}
    >
      <svg
        width={size}
        height={size}
        style={{
          transform: `rotate(${direction}deg)`,
          transition: "transform 0.3s ease",
        }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="0"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#2c3e50" />
          </marker>
        </defs>
        <line
          x1={size / 2}
          y1={size - 5}
          x2={size / 2}
          y2="5"
          stroke="#2c3e50"
          strokeWidth="3"
          markerEnd="url(#arrowhead)"
        />
      </svg>
    </div>
  );
};

const WindDataPanel = () => {
  const { state } = useAppContext();

  if (!state.selectedLine) {
    return (
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          margin: "20px 0",
          textAlign: "center",
          color: "#6c757d",
        }}
      >
        <h3>Wind Data</h3>
        <p>Click on a power line to view wind conditions</p>
      </div>
    );
  }

  if (state.loading) {
    return (
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          margin: "20px 0",
          textAlign: "center",
        }}
      >
        <h3>Loading Wind Data...</h3>
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "4px solid #e3e3e3",
            borderTop: "4px solid #3498db",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "20px auto",
          }}
        ></div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div
        style={{
          padding: "20px",
          backgroundColor: "#ffe6e6",
          borderRadius: "8px",
          margin: "20px 0",
          border: "1px solid #ff9999",
        }}
      >
        <h3 style={{ color: "#cc0000", margin: "0 0 10px 0" }}>
          Error Loading Wind Data
        </h3>
        <p style={{ color: "#cc0000", margin: 0 }}>{state.error}</p>
      </div>
    );
  }

  const { selectedLine, windData } = state;

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        margin: "20px 0",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        border: "1px solid #e9ecef",
      }}
    >
      {/* Line Information */}
      <div
        style={{
          marginBottom: "20px",
          borderBottom: "1px solid #e9ecef",
          paddingBottom: "15px",
        }}
      >
        <h3
          style={{
            margin: "0 0 10px 0",
            color: "#2c3e50",
            fontSize: "18px",
          }}
        >
          {selectedLine.properties.name}
        </h3>
        <div
          style={{
            display: "flex",
            gap: "20px",
            fontSize: "14px",
            color: "#6c757d",
          }}
        >
          <span>
            <strong>Voltage:</strong> {selectedLine.properties.voltage} kV
          </span>
          <span>
            <strong>Status:</strong>
            <span
              style={{
                color:
                  selectedLine.properties.status === "active"
                    ? "#28a745"
                    : "#ffc107",
                fontWeight: "bold",
                marginLeft: "5px",
              }}
            >
              {selectedLine.properties.status}
            </span>
          </span>
          <span>
            <strong>Operator:</strong> {selectedLine.properties.operator}
          </span>
        </div>
      </div>

      {/* Wind Data */}
      {windData ? (
        <div>
          <h4 style={{ margin: "0 0 15px 0", color: "#2c3e50" }}>
            Current Wind Conditions
          </h4>

          {/* Main wind metrics */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "15px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                padding: "15px",
                backgroundColor: "#f8f9fa",
                borderRadius: "6px",
              }}
            >
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#3498db",
                  marginBottom: "5px",
                }}
              >
                {windData.windSpeed} m/s
              </div>
              <div style={{ fontSize: "12px", color: "#6c757d" }}>
                Wind Speed
              </div>
            </div>

            <div
              style={{
                textAlign: "center",
                padding: "15px",
                backgroundColor: "#f8f9fa",
                borderRadius: "6px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "5px",
                }}
              >
                <WindArrow direction={windData.windDirection} size={30} />
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#e74c3c",
                  }}
                >
                  {windData.windDirection}°
                </span>
              </div>
              <div style={{ fontSize: "12px", color: "#6c757d" }}>
                {getWindDirectionText(windData.windDirection)} Direction
              </div>
            </div>
          </div>

          {/* Additional metrics */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: "10px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                padding: "10px",
                backgroundColor: "#f8f9fa",
                borderRadius: "4px",
              }}
            >
              <div style={{ fontWeight: "bold", color: "#27ae60" }}>
                {windData.temperature}°C
              </div>
              <div style={{ fontSize: "12px", color: "#6c757d" }}>
                Temperature
              </div>
            </div>

            <div
              style={{
                textAlign: "center",
                padding: "10px",
                backgroundColor: "#f8f9fa",
                borderRadius: "4px",
              }}
            >
              <div style={{ fontWeight: "bold", color: "#9b59b6" }}>
                {windData.humidity}%
              </div>
              <div style={{ fontSize: "12px", color: "#6c757d" }}>Humidity</div>
            </div>

            <div
              style={{
                textAlign: "center",
                padding: "10px",
                backgroundColor: "#f8f9fa",
                borderRadius: "4px",
              }}
            >
              <div style={{ fontWeight: "bold", color: "#f39c12" }}>
                {windData.pressure} hPa
              </div>
              <div style={{ fontSize: "12px", color: "#6c757d" }}>Pressure</div>
            </div>
          </div>

          {/* Timestamp */}
          <div
            style={{
              marginTop: "15px",
              padding: "10px",
              backgroundColor: "#e9ecef",
              borderRadius: "4px",
              fontSize: "12px",
              color: "#6c757d",
              textAlign: "center",
            }}
          >
            Last updated: {new Date(windData.timestamp).toLocaleString()}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", color: "#6c757d", padding: "20px" }}>
          <p>No wind data available for the selected time period.</p>
        </div>
      )}
    </div>
  );
};

export default WindDataPanel;
