import React from "react";
import { useAppContext } from "../context/AppContext";
import { powerLinesData } from "../data/powerLines";

const VisualMap = () => {
  const { state, actions } = useAppContext();

  // Convert latitude/longitude to SVG coordinates
  // US bounds: approximately -125 to -66 longitude, 20 to 49 latitude
  const convertToSVG = (lon, lat) => {
    const mapWidth = 800;
    const mapHeight = 400;

    // US geographic bounds
    const minLon = -125;
    const maxLon = -66;
    const minLat = 20;
    const maxLat = 49;

    const x = ((lon - minLon) / (maxLon - minLon)) * mapWidth;
    const y = mapHeight - ((lat - minLat) / (maxLat - minLat)) * mapHeight;

    return { x, y };
  };

  const handleLineClick = (line) => {
    actions.selectLine(line);
  };

  const getLineColor = (line) => {
    if (line.properties.status === "maintenance") return "#ff6b6b";
    if (line.properties.voltage >= 500) return "#4ecdc4";
    if (line.properties.voltage >= 345) return "#45b7d1";
    return "#95e1d3";
  };

  const getLineWidth = (line) => {
    if (line.properties.voltage >= 500) return 4;
    if (line.properties.voltage >= 345) return 3;
    return 2;
  };

  return (
    <div
      style={{
        width: "100%",
        height: "70vh",
        backgroundColor: "#f0f8ff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Map Header */}
      <div
        style={{
          padding: "15px 20px",
          backgroundColor: "#2c3e50",
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        🗺️ US Power Grid Transmission Lines Map
      </div>

      {/* SVG Map Container */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          position: "relative",
        }}
      >
        <svg
          width="800"
          height="400"
          viewBox="0 0 800 400"
          style={{
            border: "1px solid #ccc",
            backgroundColor: "#f9f9f9",
            borderRadius: "4px",
            maxWidth: "100%",
            height: "auto",
          }}
        >
          {/* Background grid */}
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#e0e0e0"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="800" height="400" fill="url(#grid)" />

          {/* US Outline (simplified) */}
          <path
            d="M 50 350 L 750 350 L 750 320 L 700 280 L 650 250 L 600 200 L 550 150 L 500 100 L 450 80 L 400 70 L 350 60 L 300 50 L 250 60 L 200 80 L 150 120 L 100 180 L 80 240 L 70 300 L 50 350 Z"
            fill="none"
            stroke="#bbb"
            strokeWidth="2"
            strokeDasharray="5,5"
          />

          {/* State boundaries (simplified) */}
          <g stroke="#ddd" strokeWidth="1" fill="none">
            <line x1="200" y1="50" x2="200" y2="350" />
            <line x1="300" y1="50" x2="300" y2="350" />
            <line x1="400" y1="50" x2="400" y2="350" />
            <line x1="500" y1="50" x2="500" y2="350" />
            <line x1="600" y1="50" x2="600" y2="350" />
            <line x1="50" y1="150" x2="750" y2="150" />
            <line x1="50" y1="250" x2="750" y2="250" />
          </g>

          {/* Power transmission lines */}
          {powerLinesData.features.map((line) => {
            const coordinates = line.geometry.coordinates;
            const pathData = coordinates
              .map((coord, index) => {
                const { x, y } = convertToSVG(coord[0], coord[1]);
                return `${index === 0 ? "M" : "L"} ${x} ${y}`;
              })
              .join(" ");

            const isSelected = state.selectedLine?.id === line.id;

            return (
              <g key={line.id}>
                {/* Line */}
                <path
                  d={pathData}
                  stroke={getLineColor(line)}
                  strokeWidth={
                    isSelected ? getLineWidth(line) + 2 : getLineWidth(line)
                  }
                  fill="none"
                  style={{
                    cursor: "pointer",
                    opacity: isSelected ? 1 : 0.8,
                    filter: isSelected
                      ? "drop-shadow(0 0 4px rgba(0,0,0,0.3))"
                      : "none",
                  }}
                  onClick={() => handleLineClick(line)}
                />

                {/* Line endpoints */}
                {coordinates.map((coord, index) => {
                  const { x, y } = convertToSVG(coord[0], coord[1]);
                  return (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r={isSelected ? 4 : 3}
                      fill={getLineColor(line)}
                      stroke="white"
                      strokeWidth="1"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleLineClick(line)}
                    />
                  );
                })}

                {/* Line label */}
                {coordinates.length > 1 && (
                  <text
                    x={convertToSVG(coordinates[0][0], coordinates[0][1]).x}
                    y={
                      convertToSVG(coordinates[0][0], coordinates[0][1]).y - 10
                    }
                    fontSize="10"
                    fill="#333"
                    textAnchor="middle"
                    style={{
                      cursor: "pointer",
                      fontWeight: isSelected ? "bold" : "normal",
                    }}
                    onClick={() => handleLineClick(line)}
                  >
                    {line.properties.name.split(" - ")[0]}
                  </text>
                )}
              </g>
            );
          })}

          {/* Geographic labels */}
          <text x="150" y="120" fontSize="12" fill="#666" textAnchor="middle">
            Pacific NW
          </text>
          <text x="300" y="180" fontSize="12" fill="#666" textAnchor="middle">
            Mountain West
          </text>
          <text x="450" y="200" fontSize="12" fill="#666" textAnchor="middle">
            Great Plains
          </text>
          <text x="600" y="150" fontSize="12" fill="#666" textAnchor="middle">
            Great Lakes
          </text>
          <text x="650" y="120" fontSize="12" fill="#666" textAnchor="middle">
            Northeast
          </text>
          <text x="450" y="300" fontSize="12" fill="#666" textAnchor="middle">
            Texas
          </text>
          <text x="300" y="280" fontSize="12" fill="#666" textAnchor="middle">
            California
          </text>
        </svg>

        {/* Map Legend */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "6px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            fontSize: "12px",
            minWidth: "150px",
          }}
        >
          <h4
            style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#2c3e50" }}
          >
            Voltage Levels
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "20px",
                  height: "4px",
                  backgroundColor: "#4ecdc4",
                }}
              ></div>
              <span>500+ kV</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "20px",
                  height: "3px",
                  backgroundColor: "#45b7d1",
                }}
              ></div>
              <span>345+ kV</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "20px",
                  height: "2px",
                  backgroundColor: "#95e1d3",
                }}
              ></div>
              <span>&lt; 345 kV</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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

        {/* Selected Line Info */}
        {state.selectedLine && (
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              backgroundColor: "#3498db",
              color: "white",
              padding: "10px 15px",
              borderRadius: "6px",
              fontSize: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: "3px" }}>
              Selected: {state.selectedLine.properties.name}
            </div>
            <div>
              {state.selectedLine.properties.voltage} kV •{" "}
              {state.selectedLine.properties.operator}
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div
        style={{
          padding: "10px 20px",
          backgroundColor: "#ecf0f1",
          fontSize: "12px",
          color: "#7f8c8d",
          textAlign: "center",
        }}
      >
        Click on any transmission line to view wind conditions • Lines show
        approximate geographic locations
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
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                border: "3px solid #e3e3e3",
                borderTop: "3px solid #3498db",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            ></div>
            Loading wind data...
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualMap;
