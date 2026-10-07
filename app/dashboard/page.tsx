import Link from "next/link";
import { auth } from "@/auth";
import FlowPayLogo from "@/components/flowpay-logo";

export default async function DashboardPage() {
  const session = await auth();
  const userName = session?.user?.name ?? "there";

  return (
    <main className="min-h-screen bg-[#fdfbf9] text-[#241f23]">
      <header className="border-b border-[#ebe4e1]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <FlowPayLogo />

          <div className="flex items-center gap-6">
            <Link
              href="/transactions"
              className="text-sm text-[#766d72] transition hover:text-[#4b3443]"
            >
              Transactions
            </Link>

            <Link
              href="/login"
              className="text-sm text-[#766d72] transition hover:text-[#4b3443]"
            >
              Log out
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div>
          <p className="text-sm font-medium text-[#d98b9a]">
            Your dashboard
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
            Welcome back, {userName}
          </h1>

          <p className="mt-3 text-sm text-[#766d72]">
            Here’s what’s happening with your money.
          </p>
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl bg-[#4b3443] p-8 text-white">
            <p className="text-sm text-white/70">Available balance</p>

            <p className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
              KSh 84,250
            </p>

            <p className="mt-2 text-sm text-white/60">
              Your current FlowPay balance
            </p>
          </div>

          <div className="rounded-3xl border border-[#ebe4e1] bg-white p-8">
            <p className="text-sm font-medium">Quick actions</p>

            <div className="mt-6 grid gap-3">
              <Link
                href="/send"
                className="rounded-2xl bg-[#f5e1e5] px-5 py-4 text-sm font-medium text-[#4b3443] transition hover:-translate-y-0.5"
              >
                Send money
              </Link>

              <Link
                href="/receive"
                className="rounded-2xl bg-[#f8f1ea] px-5 py-4 text-sm font-medium text-[#4b3443] transition hover:-translate-y-0.5"
              >
                Receive money
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-[#ebe4e1] bg-white p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-[-0.02em]">
                Recent activity
              </h2>

              <p className="mt-1 text-sm text-[#766d72]">
                Your latest payments and transfers.
              </p>
            </div>

            <Link
              href="/transactions"
              className="text-sm font-medium text-[#4b3443] transition hover:text-[#d98b9a]"
            >
              View all
            </Link>
          </div>

          <div className="mt-8 divide-y divide-[#ebe4e1]">
            <div className="flex items-center justify-between py-5">
              <div>
                <p className="text-sm font-medium">Maya Studio</p>
                <p className="mt-1 text-xs text-[#766d72]">
                  Received · Today
                </p>
              </div>

              <p className="text-sm font-medium text-green-700">
                + KSh 8,500
              </p>
            </div>

            <div className="flex items-center justify-between py-5">
              <div>
                <p className="text-sm font-medium">Kofi Market</p>
                <p className="mt-1 text-xs text-[#766d72]">
                  Payment · Yesterday
                </p>
              </div>

              <p className="text-sm font-medium">
                - KSh 1,850
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}