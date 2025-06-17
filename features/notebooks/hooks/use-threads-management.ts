import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { ICreateThreadParams, threadServices } from "../services/threads";

export function useThreads(userId: string | null) {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? ["threads", userId] : null,
    () => threadServices.getThreadsByUserId(userId!),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  return {
    threads: data,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useCreateThread() {
  const { trigger, isMutating, error } = useSWRMutation(
    "create-thread",
    async (_key: string, { arg }: { arg: ICreateThreadParams }) => {
      return await threadServices.createThread(arg);
    }
  );

  return {
    createThread: trigger,
    isCreating: isMutating,
    createError: error,
  };
}

export function useThreadsManagement(userId: string) {
  const { threads, isLoading, isError, mutate } = useThreads(userId);
  const { createThread, isCreating, createError } = useCreateThread();

  const handleCreateThread = async (params: ICreateThreadParams) => {
    try {
      const newThread = await createThread(params);
      await mutate();
      return newThread;
    } catch (error) {
      throw error;
    }
  };

  return {
    threads,
    isLoading,
    isError,

    createThread: handleCreateThread,
    isCreating,
    createError,

    refreshThreads: mutate,
  };
}
