import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  is_verified: { type: Boolean, default: false },
});

const User = model("Users", userSchema);

export default User;
