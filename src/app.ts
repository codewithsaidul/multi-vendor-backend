import cors from "cors";
import express, { type Application, type Request, type Response } from "express";
import cookieParser from "cookie-parser"


const app: Application = express();


app.set("trust proxy", 1)
app.use(cookieParser());
app.use(express.json());
app.use(cors());



app.get("/", (req: Request, res: Response) => {
  res.status(200).json("Welcome to Multi Vendor Backend");
});


export default app;