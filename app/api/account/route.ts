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
        account: true,
      },
    });

    if (!user?.account) {
      return NextResponse.json(
        { error: "Account not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      balance: user.account.balance,
      currency: user.account.currency,
    });
  } catch (error) {
    console.error("Account fetch error:", error);

    return NextResponse.json(
      { error: "Something went wrong while loading your account." },
      { status: 500 },
    );
  }
}