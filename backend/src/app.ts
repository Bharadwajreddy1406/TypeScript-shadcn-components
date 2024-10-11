import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import appRouter from "./routes/index.js";
dotenv.config();



const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5173"}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/v1",appRouter)

export default app;


