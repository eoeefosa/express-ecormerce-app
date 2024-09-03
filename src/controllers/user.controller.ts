// src/controllers/userController.ts
import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// JWT Secret key
const JWT_SECRET = "your_jwt_secret_key"; // Should be stored securely in environment variables

// Register a new user
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists." });
      return;
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Error registering user.");
  }
};

// Login a user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res
      .status(200)
      .json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send("Error logging in user.");
  }
};

// Get all users (Admin only)
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find().select("-password"); // Exclude password field
    res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).send("Error retrieving users.");
  }
};

// Middleware to protect routes
export const protect = async (
  req: Request,
  res: Response,
  next: Function
): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Not authorized, no token" });
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET) as {
            id: string;
            isAdmin: boolean;
        };
       
    req.user = decoded; // Adding user data to request object

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Middleware to authorize admin
export const admin = (req: Request, res: Response, next: Function): void => {
  const { user } = req.body;
  if (user && user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Admin privileges required" });
  }
};
