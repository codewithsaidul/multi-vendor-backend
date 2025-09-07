import cors from "cors";
import express, { type Application, type Request, type Response } from "express";
import cookieParser from "cookie-parser"
import { router } from "./app/routes/index.route";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFoundRoute } from "./app/middleware/notFoundRoute";
import { envVars } from "./app/config/env";


const app: Application = express();


app.set("trust proxy", 1)
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: envVars.FRONTEND_URL,
  credentials: true
}));




app.use("/api/v1", router)
app.get("/", (req: Request, res: Response) => {
  res.status(200).json("Welcome to Multi Vendor Backend");
});


app.use(globalErrorHandler)

app.use(notFoundRoute)

export default app;