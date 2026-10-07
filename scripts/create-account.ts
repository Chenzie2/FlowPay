import "dotenv/config";
import { prisma } from "@/lib/prisma";

async function main() {
  const email = "nila@gmail.com";

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  const existingAccount = await prisma.account.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (existingAccount) {
    console.log("Account already exists. Nothing to do.");
    return;
  }

  await prisma.account.create({
    data: {
      userId: user.id,
      balance: 0,
      currency: "KES",
    },
  });

  console.log("Account created successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });