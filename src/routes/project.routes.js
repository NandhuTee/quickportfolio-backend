import express from "express";
import {
  createProject,
  getMyProjects,
  deleteProject,
} from "../controllers/project.controller.js";
import {authenticate} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, createProject);
router.get("/", authenticate, getMyProjects);
router.delete("/:id", authenticate, deleteProject);

export default router;