import ky, { type Options } from "ky";

// Types
export interface IApiClientOptions extends Omit<Options, "prefixUrl"> {
  prefixUrl?: string; // Optional because sometime we want to use full url
  isAuth?: boolean; // If true, attach Authorization header
}

// Default configuration
const DEFAULT_OPTIONS: Options = {
  timeout: 10000, // 10s default
  retry: 2,
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * Access Token Helper
 * Define how to retrieve your token here (localStorage, Cookies, Store, etc.)
 */
const getAccessToken = () => {
  if (typeof window !== "undefined") {
    // TODO: Change 'accessToken' to your actual key name
    return localStorage.getItem("accessToken");
  }
  return null;
};

/**
 * Creates a configured ky instance for a specific API service
 *
 * @param baseUrl - The base URL for this service (e.g., 'https://api.example.com/v1') or 'api/v1'
 * @param options - Additional ky options and custom flags
 */
export const createApiClient = (
  baseUrl: string,
  options: IApiClientOptions = {},
) => {
  const { isAuth = true, ...kyOptions } = options;

  return ky.create({
    prefixUrl: baseUrl,
    ...DEFAULT_OPTIONS,
    ...kyOptions,
    hooks: {
      beforeRequest: [
        async (request) => {
          // 1. Automatically attach Authorization header if 'isAuth' is true (default)
          if (isAuth) {
            const token = getAccessToken();
            if (token) {
              request.headers.set("Authorization", `Bearer ${token}`);
            }
          }
        },
        // Allow passing additional beforeRequest hooks via options
        ...(kyOptions.hooks?.beforeRequest ?? []),
      ],
      afterResponse: [
        async (request, options, response) => {
          // 2. Global error handling
          if (!response.ok) {
            // Check for 401 Unauthorized
            if (response.status === 401) {
              // TODO: Handle token expiration (e.g., redirect to login, refresh token)
              // if (typeof window !== "undefined") {
              //   window.location.href = "/login";
              // }
            }
          }
          return response;
        },
        // Allow passing additional afterResponse hooks via options
        ...(kyOptions.hooks?.afterResponse ?? []),
      ],
    },
  });
};
