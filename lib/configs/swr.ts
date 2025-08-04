import fetcher from "../utils/fetcher";

export const SWR_CONFIG = {
  fetcher,
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  revalidateOnFocus: false,
  dedupingInterval: 2000,
};
