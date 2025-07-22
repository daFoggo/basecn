import { clearTokens, getAccessToken } from "./storage";

export const fetcher = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  // Get the current access token
  const token = getAccessToken();

  // Prepare headers with authentication if token exists
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Handle unauthorized errors (expired token)
    if (response.status === 401) {
      // Clear tokens on authentication failure
      clearTokens();
      // Redirect to login page
      window.location.href = "/login";
      throw new Error("Authentication failed");
    }

    // Handle other error responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Request failed");
    }

    // Parse and return JSON response
    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};
