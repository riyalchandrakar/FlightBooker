import { Router } from "express";
import prisma from "../prismaClient";
import { authMiddleware, AuthRequest } from "../middleware/authMiddleware";

const router = Router();

// POST /booking/create
router.post("/create", authMiddleware, async (req: AuthRequest, res) => {
  const { flightId, passengers, passengerName, passengerEmail } = req.body;

  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const booking = await prisma.booking.create({
      data: {
        userId: req.user.id,
        flightId,
        passengers,
        passengerName,
        passengerEmail,
      },
      include: {
        flight: true,
      },
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /booking/:id
router.get("/:id", authMiddleware, async (req: AuthRequest, res) => {
  const id = Number(req.params.id);
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const booking = await prisma.booking.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
      include: {
        flight: true,
      },
    });

    if (!booking) return res.status(404).json({ message: "Not found" });

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// BONUS: booking history
router.get("/", authMiddleware, async (req: AuthRequest, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user.id },
      include: { flight: true },
      orderBy: { createdAt: "desc" },
    });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
