import prisma from "../prisma/client.js";

// Create Project
export const createProject = async (req, res) => {
  try {
    const { title, description, githubUrl, liveUrl } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title required" });
    }

    const portfolio = await prisma.portfolio.findUnique({
      where: { userId: req.userId },
    });

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        githubUrl,
        liveUrl,
        portfolioId: portfolio.id,
      },
    });

    res.status(201).json({ message: "Project created", project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Projects of Logged User

export const getMyProjects = async (req, res) => {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { userId: req.userId },
    });

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    const projects = await prisma.project.findMany({
      where: { portfolioId: portfolio.id },
    });

    res.json(projects);
  } catch (error) {
    console.error(error); // ← THIS prints real error
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Project
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.project.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};