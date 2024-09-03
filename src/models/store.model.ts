// src/models/store.model.ts
import { Schema, model, Document } from "mongoose";

// Define an interface for the Store document
export interface IStore extends Document {
  name: string;
  owner: Schema.Types.ObjectId;
  location: {
    address: string;
    city: string;
    state?: string;
    country: string;
    zipCode?: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  storeImage?: string;
  contact: {
    phone: string;
    email?: string;
  };
  products?: Schema.Types.ObjectId[];
  openingHours: {
    monday?: { open?: string; close?: string };
    tuesday?: { open?: string; close?: string };
    wednesday?: { open?: string; close?: string };
    thursday?: { open?: string; close?: string };
    friday?: { open?: string; close?: string };
    saturday?: { open?: string; close?: string };
    sunday?: { open?: string; close?: string };
  };
  ratings: {
    average: number;
    totalRatings: number;
  };
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

// Define the schema for stores
const storeSchema = new Schema<IStore>({
  name: { type: String, required: true, unique: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    country: { type: String, required: true },
    zipCode: { type: String },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  storeImage: { type: String },
  contact: {
    phone: { type: String, required: true },
    email: { type: String },
  },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  openingHours: {
    monday: { open: { type: String }, close: { type: String } },
    tuesday: { open: { type: String }, close: { type: String } },
    wednesday: { open: { type: String }, close: { type: String } },
    thursday: { open: { type: String }, close: { type: String } },
    friday: { open: { type: String }, close: { type: String } },
    saturday: { open: { type: String }, close: { type: String } },
    sunday: { open: { type: String }, close: { type: String } },
  },
  ratings: {
    average: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
  },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

// Middleware to update the updatedAt field before saving
storeSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Create and export the Store model
const Store = model<IStore>("Store", storeSchema);

export default Store;
