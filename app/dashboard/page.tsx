import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import FlowPayLogo from "@/components/flowpay-logo";

export default async function DashboardPage() {
  const session = await auth();

  const user = session?.user?.email
    ? await prisma.user.findUnique({
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
                take: 5,
              },
            },
          },
        },
      })
    : null;

  const account = user?.account;
  const transactions = account?.transactions ?? [];
  const userName = user?.name ?? session?.user?.name ?? "there";

  return (
    <main className="min-h-screen bg-[#fdfbf9] text-[#241f23]">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <header className="flex items-center justify-between">
          <Link href="/">
            <FlowPayLogo />
          </Link>

          <Link
            href="/api/auth/signout"
            className="text-sm font-medium text-[#766d72] transition hover:text-[#4b3443]"
          >
            Log out
          </Link>
        </header>

        <section className="mt-12">
          <p className="text-sm font-medium text-[#766d72]">
            Welcome back
          </p>

          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            {userName}
          </h1>
        </section>

        <section className="mt-8 rounded-3xl bg-[#4b3443] p-8 text-white shadow-sm">
          <p className="text-sm text-white/70">Available balance</p>

          <p className="mt-3 text-4xl font-semibold tracking-tight">
            {account?.currency ?? "KES"}{" "}
            {account?.balance.toLocaleString() ?? "0"}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/send"
              className="rounded-full bg-[#f5e1e5] px-5 py-2.5 text-sm font-semibold text-[#4b3443] transition hover:bg-white"
            >
              Send money
            </Link>

            <Link
              href="/receive"
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Receive money
            </Link>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#766d72]">
                Activity
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                Recent transactions
              </h2>
            </div>

            <Link
              href="/transactions"
              className="text-sm font-semibold text-[#4b3443] transition hover:text-[#d98b9a]"
            >
              View all
            </Link>
          </div>

          <div className="mt-5 rounded-3xl border border-[#ebe4e1] bg-white p-6">
            {transactions.length === 0 ? (
              <p className="text-sm text-[#766d72]">
                No transactions yet.
              </p>
            ) : (
              <div className="divide-y divide-[#ebe4e1]">
                {transactions.map((transaction) => {
                  const isReceive = transaction.type === "RECEIVE";

                  return (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium text-[#241f23]">
                          {transaction.description}
                        </p>

                        <p className="mt-1 text-sm text-[#766d72]">
                          {isReceive ? "Received" : "Sent"}
                        </p>
                      </div>

                      <p
                        className={`font-semibold ${
                          isReceive
                            ? "text-[#4b3443]"
                            : "text-[#241f23]"
                        }`}
                      >
                        {isReceive ? "+" : "-"}KSh{" "}
                        {transaction.amount.toLocaleString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}