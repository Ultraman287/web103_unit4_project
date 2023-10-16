import express from "express";

import OrderController from "../controllers/order.js";

const router = express.Router();

router.get("/", OrderController.getOrders);

router.post("/", OrderController.createOrder);

router.get("/:id", OrderController.getOrder);

router.delete("/:id", OrderController.deleteOrder);

router.put("/:id", OrderController.updateOrder);

export default router;
