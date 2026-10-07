import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in to receive money." },
        { status: 401 },
      );
    }

    const body = await request.json();

    const senderName = body.senderName?.trim();
    const amount = Number(body.amount);

    if (!senderName) {
      return NextResponse.json(
        { error: "Please enter the sender's name." },
        { status: 400 },
      );
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        { error: "Please enter a valid amount." },
        { status: 400 },
      );
    }

    if (!Number.isInteger(amount)) {
      return NextResponse.json(
        { error: "Amount must be a whole number." },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { account: true },
    });

    if (!user?.account) {
      return NextResponse.json(
        { error: "Your FlowPay account could not be found." },
        { status: 404 },
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const updatedAccount = await tx.account.update({
        where: { id: user.account!.id },
        data: {
          balance: {
            increment: amount,
          },
        },
      });

      const transaction = await tx.transaction.create({
        data: {
          accountId: user.account!.id,
          type: "RECEIVE",
          amount,
          description: senderName,
          status: "COMPLETED",
        },
      });

      return {
        balance: updatedAccount.balance,
        transaction,
      };
    });

    return NextResponse.json({
      message: "Payment received successfully.",
      balance: result.balance,
      transactionId: result.transaction.id,
    });
  } catch (error) {
    console.error("Receive money error:", error);

    return NextResponse.json(
      { error: "Something went wrong while receiving money." },
      { status: 500 },
    );
  }
}