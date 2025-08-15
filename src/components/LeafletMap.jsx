import React from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Popup,
  Marker,
} from "react-leaflet";
import { useAppContext } from "../context/AppContext";
import { powerLinesData } from "../data/powerLines";
import "leaflet/dist/leaflet.css";

// Fix for default markers in React-Leaflet
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.divIcon({
  className: "custom-div-icon",
  html: "<div style='background-color:#4285f4;width:12px;height:12px;border-radius:50%;border:2px solid white;'></div>",
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

L.Marker.prototype.options.icon = DefaultIcon;

const LeafletMap = () => {
  const { state, actions } = useAppContext();

  const getLineColor = (line) => {
    if (line.properties.status === "maintenance") return "#ff6b6b";
    if (line.properties.voltage >= 500) return "#00ff41"; // Bright green like reference
    if (line.properties.voltage >= 345) return "#00ccff"; // Cyan
    return "#90EE90"; // Light green
  };

  const getLineWeight = (line) => {
    if (line.properties.voltage >= 500) return 4;
    if (line.properties.voltage >= 345) return 3;
    return 2;
  };

  const handleLineClick = (line) => {
    actions.selectLine(line);
  };

  // Center map on US
  const center = [39.8283, -98.5795];

  return (
    <div
      style={{
        width: "100%",
        height: "70vh",
        position: "relative",
        borderRadius: "8px",
        overflow: "hidden",
        border: "1px solid #ddd",
      }}
    >
      {/* Map Header */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "10px 15px",
          backgroundColor: "rgba(44, 62, 80, 0.9)",
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      >
        🗺️ US Power Grid Transmission Lines - Interactive Map
      </div>

      <MapContainer
        center={center}
        zoom={5}
        style={{
          height: "100%",
          width: "100%",
          marginTop: "50px", // Account for header
        }}
        zoomControl={true}
      >
        {/* Dark tile layer similar to reference */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Power transmission lines */}
        {powerLinesData.features.map((line) => {
          const coordinates = line.geometry.coordinates.map((coord) => [
            coord[1],
            coord[0],
          ]); // Leaflet uses [lat, lng]
          const isSelected = state.selectedLine?.id === line.id;

          return (
            <React.Fragment key={line.id}>
              <Polyline
                positions={coordinates}
                color={getLineColor(line)}
                weight={
                  isSelected ? getLineWeight(line) + 2 : getLineWeight(line)
                }
                opacity={isSelected ? 1 : 0.8}
                eventHandlers={{
                  click: () => handleLineClick(line),
                }}
                pathOptions={{
                  color: getLineColor(line),
                  weight: isSelected
                    ? getLineWeight(line) + 2
                    : getLineWeight(line),
                  opacity: isSelected ? 1 : 0.8,
                }}
              >
                <Popup>
                  <div style={{ minWidth: "200px" }}>
                    <h4 style={{ margin: "0 0 8px 0", color: "#2c3e50" }}>
                      {line.properties.name}
                    </h4>
                    <div style={{ fontSize: "12px", lineHeight: "1.4" }}>
                      <div>
                        <strong>Voltage:</strong> {line.properties.voltage} kV
                      </div>
                      <div>
                        <strong>Status:</strong>
                        <span
                          style={{
                            color:
                              line.properties.status === "active"
                                ? "#27ae60"
                                : "#f39c12",
                            fontWeight: "bold",
                            marginLeft: "5px",
                          }}
                        >
                          {line.properties.status}
                        </span>
                      </div>
                      <div>
                        <strong>Operator:</strong> {line.properties.operator}
                      </div>
                      <div style={{ marginTop: "8px" }}>
                        <button
                          onClick={() => handleLineClick(line)}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "#3498db",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "12px",
                          }}
                        >
                          View Wind Data
                        </button>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Polyline>

              {/* Endpoint markers */}
              {coordinates.map((coord, index) => (
                <Marker
                  key={`${line.id}-${index}`}
                  position={coord}
                  icon={L.divIcon({
                    className: "custom-div-icon",
                    html: `<div style='background-color:${getLineColor(
                      line
                    )};width:${isSelected ? 8 : 6}px;height:${
                      isSelected ? 8 : 6
                    }px;border-radius:50%;border:2px solid white;box-shadow:0 0 4px rgba(0,0,0,0.3);'></div>`,
                    iconSize: [isSelected ? 8 : 6, isSelected ? 8 : 6],
                    iconAnchor: [isSelected ? 4 : 3, isSelected ? 4 : 3],
                  })}
                  eventHandlers={{
                    click: () => handleLineClick(line),
                  }}
                >
                  <Popup>
                    <div>
                      <strong>{line.properties.name}</strong>
                      <br />
                      Station {index + 1}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </React.Fragment>
          );
        })}
      </MapContainer>

      {/* Map Legend */}
      <div
        style={{
          position: "absolute",
          top: "60px",
          right: "10px",
          zIndex: 1000,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          padding: "15px",
          borderRadius: "6px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          fontSize: "12px",
          minWidth: "150px",
        }}
      >
        <h4
          style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#2c3e50" }}
        >
          Transmission Lines
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "20px",
                height: "4px",
                backgroundColor: "#00ff41",
              }}
            ></div>
            <span>500+ kV</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "20px",
                height: "3px",
                backgroundColor: "#00ccff",
              }}
            ></div>
            <span>345+ kV</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "20px",
                height: "2px",
                backgroundColor: "#90EE90",
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
            bottom: "10px",
            left: "10px",
            zIndex: 1000,
            backgroundColor: "rgba(52, 152, 219, 0.95)",
            color: "white",
            padding: "12px 16px",
            borderRadius: "6px",
            fontSize: "13px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            maxWidth: "300px",
          }}
        >
          <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
            📍 Selected: {state.selectedLine.properties.name}
          </div>
          <div style={{ fontSize: "12px", opacity: 0.9 }}>
            {state.selectedLine.properties.voltage} kV •{" "}
            {state.selectedLine.properties.operator}
          </div>
        </div>
      )}

      {/* Map Controls Info */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          zIndex: 1000,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "white",
          padding: "8px 12px",
          borderRadius: "4px",
          fontSize: "11px",
          opacity: 0.8,
        }}
      >
        Click lines for wind data • Zoom/Pan to explore
      </div>

      {/* Loading overlay */}
      {state.loading && (
        <div
          style={{
            position: "absolute",
            top: "50px",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1001,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
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
            <span style={{ color: "#2c3e50", fontWeight: "bold" }}>
              Loading wind data...
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeafletMap;
