import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { VendorRoutes } from "../modules/vendor/vendor.route";
import { ProductRoutes } from "../modules/products/product.route";
import { UserRoutes } from "../modules/user/user.route";


export const router = Router();




const modulesRoute = [
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/vendors",
        route: VendorRoutes
    },
    {
        path: "/products",
        route: ProductRoutes
    }, 
    {
        path: "/users",
        route: UserRoutes
    }
]


modulesRoute.forEach(route => router.use(route.path, route.route))