import express from "express";
import {
  createPortfolio,
  getPortfolio,
  updatePortfolio,
  deletePortfolio,
  getPublicPortfolio,
} from "../controllers/portfolio.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, createPortfolio);
router.get("/", authenticate, getPortfolio);
router.put("/", authenticate, updatePortfolio);
router.delete("/", authenticate, deletePortfolio);
router.get("/:userId", getPublicPortfolio);
export default router;