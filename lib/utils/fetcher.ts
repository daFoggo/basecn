/**
 * Request configuration interface
 */
export interface RequestConfig {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  data?: unknown;
}

/**
 * Error interface for fetcher
 */
export interface FetchError extends Error {
  status?: number;
  statusText?: string;
  data?: unknown;
  url?: string;
  originalError?: Error;
}

/**
 * Authentication token retrieval function
 */
const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;

  return (
    localStorage.getItem("authToken") ||
    sessionStorage.getItem("authToken") ||
    document.cookie.match(/authToken=([^;]+)/)?.[1] ||
    null
  );
};

/**
 * Create enhanced error with additional properties
 */
const createError = (
  message: string,
  status?: number,
  statusText?: string,
  data?: unknown,
  url?: string
): FetchError => {
  const error = new Error(message) as FetchError;
  error.status = status;
  error.statusText = statusText;
  error.data = data;
  error.url = url;

  // Set error name based on status
  if (status === 401) {
    error.name = "UnauthorizedError";
  } else if (status === 403) {
    error.name = "ForbiddenError";
  } else if (status === 404) {
    error.name = "NotFoundError";
  } else if (status && status >= 500) {
    error.name = "ServerError";
  } else if (status && status >= 400) {
    error.name = "ClientError";
  }

  return error;
};

/**
 * Universal Fetcher for SWR
 */
export const fetcher = async <T = unknown>(
  resource: string | [string, RequestConfig?]
): Promise<T> => {
  let url: string;
  let options: RequestConfig = {};

  // Handle different input formats
  if (typeof resource === "string") {
    url = resource;
  } else if (Array.isArray(resource)) {
    [url, options = {}] = resource;
  } else {
    throw createError("Invalid resource format");
  }

  // Default headers
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add auth token if available
  const token = getAuthToken();
  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  // Merge configuration
  const config: RequestInit = {
    method: "GET",
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  // Handle request body for mutation methods
  if (options.data && ["POST", "PUT", "PATCH"].includes(config.method || "")) {
    // Handle FormData (for file uploads and multipart forms)
    if (options.data instanceof FormData) {
      config.body = options.data;
      // Remove Content-Type to let browser set multipart boundary
      delete (config.headers as Record<string, string>)["Content-Type"];
    }
    // Handle URLSearchParams (for form submissions)
    else if (options.data instanceof URLSearchParams) {
      config.body = options.data;
      (config.headers as Record<string, string>)["Content-Type"] =
        "application/x-www-form-urlencoded";
    }
    // Handle JSON data
    else if (
      (config.headers as Record<string, string>)["Content-Type"] ===
      "application/json"
    ) {
      config.body = JSON.stringify(options.data);
    }
    // Handle other data types (string, blob, etc.)
    else {
      config.body = options.data as BodyInit;
    }
  }

  try {
    const response = await fetch(url, config);

    // Handle different response types
    const contentType = response.headers.get("content-type");

    // Handle successful responses
    if (response.ok) {
      // Handle empty responses (204 No Content)
      if (response.status === 204) {
        return null as T;
      }

      // Handle JSON responses
      if (contentType?.includes("application/json")) {
        return (await response.json()) as T;
      }

      // Handle text responses
      if (contentType?.includes("text/")) {
        return (await response.text()) as T;
      }

      // Handle blob responses (files, images)
      return (await response.blob()) as T;
    }

    // Handle error responses
    let errorData: unknown;
    try {
      if (contentType?.includes("application/json")) {
        errorData = await response.json();
      } else {
        errorData = { message: await response.text() };
      }
    } catch {
      errorData = { message: "Unknown error occurred" };
    }

    // Extract error message
    const errorMessage =
      (errorData as { message?: string })?.message ||
      (errorData as { error?: string })?.error ||
      `HTTP ${response.status}: ${response.statusText}`;

    // Create and throw enhanced error
    const error = createError(
      errorMessage,
      response.status,
      response.statusText,
      errorData,
      url
    );

    // Handle specific status codes
    if (response.status === 401) {
      // Optional: Auto redirect to login
      // if (typeof window !== 'undefined') {
      //   window.location.href = '/login'
      // }
    }

    throw error;
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError && error.message.includes("fetch")) {
      const networkError = createError(
        "Network error - please check your connection"
      );
      networkError.name = "NetworkError";
      networkError.originalError = error;
      throw networkError;
    }

    // Re-throw other errors
    throw error;
  }
};

// Specialized fetchers for common use cases
export const getFetcher = <T = unknown>(url: string): Promise<T> =>
  fetcher<T>(url);

export const postFetcher = <T = unknown>([url, data]: [
  string,
  unknown
]): Promise<T> => fetcher<T>([url, { method: "POST", data }]);

export const putFetcher = <T = unknown>([url, data]: [
  string,
  unknown
]): Promise<T> => fetcher<T>([url, { method: "PUT", data }]);

export const patchFetcher = <T = unknown>([url, data]: [
  string,
  unknown
]): Promise<T> => fetcher<T>([url, { method: "PATCH", data }]);

export const deleteFetcher = <T = unknown>(url: string): Promise<T> =>
  fetcher<T>([url, { method: "DELETE" }]);

// Fetcher with custom headers
export const fetcherWithHeaders = <T = unknown>([url, headers]: [
  string,
  Record<string, string>
]): Promise<T> => fetcher<T>([url, { headers }]);

// Fetcher with query parameters
export const fetcherWithParams = <T = unknown>([url, params]: [
  string,
  Record<string, string | number | boolean>
]): Promise<T> => {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    searchParams.append(key, String(value));
  }
  const urlWithParams = `${url}?${searchParams.toString()}`;
  return fetcher<T>(urlWithParams);
};

// File upload fetcher
export const uploadFetcher = <T = unknown>([url, formData]: [
  string,
  FormData
]): Promise<T> => fetcher<T>([url, { method: "POST", data: formData }]);

// Form data fetcher (supports both FormData and URLSearchParams)
export const formFetcher = <T = unknown>([url, formData, method = "POST"]: [
  string,
  FormData | URLSearchParams,
  ("POST" | "PUT" | "PATCH")?
]): Promise<T> => fetcher<T>([url, { method, data: formData }]);

// Fetcher factory for different base URLs
export const createFetcher =
  <T = unknown>(baseURL: string, defaultOptions: RequestConfig = {}) =>
  (resource: string | [string, RequestConfig?]): Promise<T> => {
    let url: string;
    let options: RequestConfig = {};

    if (typeof resource === "string") {
      url = `${baseURL}${resource}`;
    } else if (Array.isArray(resource)) {
      [url, options = {}] = resource;
      url = `${baseURL}${url}`;
    } else {
      throw createError("Invalid resource format");
    }

    const mergedOptions: RequestConfig = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    return fetcher<T>([url, mergedOptions]);
  };

// Error type guards
export const isNetworkError = (error: unknown): error is FetchError =>
  error instanceof Error && error.name === "NetworkError";

export const isAuthError = (error: unknown): error is FetchError =>
  error instanceof Error &&
  ["UnauthorizedError", "ForbiddenError"].includes(error.name);

export const isServerError = (error: unknown): error is FetchError =>
  error instanceof Error && error.name === "ServerError";

export const isClientError = (error: unknown): error is FetchError =>
  error instanceof Error && error.name === "ClientError";

export const isNotFoundError = (error: unknown): error is FetchError =>
  error instanceof Error && error.name === "NotFoundError";

// Default export
export default fetcher;
