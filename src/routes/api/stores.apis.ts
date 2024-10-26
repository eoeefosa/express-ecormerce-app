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

router.post("/store", createStore);
router.get("/store", getStores);
router.get("/store/:id", getStoreById);
router.put("/store/:id", updateStore);
router.delete("/store/:id", deleteStore);

// Routes for managing products in a store
router.post("/store/products", addProductsToStore);
router.delete("/store/product", removeProductFromStore);
// get products from store 
// router.get("/store/products", addProductsToStore);
// update product by id in store
// router.put("/store/product", removeProductFromStore);


export default router;
