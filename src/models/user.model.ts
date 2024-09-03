// src/models/user.model.ts
import { Schema, model, Document, Model } from "mongoose";
import bcrypt from "bcryptjs"; // For password hashing

// Interface to define the shape of User Document
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  subscriptionId?: Schema.Types.ObjectId;
  createdAt: Date; // Add createdAt field to interface
  updatedAt: Date; // Add updatedAt field to interface
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define the User schema
const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  subscriptionId: { type: Schema.Types.ObjectId, ref: "Subscription" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to hash password before saving
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.error(error);
    next();
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create and export User model
const User: Model<IUser> = model<IUser>("User", userSchema);

export default User;
