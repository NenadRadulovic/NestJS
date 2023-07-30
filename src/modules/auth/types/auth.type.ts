export interface AuthUserType {
  email: string;
  password: string;
}

export interface JwtType {
  access_token: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export type AuthError = {
  message: string;
  status: number;
};

export type AuthUser = {
  _id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  created_at: Date;
  updated_at: Date;
};
