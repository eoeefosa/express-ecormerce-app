import { Schema, model } from "mongoose";

// Define the Store schema
const storeSchema = new Schema({
  name: { type: String, required: true, unique: true }, // Store name, must be unique
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User schema for the store owner
  location: {
    address: { type: String, required: true }, // Store address
    city: { type: String, required: true }, // City where the store is located
    state: { type: String }, // State or region
    country: { type: String, required: true }, // Country
    zipCode: { type: String }, // ZIP or postal code
    coordinates: {
      lat: { type: Number, required: true }, // Latitude coordinate for geolocation
      lng: { type: Number, required: true }, // Longitude coordinate for geolocation
    },
  },
  storeImage: { type: String },
  contact: {
    phone: { type: String, required: true }, // Store contact number
    email: { type: String }, // Store contact email
  },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }], // Array of references to the Product schema
  openingHours: {
    monday: { open: { type: String }, close: { type: String } }, // Opening hours for Monday
    tuesday: { open: { type: String }, close: { type: String } }, // Opening hours for Tuesday
    wednesday: { open: { type: String }, close: { type: String } }, // Opening hours for Wednesday
    thursday: { open: { type: String }, close: { type: String } }, // Opening hours for Thursday
    friday: { open: { type: String }, close: { type: String } }, // Opening hours for Friday
    saturday: { open: { type: String }, close: { type: String } }, // Opening hours for Saturday
    sunday: { open: { type: String }, close: { type: String } }, // Opening hours for Sunday
  },
  ratings: {
    average: { type: Number, default: 0 }, // Average rating for the store
    totalRatings: { type: Number, default: 0 }, // Total number of ratings received
  },
  description: { type: String }, // Optional description of the store
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the store was created
  updatedAt: { type: Date, default: Date.now }, // Timestamp for when the store was last updated
  isActive: { type: Boolean, default: true }, // Boolean flag to indicate if the store is active or not
});

// Middleware to update the updatedAt field before saving
storeSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Create the Store model from the schema
const Store = model("Store", storeSchema);

export default Store;
