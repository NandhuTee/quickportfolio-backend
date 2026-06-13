import express from "express";
import {
  createPortfolio,
  getPortfolio,
  updatePortfolio,
  deletePortfolio,
  getPublicPortfolio,
} from "../controllers/portfolio.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import prisma from "../prisma/client.js";



const router = express.Router();

router.post(
  "/upload",
  authenticate,
  upload.single("image"),
  async (req, res) => {

    try {

      const portfolio =
        await prisma.portfolio.findUnique({
          where: {
            userId: req.userId,
          },
        });

      if (!portfolio) {
        return res.status(404).json({
          message: "Portfolio not found",
        });
      }

      const updated =
        await prisma.portfolio.update({
          where: {
            id: portfolio.id,
          },
          data: {
            imageUrl: `/uploads/${req.file.filename}`,
          },
        });

      res.json(updated);

    } catch (error) {
      res.status(500).json({
        message: "Upload failed",
      });
    }

  }
);


router.post("/", authenticate, createPortfolio);
router.get("/", authenticate, getPortfolio);
router.put("/", authenticate, updatePortfolio);
router.delete("/", authenticate, deletePortfolio);
router.get("/user/:username", getPublicPortfolio);
export default router;