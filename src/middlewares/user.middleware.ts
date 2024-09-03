import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECERT } from "../../configs"; // Adjust the import as necessary

// Middleware to protect routes
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Not authorized, no token" });
      return;
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, JWT_SECERT as string) as {
      id: string;
      isAdmin: boolean;
    };

    // Attach user information to request object
    req.user = { id: decoded.id, isAdmin: decoded.isAdmin };

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Middleware to authorize admin
export const admin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Admin privileges required" });
  }
};
