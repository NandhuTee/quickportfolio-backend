import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import portfolioRoutes from "./routes/portfolio.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/portfolio", portfolioRoutes);

app.get("/", (req, res) => {
  res.json({ message: "QuickPortfolio API Running 🚀" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});