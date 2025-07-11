import { type BaseSchema } from "../common/dto/base.dto";

export interface IUser extends BaseSchema {
  name: string;
  email: string;
  password: string;
  refreshToken?: string; // Optional refresh token
  role: "ADMIN" | "STAFF" | "USER";
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "STAFF" | "USER";
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  refreshToken?: string; // Allow updates to refreshToken
  active?: boolean;
  role?: "ADMIN" | "STAFF" | "USER";
  resetToken?: string | null; // Allow null values
}

export interface LoginUserDto {
  email: string;
  password: string;
}
