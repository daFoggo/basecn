import type { ISession } from "./types";

export const generateSampleSession = (): ISession => {
  const now = new Date();
  const expirationTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  return {
    id: `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`,
    token: `jwt_${Math.random().toString(36).substring(2, 15)}${Math.random()
      .toString(36)
      .substring(2, 15)}`,
    userId: `user_${Math.random().toString(36).substring(2, 10)}`,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    expiresAt: expirationTime.toISOString(),
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
  };
};
