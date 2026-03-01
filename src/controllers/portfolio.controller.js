import prisma from "../prisma/client.js";

export const createPortfolio = async (req, res) => {
  try {
    const { bio, skills } = req.body;

    const existing = await prisma.portfolio.findFirst({
      where: { userId: req.userId },
    });

    if (existing) {
      return res.status(400).json({
        message: "Portfolio already exists",
      });
    }

    const portfolio = await prisma.portfolio.create({
      data: {
        bio,
        skills,
        userId: req.userId,
      },
    });

    res.status(201).json({ message: "Portfolio created", portfolio });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getPortfolio = async (req, res) => {
  try {
    const portfolio = await prisma.portfolio.findMany({
      where: { userId: req.userId },
    });

    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updatePortfolio = async (req, res) => {
  try {
    const { bio, skills } = req.body;

    const existing = await prisma.portfolio.findFirst({
      where: { userId: req.userId },
    });

    if (!existing) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    const updated = await prisma.portfolio.update({
      where: { id: existing.id },
      data: { bio, skills },
    });

    res.json({ message: "Portfolio updated", updated });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// 🌍 Public Portfolio View
export const getPublicPortfolio = async (req, res) => {
  try {
    const { userId } = req.params;

    const portfolio = await prisma.portfolio.findFirst({
      where: { userId: Number(userId) },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!portfolio) {
      return res.status(404).json({
        message: "Portfolio not found",
      });
    }

    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deletePortfolio = async (req, res) => {
  try {
    const existing = await prisma.portfolio.findFirst({
      where: { userId: req.userId },
    });

    if (!existing) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    await prisma.portfolio.delete({
      where: { id: existing.id },
    });

    res.json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};