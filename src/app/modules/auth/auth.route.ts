import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../middleware/validatedRequest";
import { loginSchema } from "./auth.validation";


const router = Router();


router.post("/login", validateRequest(loginSchema), AuthController.credentialsLogin)

export const AuthRoutes = router