export interface Auth {
  id?: number;
  email: string;
  password: string;
  username?: string;
  role?: string;
  access_token?: string;
  refresh_token?: string;
  last_login?: Date;
}
