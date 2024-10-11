import { Router } from "express";
import { loginUser, verifyUser, userLogout, signUpUser } from "../controllers/userControllers.js";
import { loginValidator, signupValidator, validate } from "../utils/validator.js";
import { verifyToken } from "../utils/token_manager.js";

const userRouter = Router();

userRouter.post("/signup",validate(signupValidator),signUpUser);
userRouter.post("/login",validate(loginValidator),loginUser);
userRouter.get("/auth-status",verifyToken,verifyUser);
userRouter.get("/logout",verifyToken,userLogout);

export default userRouter;
