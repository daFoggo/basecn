import { toast } from "sonner";
import useSWR from "swr";
import {
  type IMemberWorkloadData,
  type IOverviewStatsResponse,
  type IProjectProgressData,
  type ITaskCompletionData,
  overviewStatsServices,
} from "../services/overview-stats";

export const OVERVIEW_STATS_CACHE_KEYS = {
  OVERVIEW_STATS: "overview-stats",
  TASK_COMPLETION: "task-completion",
  TASK_STATUS: "task-status",
  TOP_PERFORMERS: "top-performers",
  MEMBER_WORKLOAD: "member-workload",
  PROJECT_PROGRESS: "project-progress",
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

  const {
    data: taskCompletionData,
    error: taskCompletionError,
    isLoading: isLoadingTaskCompletion,
  } = useSWR<ITaskCompletionData[]>(
    OVERVIEW_STATS_CACHE_KEYS.TASK_COMPLETION,
    overviewStatsServices.generateTaskCompletionBarChart,
    {
      onError: (error) => {
        toast.error("Failed to fetch task completion data");
        console.error("Failed to fetch task completion data:", error);
      },
    }
  );

  const {
    data: topPerformersData,
    error: topPerformersError,
    isLoading: isLoadingTopPerformers,
  } = useSWR(
    OVERVIEW_STATS_CACHE_KEYS.TOP_PERFORMERS,
    () => overviewStatsServices.generateTopPerformersData(10),
    {
      onError: (error) => {
        toast.error("Failed to fetch top performers data");
        console.error("Failed to fetch top performers data:", error);
      },
    }
  );

  const {
    data: memberWorkloadData,
    error: memberWorkloadError,
    isLoading: isLoadingMemberWorkload,
  } = useSWR<IMemberWorkloadData[]>(
    OVERVIEW_STATS_CACHE_KEYS.MEMBER_WORKLOAD,
    overviewStatsServices.generateMemberWorkloadRadialChart,
    {
      onError: (error) => {
        toast.error("Failed to fetch member workload data");
        console.error("Failed to fetch member workload data:", error);
      },
    }
  );

  const {
    data: projectProgressData,
    error: projectProgressError,
    isLoading: isLoadingProjectProgress,
  } = useSWR<IProjectProgressData[]>(
    OVERVIEW_STATS_CACHE_KEYS.PROJECT_PROGRESS,
    overviewStatsServices.generateProjectProgressLineChart,
    {
      onError: (error) => {
        toast.error("Failed to fetch project progress data");
        console.error("Failed to fetch project progress data:", error);
      },
    }
  );

  return {
    overviewStats,
    overviewStatsError,
    isLoadingOverviewStats,

    taskCompletionData,
    taskCompletionError,
    isLoadingTaskCompletion,

    topPerformersData,
    topPerformersError,
    isLoadingTopPerformers,

    projectProgressData,
    projectProgressError,
    isLoadingProjectProgress,

    memberWorkloadData,
    memberWorkloadError,
    isLoadingMemberWorkload,
  };
};
