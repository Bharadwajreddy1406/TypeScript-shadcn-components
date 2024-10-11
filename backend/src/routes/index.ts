import { Router } from "express";
import userRouter from "./userRoutes.js";

const appRouter = Router();

appRouter.use("/user", userRouter);

export default appRouter;
