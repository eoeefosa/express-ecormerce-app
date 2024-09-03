// src/routes/storeRoutes.ts
import { Router } from "express";
import {
  createStore,
  getStores,
  getStoreById,
  updateStore,
  deleteStore,
  addProductsToStore,
  removeProductFromStore,
} from "../../controllers/store.controller";

const router = Router();

router.post("/", createStore);
router.get("/", getStores);
router.get("/:id", getStoreById);
router.put("/:id", updateStore);
router.delete("/:id", deleteStore);

// Routes for managing products in a store
router.post("/add-products", addProductsToStore);
router.post("/remove-product", removeProductFromStore);

export default router;
