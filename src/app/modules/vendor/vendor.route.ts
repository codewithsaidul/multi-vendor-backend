import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../user/user.interface";
import { VendorController } from "./vendor.controller";
import { validateRequest } from "../../middleware/validatedRequest";
import { createVendorSchema } from "./vendor.validation";



const route = Router();

route.post("/", validateRequest(createVendorSchema), checkAuth(UserRole.ADMIN), VendorController.createNewVendor);
route.get("/", checkAuth(UserRole.ADMIN), VendorController.getAllVendor);



export const VendorRoutes = route