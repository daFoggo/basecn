import { fetcher } from "@/lib/fetch";
import { IMessage } from "../utils/types";

const GEMINI_ENDPOINTS = {
  FEEDBACK: `/api/gemini-feedback`,
};

export interface IGeminiFeedbackParams {
  code: string;
  exerciseStatement: string;
}


export const geminiFeedbackServices = {
  getFeedback: async (params: IGeminiFeedbackParams) => {
    return (await fetcher(GEMINI_ENDPOINTS.FEEDBACK, {
      method: "POST",
      body: JSON.stringify(params),
    })) as IMessage;
  },
};
