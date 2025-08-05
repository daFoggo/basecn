import { toast } from "sonner";
import useSWR from "swr";
import {
  type IOverviewStatsResponse,
  overviewStatsServices,
} from "../services/overview-stats";

export const OVERVIEW_STATS_CACHE_KEYS = {
  OVERVIEW_STATS: "overview-stats",
};

export const useOverviewStatsSWR = () => {
  const {
    data: overviewStats,
    error: overviewStatsError,
    isLoading: isLoadingOverviewStats,
  } = useSWR<IOverviewStatsResponse>(
    OVERVIEW_STATS_CACHE_KEYS.OVERVIEW_STATS,
    overviewStatsServices.getOverviewStats,
    {
      onError: (error) => {
        toast.error("Failed to fetch overview stats");
        console.error("Failed to fetch overview stats:", error);
      },
    }
  );

  return {
    overviewStats,
    overviewStatsError,
    isLoadingOverviewStats,
  };
};
