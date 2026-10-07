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
      where: { email: session.user.email },
      include: { account: true },
    });

    if (!user?.account) {
      return NextResponse.json(
        { error: "Account not found." },
        { status: 404 },
      );
    }

    const accountReference = `FP-${user.account.id
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(-8)
      .toUpperCase()}`;

    return NextResponse.json({
      name: user.name,
      email: user.email,
      balance: user.account.balance,
      currency: user.account.currency,
      accountReference,
    });
  } catch (error) {
    console.error("Account fetch error:", error);

    return NextResponse.json(
      { error: "Something went wrong while loading your account." },
      { status: 500 },
    );
  }
}