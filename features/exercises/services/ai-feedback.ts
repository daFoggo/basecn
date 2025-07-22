import { BACK_END_API } from "@/lib/constants";

const FEEDBACK_ENDPOINTS = {
  FEEDBACK: `${BACK_END_API}/workflows/run`,
};

export interface IAIFeedbackParams {
  inputs: {
    purpose: string;
    example_code: string;
    user_code: string;
  };
  response_mode: string;
  user: string;
}

export interface IAIFeedbackResponse {
  task_id: string;
  workflow_run_id: string;
  data: {
    id: string;
    workflow_id: string;
    status: "succeeded" | "failed" | "running" | "pending";
    outputs: {
      message: string;
    };
    error: string;
    elapsed_time: number;
    total_tokens: number;
    total_steps: number;
    created_at: number; // Unix timestamp
    finished_at: number; // Unix timestamp
  };
}

export const aiFeedbackServices = {
  getFeedback: async (params: IAIFeedbackParams) => {
    const response = await fetch(FEEDBACK_ENDPOINTS.FEEDBACK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer app-epKXRbALse3pFAAHr3SfrOie"
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as IAIFeedbackResponse;
  },
};