"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/storeRoutes.ts
const express_1 = require("express");
const store_controller_1 = require("../../controllers/store.controller");
const router = (0, express_1.Router)();
router.post("/store", store_controller_1.createStore);
router.get("/store", store_controller_1.getStores);
router.get("/store/:id", store_controller_1.getStoreById);
router.put("/store/:id", store_controller_1.updateStore);
router.delete("/store/:id", store_controller_1.deleteStore);
// Routes for managing products in a store
router.post("/store/products", store_controller_1.addProductsToStore);
router.delete("/store/product", store_controller_1.removeProductFromStore);
// get products from store 
// router.get("/store/products", addProductsToStore);
// update product by id in store
// router.put("/store/product", removeProductFromStore);
exports.default = router;
