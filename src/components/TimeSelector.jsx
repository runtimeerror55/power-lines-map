import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { format, subHours, subDays, addHours } from "date-fns";
import config from "../config/config";

const TimeSelector = () => {
  const { state, actions } = useAppContext();
  const [mode, setMode] = useState("preset"); // 'preset' or 'custom'
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  // Preset time ranges from config
  const presetRanges = config.timeRanges.presets;

  // Initialize custom date inputs with current state
  useEffect(() => {
    setCustomStart(format(state.timeRange.start, "yyyy-MM-dd'T'HH:mm"));
    setCustomEnd(format(state.timeRange.end, "yyyy-MM-dd'T'HH:mm"));
  }, [state.timeRange]);

  const handlePresetChange = (hours) => {
    const end = new Date();
    const start = subHours(end, hours);
    actions.setTimeRange({ start, end });
  };

  const handleCustomTimeChange = () => {
    if (customStart && customEnd) {
      const start = new Date(customStart);
      const end = new Date(customEnd);

      if (start < end) {
        actions.setTimeRange({ start, end });
      } else {
        alert("Start time must be before end time");
      }
    }
  };

  const getCurrentRangeLabel = () => {
    const diffMs =
      state.timeRange.end.getTime() - state.timeRange.start.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    // Check if it matches a preset
    const matchingPreset = presetRanges.find(
      (range) => Math.abs(range.hours - diffHours) < 0.1
    );
    if (matchingPreset) {
      return matchingPreset.label;
    }

    return "Custom Range";
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        border: "1px solid #e9ecef",
        margin: "20px 0",
      }}
    >
      <h3
        style={{
          margin: "0 0 15px 0",
          color: "#2c3e50",
          fontSize: "18px",
        }}
      >
        Time Period Selection
      </h3>

      {/* Mode Toggle */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => setMode("preset")}
            style={{
              padding: "8px 16px",
              backgroundColor: mode === "preset" ? "#3498db" : "#f8f9fa",
              color: mode === "preset" ? "white" : "#6c757d",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Quick Select
          </button>
          <button
            onClick={() => setMode("custom")}
            style={{
              padding: "8px 16px",
              backgroundColor: mode === "custom" ? "#3498db" : "#f8f9fa",
              color: mode === "custom" ? "white" : "#6c757d",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Custom Range
          </button>
        </div>
      </div>

      {/* Current Selection Display */}
      <div
        style={{
          backgroundColor: "#e8f4fd",
          padding: "12px",
          borderRadius: "6px",
          marginBottom: "20px",
          border: "1px solid #bee5eb",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            color: "#0c5460",
            marginBottom: "5px",
          }}
        >
          Current Selection: {getCurrentRangeLabel()}
        </div>
        <div style={{ fontSize: "12px", color: "#0c5460" }}>
          From: {format(state.timeRange.start, "MMM dd, yyyy HH:mm")} | To:{" "}
          {format(state.timeRange.end, "MMM dd, yyyy HH:mm")}
        </div>
      </div>

      {/* Preset Mode */}
      {mode === "preset" && (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: "10px",
            }}
          >
            {presetRanges.map((range, index) => (
              <button
                key={index}
                onClick={() => handlePresetChange(range.hours)}
                style={{
                  padding: "12px 8px",
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #dee2e6",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "13px",
                  transition: "all 0.2s ease",
                  ":hover": {
                    backgroundColor: "#e9ecef",
                  },
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#e9ecef")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#f8f9fa")
                }
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Custom Mode */}
      {mode === "custom" && (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr auto",
              gap: "15px",
              alignItems: "end",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#495057",
                }}
              >
                Start Time
              </label>
              <input
                type="datetime-local"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#495057",
                }}
              >
                End Time
              </label>
              <input
                type="datetime-local"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              />
            </div>

            <button
              onClick={handleCustomTimeChange}
              style={{
                padding: "9px 16px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold",
                whiteSpace: "nowrap",
              }}
            >
              Apply
            </button>
          </div>

          {/* Quick adjust buttons */}
          <div style={{ marginTop: "15px" }}>
            <div
              style={{
                fontSize: "14px",
                marginBottom: "8px",
                color: "#6c757d",
              }}
            >
              Quick Adjustments:
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button
                onClick={() => {
                  const newStart = subHours(new Date(customStart), 1);
                  setCustomStart(format(newStart, "yyyy-MM-dd'T'HH:mm"));
                }}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                -1h Start
              </button>
              <button
                onClick={() => {
                  const newStart = addHours(new Date(customStart), 1);
                  setCustomStart(format(newStart, "yyyy-MM-dd'T'HH:mm"));
                }}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                +1h Start
              </button>
              <button
                onClick={() => {
                  const newEnd = subHours(new Date(customEnd), 1);
                  setCustomEnd(format(newEnd, "yyyy-MM-dd'T'HH:mm"));
                }}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                -1h End
              </button>
              <button
                onClick={() => {
                  const newEnd = addHours(new Date(customEnd), 1);
                  setCustomEnd(format(newEnd, "yyyy-MM-dd'T'HH:mm"));
                }}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                +1h End
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSelector;
