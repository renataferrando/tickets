import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Ensure categories exist
  let categories = await prisma.category.findMany();
  if (categories.length === 0) {
    console.log("⚠️ No categories found! Creating default categories...");
    categories = await prisma.$transaction([
      prisma.category.create({ data: { name: "Live Music" } }),
      prisma.category.create({ data: { name: "Sports" } }),
      prisma.category.create({ data: { name: "Education" } }),
      prisma.category.create({ data: { name: "Entertainment" } }),
      prisma.category.create({ data: { name: "Health" } }),
    ]);
  }

  // Ensure "Culture" category exists
  await prisma.category.upsert({
    where: { name: "Culture" },
    update: {},
    create: { name: "Culture" },
  });

  // Ensure an organizer exists
  let organizer = await prisma.user.findFirst();
  if (!organizer) {
    console.log("⚠️ No users found! Creating a default organizer...");
    organizer = await prisma.user.create({
      data: {
        name: "Default Organizer",
        lastName: "Doe",
        email: "organizer@example.com",
      },
    });
  }

  // Sample events (only used for empty DBs)
  const events = [
    {
      name: "Rock Festival 2025",
      date: new Date("2025-06-15T18:00:00Z"),
      location: "Los Angeles, CA",
      description: "A big rock festival featuring famous bands.",
      categoryId:
        categories.find((c) => c.name === "Live Music")?.id || categories[0].id,
      imageUrl: "",
      organizerId: organizer.id,
    },
    {
      name: "Tech Conference 2025",
      date: new Date("2025-09-20T10:00:00Z"),
      location: "San Francisco, CA",
      description: "A conference about the latest in tech.",
      categoryId:
        categories.find((c) => c.name === "Education")?.id || categories[0].id,
      imageUrl: "",
      organizerId: organizer.id,
    },
    {
      name: "NBA Finals Game 3",
      date: new Date("2025-07-10T20:00:00Z"),
      location: "Madison Square Garden, NY",
      description: "The third game of the NBA Finals.",
      categoryId:
        categories.find((c) => c.name === "Sports")?.id || categories[0].id,
      imageUrl: "",
      organizerId: organizer.id,
    },
    {
      name: "Indie Film Showcase",
      date: new Date("2025-08-18T17:00:00Z"),
      location: "Sundance, UT",
      description: "A selection of the best indie films of the year.",
      categoryId:
        categories.find((c) => c.name === "Art & Film")?.id || categories[0].id,
      imageUrl: "",
      organizerId: organizer.id,
    },
    {
      name: "Coachella 2025",
      date: new Date("2025-04-12T16:00:00Z"),
      location: "Indio, CA",
      description: "The iconic music and arts festival.",
      categoryId:
        categories.find((c) => c.name === "Live Music")?.id || categories[0].id,
      imageUrl: "",
      organizerId: organizer.id,
    },
    {
      name: "Machine Learning Bootcamp",
      date: new Date("2025-10-01T08:00:00Z"),
      location: "Seattle, WA",
      description: "A hands-on bootcamp on machine learning techniques.",
      categoryId:
        categories.find((c) => c.name === "Education")?.id || categories[0].id,
      imageUrl: "",
      organizerId: organizer.id,
    },
    {
      name: "US Open Final",
      date: new Date("2025-09-07T21:00:00Z"),
      location: "New York, NY",
      description: "The final match of the US Open tennis tournament.",
      categoryId:
        categories.find((c) => c.name === "Sports")?.id || categories[0].id,
      imageUrl: "",
      organizerId: organizer.id,
    },
    {
      name: "Art Basel Miami",
      date: new Date("2025-12-05T11:00:00Z"),
      location: "Miami, FL",
      description: "One of the world's largest modern art fairs.",
      categoryId:
        categories.find((c) => c.name === "Art & Film")?.id || categories[0].id,
      imageUrl: "",
      organizerId: organizer.id,
    },
    {
      name: "Burning Man 2025",
      date: new Date("2025-08-25T10:00:00Z"),
      location: "Black Rock Desert, NV",
      description:
        "An annual gathering focused on community, art, self-expression, and self-reliance.",
      categoryId:
        categories.find((c) => c.name === "Live Music")?.id || categories[0].id,
      imageUrl: "",
      organizerId: organizer.id,
    },
    {
      name: "AI Ethics Panel",
      date: new Date("2025-11-15T14:00:00Z"),
      location: "Boston, MA",
      description:
        "A discussion on the ethical implications of artificial intelligence.",
      categoryId:
        categories.find((c) => c.name === "Education")?.id || categories[0].id,
      imageUrl: "",
      organizerId: organizer.id,
    },
  ];

  // Insert sample events only if none exist
  const existingEvents = await prisma.event.count();
  if (existingEvents === 0) {
    await prisma.event.createMany({ data: events });
    console.log("✅ Events seeded successfully!");
  } else {
    console.log("ℹ️ Events already exist. Skipping event seeding.");
  }
}

// Run the seed function
main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
