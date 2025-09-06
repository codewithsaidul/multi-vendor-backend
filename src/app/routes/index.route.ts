import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";


export const router = Router();




const modulesRoute = [
    {
        path: "/auth",
        route: AuthRoutes
    }
]


modulesRoute.forEach(route => router.use(route.path, route.route))