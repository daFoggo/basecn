export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface IUserData {
  username: string;
  roles: string[];
  full_name: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  dob: number;
  gender: string;
  address: string;
  identity_card: string;
  identity_card_date: number;
  identity_card_place: string;
  is_active: boolean;
  last_login: string | null;
}
