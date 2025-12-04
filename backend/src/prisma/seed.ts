import prisma from "../prismaClient";
import bcrypt from "bcryptjs";

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);

  const user = await prisma.user.upsert({
    where: { email: "testuser@example.com" },
    update: {},
    create: {
      email: "testuser@example.com",
      name: "Test User",
      password: passwordHash,
    },
  });

  console.log("User created: ", user.email);

  await prisma.flight.createMany({
    data: [
      {
        fromCity: "Delhi",
        toCity: "Mumbai",
        departureTime: new Date("2025-01-10T09:00:00Z"),
        arrivalTime: new Date("2025-01-10T11:00:00Z"),
        airlineName: "IndiGo",
        airlineLogoUrl:
          "https://upload.wikimedia.org/wikipedia/commons/8/87/IndiGo_logo.svg",
        flightNumber: "6E-512",
        durationMin: 120,
        price: 4500,
      },
      {
        fromCity: "Delhi",
        toCity: "Mumbai",
        departureTime: new Date("2025-01-10T14:00:00Z"),
        arrivalTime: new Date("2025-01-10T16:30:00Z"),
        airlineName: "Air India",
        airlineLogoUrl:
          "https://upload.wikimedia.org/wikipedia/en/3/3b/Air_India_Logo.svg",
        flightNumber: "AI-101",
        durationMin: 150,
        price: 5200,
      }
    ],
    skipDuplicates: true,
  });

  console.log("Flights seeded");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
