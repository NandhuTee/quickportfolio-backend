import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import portfolioRoutes from "./routes/portfolio.routes.js";
import projectRoutes from "./routes/project.routes.js";
import experienceRoutes from "./routes/experience.routes.js";
import socialRoutes from "./routes/social.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/portfolio", portfolioRoutes);
app.use("/projects", projectRoutes);
app.use("/experience", experienceRoutes);
app.use("/links", socialRoutes);

/* HEALTH CHECK */
app.get("/", (req, res) => {
  res.json({ message: "QuickPortfolio API Running 🚀" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});