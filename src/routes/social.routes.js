import express from "express";
import {
  createLink,
  getMyLinks,
  deleteLink,
} from "../controllers/social.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, createLink);
router.get("/", authenticate, getMyLinks);
router.delete("/:id", authenticate, deleteLink);

export default router;