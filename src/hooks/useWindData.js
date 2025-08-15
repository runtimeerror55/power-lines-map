import { useQuery } from "@tanstack/react-query";
import { useAppContext } from "../context/AppContext";
import windDataService from "../services/windDataService";

// Custom hook for fetching wind data
export const useWindData = () => {
  const { state, actions } = useAppContext();
  const { selectedLine, timeRange } = state;

  // Query for current wind data
  const windDataQuery = useQuery({
    queryKey: [
      "windData",
      selectedLine?.properties?.id,
      timeRange.start,
      timeRange.end,
    ],
    queryFn: async () => {
      if (!selectedLine) {
        throw new Error("No line selected");
      }

      actions.setLoading(true);
      actions.setError(null);

      try {
        const data = await windDataService.fetchWindData(
          selectedLine.properties.id,
          timeRange.start,
          timeRange.end
        );

        actions.setWindData(data.current);
        actions.setLoading(false);

        return data;
      } catch (error) {
        actions.setError(error.message);
        actions.setLoading(false);
        throw error;
      }
    },
    enabled: !!selectedLine, // Only run query if a line is selected
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    data: windDataQuery.data,
    isLoading: windDataQuery.isLoading,
    error: windDataQuery.error,
    refetch: windDataQuery.refetch,
    isRefetching: windDataQuery.isRefetching,
  };
};

// Hook for historical wind data
export const useHistoricalWindData = (lineId, enabled = false) => {
  const { state } = useAppContext();
  const { timeRange } = state;

  return useQuery({
    queryKey: ["historicalWindData", lineId, timeRange.start, timeRange.end],
    queryFn: () =>
      windDataService.fetchHistoricalData(
        lineId,
        timeRange.start,
        timeRange.end
      ),
    enabled: enabled && !!lineId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 60 * 60 * 1000, // 1 hour
  });
};

// Hook for wind forecast data
export const useWindForecast = (lineId, hours = 24, enabled = false) => {
  return useQuery({
    queryKey: ["windForecast", lineId, hours],
    queryFn: () => windDataService.fetchWindForecast(lineId, hours),
    enabled: enabled && !!lineId,
    staleTime: 15 * 60 * 1000, // 15 minutes
    cacheTime: 60 * 60 * 1000, // 1 hour
  });
};
