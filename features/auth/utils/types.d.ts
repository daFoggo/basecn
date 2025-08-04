export interface ISession {
  expiresAt?: string;
  token?: string;
  createdAt?: string;
  updatedAt?: string;
  userAgent?: string;
  userId?: string;
  id?: string;
}

export interface IUser {
  id?: string;
  userName?: string;
  email?: string;
  emailVerified?: boolean;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}
