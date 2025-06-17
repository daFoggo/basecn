import { BACK_END_API } from "@/lib/constants";
import { fetcher } from "@/lib/fetch";
import { INoteBook } from "../utils/types";

const THREAD_ENDPOINTS = {
  GET_BY_USERID: (userId: string) => `${BACK_END_API}/thread/user/${userId}`,
  CREATE: `${BACK_END_API}/thread/create`,
};

export interface ICreateThreadParams {
  user_id: string;
  title: string;
}

export const threadServices = {
  getThreadsByUserId: async (userId: string) => {
    return (await fetcher(
      THREAD_ENDPOINTS.GET_BY_USERID(userId)
    )) as INoteBook[];
  },

  createThread: async (params: ICreateThreadParams) => {
    return (await fetcher(THREAD_ENDPOINTS.CREATE, {
      method: "POST",
      body: JSON.stringify(params),
    })) as INoteBook;
  },
};
