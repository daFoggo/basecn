import { IAuthTokens } from "./types/token";
import { IUserData } from "./types/user";

// Local storage keys
const TOKEN_KEY = "auth_tokens";
const USER_KEY = "auth_user";

// Token management
export const saveTokens = (tokens: IAuthTokens): void => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
};

export const getTokens = (): IAuthTokens | null => {
  const tokensStr = localStorage.getItem(TOKEN_KEY);
  if (!tokensStr) return null;

  try {
    return JSON.parse(tokensStr) as IAuthTokens;
  } catch (e) {
    console.error("Failed to parse auth tokens", e);
    return null;
  }
};

export const getAccessToken = (): string | null => {
  const tokens = getTokens();
  if (!tokens) return null;

  // Check if token is expired
  if (tokens.expiresAt < Date.now()) {
    return null;
  }

  return tokens.accessToken;
};

export const getRefreshToken = (): string | null => {
  const tokens = getTokens();
  return tokens?.refreshToken || null;
};

export const clearTokens = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

// User data management
export const saveUser = (user: IUserData): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = (): IUserData | null => {
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;

  try {
    return JSON.parse(userStr) as IUserData;
  } catch (e) {
    console.error("Failed to parse user data", e);
    return null;
  }
};

export const clearUser = (): void => {
  localStorage.removeItem(USER_KEY);
};

// Clear all auth data
export const clearAuthData = (): void => {
  clearTokens();
  clearUser();
};

// Check if user is authenticated based on token existence and validity
export const isAuthenticated = (): boolean => {
  const tokens = getTokens();
  if (!tokens) return false;

  // Check if token is expired
  return tokens.expiresAt > Date.now();
};
