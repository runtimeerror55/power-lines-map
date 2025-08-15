import React, { createContext, useContext, useReducer } from "react";
import config from "../config/config";

// Initial state
const initialState = {
  selectedLine: null,
  windData: null,
  loading: false,
  error: null,
  timeRange: {
    start: new Date(Date.now() - config.timeRanges.defaultRange * 60 * 60 * 1000),
    end: new Date(),
  },
  mapViewState: {
    latitude: config.mapbox.defaultCenter.latitude,
    longitude: config.mapbox.defaultCenter.longitude,
    zoom: config.mapbox.defaultCenter.zoom,
    bearing: 0,
    pitch: 0,
  },
};

// Action types
const actionTypes = {
  SELECT_LINE: "SELECT_LINE",
  SET_WIND_DATA: "SET_WIND_DATA",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  SET_TIME_RANGE: "SET_TIME_RANGE",
  SET_MAP_VIEW_STATE: "SET_MAP_VIEW_STATE",
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SELECT_LINE:
      return {
        ...state,
        selectedLine: action.payload,
        windData: null, // Clear previous wind data
      };
    case actionTypes.SET_WIND_DATA:
      return {
        ...state,
        windData: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case actionTypes.SET_TIME_RANGE:
      return {
        ...state,
        timeRange: action.payload,
      };
    case actionTypes.SET_MAP_VIEW_STATE:
      return {
        ...state,
        mapViewState: action.payload,
      };
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const actions = {
    selectLine: (line) =>
      dispatch({ type: actionTypes.SELECT_LINE, payload: line }),
    setWindData: (data) =>
      dispatch({ type: actionTypes.SET_WIND_DATA, payload: data }),
    setLoading: (loading) =>
      dispatch({ type: actionTypes.SET_LOADING, payload: loading }),
    setError: (error) =>
      dispatch({ type: actionTypes.SET_ERROR, payload: error }),
    setTimeRange: (timeRange) =>
      dispatch({ type: actionTypes.SET_TIME_RANGE, payload: timeRange }),
    setMapViewState: (viewState) =>
      dispatch({ type: actionTypes.SET_MAP_VIEW_STATE, payload: viewState }),
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
