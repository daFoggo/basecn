import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { useState, useCallback } from "react";
import {
  geminiFeedbackServices,
  type IGeminiFeedbackParams,
} from "../services/gemini-feedback";
import { IMessage } from "../utils/types";

export const GEMINI_FEEDBACK_CACHE_KEYS = {
  FEEDBACK: (exerciseId: string | number) => `gemini-feedback-${exerciseId}`,
};

export function useGeminiFeedback(exerciseId: string | number) {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const { trigger, isMutating, error, reset } = useSWRMutation(
    exerciseId ? GEMINI_FEEDBACK_CACHE_KEYS.FEEDBACK(exerciseId) : null,
    async (_, { arg }: { arg: IGeminiFeedbackParams }) => {
      return await geminiFeedbackServices.getFeedback(arg);
    },
    {
      revalidate: false,
      onSuccess: (data: IMessage) => {
        setMessages(prev => [...prev, data]);
      },
      onError: (error) => {
        toast.error("Không thể nhận phản hồi từ Gemini, vui lòng thử lại");
        console.error("Failed to get Gemini feedback:", error);
      },
    }
  );

  const getFeedback = useCallback(async (params: IGeminiFeedbackParams) => {
    return await trigger(params);
  }, [trigger]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    reset();
  }, [reset]);

  return {
    getFeedback,
    isGettingFeedback: isMutating,
    error,
    messages,
    clearMessages,
    reset,
  };
}