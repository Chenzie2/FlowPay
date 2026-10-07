import "dotenv/config";
import { prisma } from "@/lib/prisma";

async function main() {
  const email = process.env.SEED_EMAIL;

  if (!email) {
    throw new Error("SEED_EMAIL is required.");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
    include: {
      account: true,
    },
  });

  if (!user?.account) {
    throw new Error("User account not found.");
  }

  const existingTransactions = await prisma.transaction.count({
    where: {
      accountId: user.account.id,
    },
  });

  if (existingTransactions > 0) {
    await prisma.account.update({
      where: {
        id: user.account.id,
      },
      data: {
        balance: 6650,
      },
    });

    console.log(
      "Transactions already exist. Account balance synced to KSh 6,650.",
    );

    return;
  }

  await prisma.transaction.createMany({
    data: [
      {
        accountId: user.account.id,
        type: "RECEIVE",
        amount: 8500,
        description: "MayaStudio",
        status: "COMPLETED",
      },
      {
        accountId: user.account.id,
        type: "SEND",
        amount: 1850,
        description: "KofiMarket",
        status: "COMPLETED",
      },
    ],
  });

  await prisma.account.update({
    where: {
      id: user.account.id,
    },
    data: {
      balance: 6650,
    },
  });

  console.log("Transactions seeded successfully.");
  console.log("Account balance updated to KSh 6,650.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });