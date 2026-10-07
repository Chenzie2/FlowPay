import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        account: {
          include: {
            transactions: {
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        },
      },
    });

    if (!user?.account) {
      return NextResponse.json(
        { error: "Account not found." },
        { status: 404 },
      );
    }

    const transactions = user.account.transactions.map((transaction) => ({
      id: transaction.id,
      name: transaction.description,
      description:
        transaction.type === "RECEIVE"
          ? "Payment received"
          : "Payment sent",
      date: transaction.createdAt.toISOString(),
      amount: transaction.amount,
      type: transaction.type === "RECEIVE" ? "in" : "out",
      status: transaction.status,
    }));

    return NextResponse.json({
      transactions,
    });
  } catch (error) {
    console.error("Transactions fetch error:", error);

    return NextResponse.json(
      { error: "Something went wrong while loading transactions." },
      { status: 500 },
    );
  }
}