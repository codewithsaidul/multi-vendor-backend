import { Router } from "express";
import { UserController } from "./user.controller";
import { assignManagerSchema } from "./user.validation";
import { validateRequest } from "../../middleware/validatedRequest";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "./user.interface";



const route = Router();


route.post("/:userId/assign-manager", validateRequest(assignManagerSchema), checkAuth(UserRole.ADMIN), UserController.assignToManager);



export const UserRoutes = route