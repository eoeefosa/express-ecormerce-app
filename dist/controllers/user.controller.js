"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = exports.protect = exports.getAllUsers = exports.loginUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// JWT Secret key
const JWT_SECRET = "your_jwt_secret_key"; // Should be stored securely in environment variables
// Register a new user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        // Check if user already exists
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists." });
            return;
        }
        // Create new user
        const newUser = new user_model_1.default({
            username,
            email,
            password,
        });
        yield newUser.save();
        res.status(201).json({ message: "User registered successfully." });
    }
    catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Error registering user.");
    }
});
exports.registerUser = registerUser;
// Login a user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            res.status(401).json({ message: "Invalid email or password." });
            return;
        }
        const isMatch = yield user.comparePassword(password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid email or password." });
            return;
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: user._id, isAdmin: user.isAdmin }, JWT_SECRET, {
            expiresIn: "1h",
        });
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
    }
    catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).send("Error logging in user.");
    }
});
exports.loginUser = loginUser;
// Get all users (Admin only)
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find().select("-password"); // Exclude password field
        res.status(200).json(users);
    }
    catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).send("Error retrieving users.");
    }
});
exports.getAllUsers = getAllUsers;
// Middleware to protect routes
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Not authorized, no token" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // req.user = decoded; 
        next();
    }
    catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ message: "Not authorized, token failed" });
    }
});
exports.protect = protect;
// Middleware to authorize admin
const admin = (req, res, next) => {
    const { user } = req.body;
    if (user && user.isAdmin) {
        next();
    }
    else {
        res.status(403).json({ message: "Admin privileges required" });
    }
};
exports.admin = admin;
