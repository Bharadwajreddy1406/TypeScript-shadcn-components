import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const createToken = (id: string, username: string, expiresIn: string) => {
    const payload = { id, username};
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
    const token = req.signedCookies["auth_token"];
    console.log(token)
    if (!token || token.trim() === "") {
      return res.status(401).json({ message: "Token Not Received" });
    }
    return new Promise<void>((resolve, reject) => {
      return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
        if (err) {
          reject(err.message);
          return res.status(401).json({ message: "Token Expired" });
        } else {
          resolve();
          res.locals.jwtData = success;
          return next();
        }
      });
    });
  };