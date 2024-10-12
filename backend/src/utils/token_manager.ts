import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
config();

export const createToken = (id: string, username: string,role:string, expiresIn: string) => {
    const payload = { id, username,role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn,
    });
    return token;
};

export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.signedCookies[process.env.COOKIE_SECRET]; // Ensure the correct cookie name is used
    console.log("token")
    if (!token || token.trim() === "") {
      return res.status(401).json({ message: "Token Not Received" });
    }
    console.log("token something there");
    return new Promise<void>((resolve, reject) => {
      return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
        console.log("token verification");
        if (err) {
          console.log("message got in verification");
          reject(err.message);
          return res.status(401).json({ message: "Token Expired" });
        } else {
          resolve();
          console.log("token verification success");
          res.locals.jwtData = success;
          return next();
        }
      });
    });
  };