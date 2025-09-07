import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../user/user.interface";
import { VendorController } from "./vendor.controller";



const route = Router();


route.get("/", checkAuth(UserRole.ADMIN), VendorController.getAllVendor);



export const VendorRoutes = route