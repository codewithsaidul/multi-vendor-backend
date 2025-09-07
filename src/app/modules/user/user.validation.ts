import z from "zod";
import { Types } from "mongoose";
import { UserRole } from "./user.interface";




export const createUserSchema = z.object({
  email: z.string("email must be a string").email().nonempty("Email is required"),
  password: z.string("password must be a string").min(6, "Password must be at least 6 characters"),
  role: z.nativeEnum(UserRole)
    .refine(role => role === UserRole.USER || role === UserRole.MANAGER, {
      message: "Role can only be USER or MANAGER (not ADMIN)",
    }),
  scopeId: z
    .string()
    .optional()
    .refine(val => !val || Types.ObjectId.isValid(val), {
      message: "Invalid MongoDB ObjectId for scopeId",
    }),
});



export const assignManagerSchema = z.object({
  scopeId: z.string().min(1, "Scope ID is required"),
});
