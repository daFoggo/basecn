import { useCallback, useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import {
  aiFeedbackServices,
  IAIFeedbackResponse,
  type IAIFeedbackParams,
} from "../services/ai-feedback";
import { IMessage } from "../utils/types";

export const AI_FEEDBACK_CACHE_KEYS = {
  FEEDBACK: (exerciseId: string | number) => `ai-feedback-${exerciseId}`,
};

const transformAIFeedbackToMessage = (
  response: IAIFeedbackResponse
): IMessage => {
  return {
    feedback: response.data.outputs.message,
    metadata: {
      messageId: response.data.id,
      timestamp: new Date(response.data.finished_at * 1000).toISOString(),
      sender: "ai_tutor",
      type: "feedback",
    },
  };
};

export function useAIFeedback(exerciseId: string | number) {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const { trigger, isMutating, error, reset } = useSWRMutation(
    exerciseId ? AI_FEEDBACK_CACHE_KEYS.FEEDBACK(exerciseId) : null,
    async (_, { arg }: { arg: IAIFeedbackParams }) => {
      const response = await aiFeedbackServices.getFeedback(arg);

      return transformAIFeedbackToMessage(
        response as unknown as IAIFeedbackResponse
      );
    },
    {
      revalidate: false,
      onSuccess: (data: IMessage) => {
        setMessages((prev) => [...prev, data]);
      },
      onError: (error) => {
        toast.error("Không thể nhận phản hồi từ AI, vui lòng thử lại");
        console.error("Failed to get AI feedback:", error);
      },
    }
  );

  const getFeedback = useCallback(
    async (params: IAIFeedbackParams) => {
      return await trigger(params);
    },
    [trigger]
  );

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
