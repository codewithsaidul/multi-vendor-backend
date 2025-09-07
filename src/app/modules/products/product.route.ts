import { Router } from "express";
import { validateRequest } from "../../middleware/validatedRequest";
import { createProductValidationSchema, updateProductValidationSchema } from "./product.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../user/user.interface";
import { ProductController } from "./prodct.controller";



const route = Router();

route.post("/", validateRequest(createProductValidationSchema), checkAuth(...Object.values(UserRole)), ProductController.createProductInDB)
route.get("/", checkAuth(...Object.values(UserRole)), ProductController.getAllProducts)
route.patch("/:productId", validateRequest(updateProductValidationSchema), checkAuth(...Object.values(UserRole)), ProductController.updateProduct)
route.delete("/:productId", checkAuth(...Object.values(UserRole)), ProductController.deleteProduct)

export const ProductRoutes = route;