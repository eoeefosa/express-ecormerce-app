import { Schema, model } from "mongoose";

const walletSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User schema
  balance: { type: Number, default: 0, required: true }, // Current wallet balance
  currency: { type: String, default: "USD", required: true }, // Currency type, defaulting to USD
  transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }], // Array of references to Transaction schema
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the wallet was created
  updatedAt: { type: Date, default: Date.now }, // Timestamp for when the wallet was last updated
});

// Middleware to update the updatedAt field before saving
walletSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Create the Wallet model from the schema
const Wallet = model("Wallet", walletSchema);

export default Wallet;
