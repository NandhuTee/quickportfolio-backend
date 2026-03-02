import express from "express";
import {
  createExperience,
  getMyExperiences,
  deleteExperience,
} from "../controllers/experience.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, createExperience);
router.get("/", authenticate, getMyExperiences);
router.delete("/:id", authenticate, deleteExperience);

export default router;