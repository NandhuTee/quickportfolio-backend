import prisma from "../prisma/client.js";

// Create Experience
export const createExperience = async (req, res) => {
  try {
    const { company, role, description, startDate, endDate } = req.body;

    const portfolio = await prisma.portfolio.findUnique({
      where: { userId: req.userId },
    });

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    const experience = await prisma.experience.create({
      data: {
        company,
        role,
        description,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        portfolioId: portfolio.id,
      },
    });

    res.status(201).json({ message: "Experience added", experience });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get My Experiences
export const getMyExperiences = async (req, res) => {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { userId: req.userId },
      include: { experiences: true },
    });

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    res.json(portfolio.experiences);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Experience
export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.experience.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Experience deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};