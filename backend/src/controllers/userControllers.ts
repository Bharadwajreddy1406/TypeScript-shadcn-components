import mongoose from "mongoose";
import e, { NextFunction, Request, Response } from "express";
import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/token_manager.js";

export async function signUpUser(req: Request, res: Response) {
    try {
        const { rollnumber, password } = req.body;

        if (!rollnumber || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const UserName = rollnumber.toUpperCase();

        // Checking if user already exists
        const existingUser = await UserModel.findOne({ rollnumber: UserName });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Determine role based on rollnumber
        let role = "student";
        if (UserName.includes("ADMIN")) {
            role = "admin";
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new UserModel({
            rollnumber: UserName,
            password: hashedPassword,
            role,
            loginTimestamps: [] // empty array initially
        });

        await newUser.save();

        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error.message);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { rollnumber, password } = req.body;

        if (!rollnumber || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const UserName = rollnumber.toUpperCase();

        const user = await UserModel.findOne({ rollnumber: UserName });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.clearCookie("auth_token", {
            httpOnly: true,
            path: "/",
            domain: "localhost",
            signed: true
        });

        const token = createToken(user._id.toString(), user.rollnumber, "7d");

        res.cookie("auth_token", token, {
            path: "/",   // where the cookie is stored
            domain: "localhost",  // where the cookie is sent
            expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
            httpOnly: true,
            signed: true,
        });

        // Respond with success
        return res.status(200).json({ message: "Login successful", rollnumber: user.rollnumber, role: user.role });
    } catch (error) {
        console.error("Error logging in user:", error.message);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
};

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserModel.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered or Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        return res.status(200).json({ message: "Login successful", rollnumber: user.rollnumber, role: user.role });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Error", cause: error.message });
    }
};

export const userLogout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserModel.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered or Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        res.clearCookie("auth_token", {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });

        return res.status(200).json({ message: "Logout successful", rollnumber: user.rollnumber });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Error", cause: error.message });
    }
};