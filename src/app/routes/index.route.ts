import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { VendorRoutes } from "../modules/vendor/vendor.route";


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
]


modulesRoute.forEach(route => router.use(route.path, route.route))