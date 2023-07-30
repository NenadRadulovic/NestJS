export interface CreateUserDTO {
  email: string;
  first_name?: string;
  last_name?: string;
  password: string;
  role: number;
}
