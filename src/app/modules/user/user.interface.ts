import { Types } from "mongoose";

export enum UserRole {
  ADMIN = "admin",
  MANAGER = "manager",
  USER = "user",
}

export interface IUser {
  email: string;
  password: string;
  role: UserRole;
  scopeId?: Types.ObjectId;
}
