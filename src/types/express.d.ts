import { IUser } from "../models/user.model"; // Adjust path as necessary

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        isAdmin: boolean;
      };
    }
  }
}
