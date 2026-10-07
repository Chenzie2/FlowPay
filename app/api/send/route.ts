import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in to send money." },
        { status: 401 },
      );
    }

    const body = await request.json();

    const recipientName = body.recipientName?.trim();
    const amount = Number(body.amount);

    if (!recipientName) {
      return NextResponse.json(
        { error: "Please select a recipient." },
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
      where: {
        email: session.user.email,
      },
      include: {
        account: true,
      },
    });

    if (!user?.account) {
      return NextResponse.json(
        { error: "Your FlowPay account could not be found." },
        { status: 404 },
      );
    }

    if (user.account.balance < amount) {
      return NextResponse.json(
        {
          error: "Insufficient balance.",
        },
        { status: 400 },
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const updatedAccount = await tx.account.update({
        where: {
          id: user.account!.id,
        },
        data: {
          balance: {
            decrement: amount,
          },
        },
      });

      const transaction = await tx.transaction.create({
        data: {
          accountId: user.account!.id,
          type: "SEND",
          amount,
          description: recipientName,
          status: "COMPLETED",
        },
      });

      return {
        balance: updatedAccount.balance,
        transaction,
      };
    });

    return NextResponse.json({
      message: "Payment sent successfully.",
      balance: result.balance,
      transactionId: result.transaction.id,
    });
  } catch (error) {
    console.error("Send money error:", error);

    return NextResponse.json(
      { error: "Something went wrong while sending money." },
      { status: 500 },
    );
  }
}