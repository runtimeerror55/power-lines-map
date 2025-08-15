import React, { useCallback } from "react";
import Map, { Source, Layer } from "react-map-gl";
import { useAppContext } from "../context/AppContext";
import { powerLinesData } from "../data/powerLines";
import MapFallback from "./MapFallback";
import "mapbox-gl/dist/mapbox-gl.css";

// Mapbox token - replace with your actual token
// You can get one free at https://account.mapbox.com/
const MAPBOX_TOKEN = ""; // Set to empty string for demo mode

const PowerGridMap = () => {
  const { state, actions } = useAppContext();

  // If no Mapbox token is provided, show fallback component
  if (!MAPBOX_TOKEN) {
    return <MapFallback />;
  }

  // Layer styles for power lines
  const powerLineLayer = {
    id: "power-lines",
    type: "line",
    paint: {
      "line-color": [
        "case",
        ["==", ["get", "status"], "maintenance"],
        "#ff6b6b", // Red for maintenance
        [">=", ["get", "voltage"], 500],
        "#4ecdc4", // Teal for high voltage
        [">=", ["get", "voltage"], 345],
        "#45b7d1", // Blue for medium voltage
        "#95e1d3", // Light green for lower voltage
      ],
      "line-width": [
        "case",
        [">=", ["get", "voltage"], 500],
        4,
        [">=", ["get", "voltage"], 345],
        3,
        2,
      ],
      "line-opacity": 0.8,
    },
  };

  // Highlighted layer for selected line
  const selectedLineLayer = {
    id: "selected-line",
    type: "line",
    filter: ["==", ["get", "id"], state.selectedLine?.properties?.id || ""],
    paint: {
      "line-color": "#ff4757",
      "line-width": 6,
      "line-opacity": 1,
    },
  };

  const handleClick = useCallback(
    (event) => {
      const features = event.features;
      if (features && features.length > 0) {
        const clickedFeature = features.find(
          (f) => f.layer.id === "power-lines"
        );
        if (clickedFeature) {
          actions.selectLine(clickedFeature);
        }
      }
    },
    [actions]
  );

  const handleViewStateChange = useCallback(
    ({ viewState }) => {
      actions.setMapViewState(viewState);
    },
    [actions]
  );

  return (
    <div style={{ width: "100%", height: "70vh", position: "relative" }}>
      <Map
        {...state.mapViewState}
        onMove={handleViewStateChange}
        onClick={handleClick}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/light-v11"
        interactiveLayerIds={["power-lines"]}
        cursor="pointer"
      >
        {/* Power lines source and layers */}
        <Source id="power-lines-source" type="geojson" data={powerLinesData}>
          <Layer {...powerLineLayer} />
          <Layer {...selectedLineLayer} />
        </Source>
      </Map>

      {/* Map Legend */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "white",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          fontSize: "12px",
        }}
      >
        <h4 style={{ margin: "0 0 8px 0", fontSize: "14px" }}>
          Power Grid Legend
        </h4>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}
        >
          <div
            style={{
              width: "20px",
              height: "4px",
              backgroundColor: "#4ecdc4",
              marginRight: "8px",
            }}
          ></div>
          <span>500+ kV</span>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}
        >
          <div
            style={{
              width: "20px",
              height: "3px",
              backgroundColor: "#45b7d1",
              marginRight: "8px",
            }}
          ></div>
          <span>345+ kV</span>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}
        >
          <div
            style={{
              width: "20px",
              height: "2px",
              backgroundColor: "#95e1d3",
              marginRight: "8px",
            }}
          ></div>
          <span>&lt; 345 kV</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "20px",
              height: "4px",
              backgroundColor: "#ff6b6b",
              marginRight: "8px",
            }}
          ></div>
          <span>Maintenance</span>
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
          }}
        >
          Loading wind data...
        </div>
      )}
    </div>
  );
};

export default PowerGridMap;
