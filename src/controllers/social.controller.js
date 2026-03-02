import prisma from "../prisma/client.js";

export const createLink = async (req, res) => {
  try {
    const { platform, url } = req.body;

    const portfolio = await prisma.portfolio.findUnique({
      where: { userId: req.userId },
    });

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    const link = await prisma.socialLink.create({
      data: {
        platform,
        url,
        portfolioId: portfolio.id,
      },
    });

    res.status(201).json({ message: "Link added", link });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyLinks = async (req, res) => {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { userId: req.userId },
      include: { links: true },
    });

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    res.json(portfolio.links);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteLink = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.socialLink.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Link deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};