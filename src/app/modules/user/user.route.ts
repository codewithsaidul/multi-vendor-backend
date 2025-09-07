import { Router } from "express";
import { UserController } from "./user.controller";
import { assignManagerSchema, createUserSchema } from "./user.validation";
import { validateRequest } from "../../middleware/validatedRequest";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "./user.interface";



const route = Router();

route.post("/create-user", validateRequest(createUserSchema), checkAuth(UserRole.ADMIN), UserController.createNewUser);
route.post("/:userId/assign-manager", validateRequest(assignManagerSchema), checkAuth(UserRole.ADMIN), UserController.assignToManager);
route.get("/", checkAuth(UserRole.ADMIN), UserController.getAllUsers);



export const UserRoutes = route