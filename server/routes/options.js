import express from "express";

import OrderController from "../controllers/order.js";

const router = express.Router();

router.get("/noodles", OrderController.getNoodles);
router.get("/noodles/:name", OrderController.getNoodlebyName);

router.get("/proteins", OrderController.getProteins);
router.get("/proteins/:name", OrderController.getProteinbyName);

router.get("/addons", OrderController.getAddons);
router.get("/addons/:name", OrderController.getAddonbyName);

export default router;
