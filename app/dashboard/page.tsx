import Link from "next/link";

const transactions = [
  {
    name: "Maya Studio",
    type: "Payment received",
    date: "Today, 10:42 AM",
    amount: "+ KSh 8,500",
    positive: true,
  },
  {
    name: "Kofi Market",
    type: "Card payment",
    date: "Today, 9:18 AM",
    amount: "- KSh 1,850",
    positive: false,
  },
  {
    name: "Amani Designs",
    type: "Payment received",
    date: "Yesterday, 4:32 PM",
    amount: "+ KSh 4,200",
    positive: true,
  },
  {
    name: "Swift Coffee",
    type: "Card payment",
    date: "Yesterday, 12:05 PM",
    amount: "- KSh 680",
    positive: false,
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#fdfbf9] text-[#241f23]">
      {/* Top navigation */}
      <header className="border-b border-[#ebe4e1] bg-[#fdfbf9]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4b3443] text-sm font-semibold text-white">
              F
            </div>

            <span className="text-xl font-semibold tracking-[-0.03em]">
              flowpay
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm md:flex">
            <Link
              href="/dashboard"
              className="font-medium text-[#4b3443]"
            >
              Overview
            </Link>

            <Link
              href="/transactions"
              className="text-[#766d72] transition hover:text-[#4b3443]"
            >
              Transactions
            </Link>
          </nav>

          <button
            aria-label="Open profile"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5e1e5] text-sm font-semibold text-[#4b3443]"
          >
            Z
          </button>
        </div>
      </header>

      {/* Dashboard */}
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
        <div>
          <p className="text-sm font-medium text-[#d98b9a]">
            Your money, at a glance
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Good afternoon, Zawadi.
          </h1>

          <p className="mt-2 text-sm text-[#766d72]">
            Here's what's happening with your money.
          </p>
        </div>

        {/* Overview cards */}
        <section className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Balance */}
          <div className="relative overflow-hidden rounded-[2rem] bg-[#4b3443] p-7 text-white shadow-[0_20px_50px_rgba(75,52,67,0.12)] sm:p-8">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/5" />

            <div className="relative">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-white/60">
                    Available balance
                  </p>

                  <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                    KSh 84,250
                  </p>
                </div>

                <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/70">
                  KES
                </span>
              </div>

              <div className="mt-10 flex items-end justify-between">
                <div>
                  <p className="text-xs text-white/50">
                    This month
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    + KSh 24,680
                  </p>
                </div>

                <p className="text-xs text-white/50">
                  Updated just now
                </p>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="rounded-[2rem] border border-[#ebe4e1] bg-white p-7 sm:p-8">
            <div>
              <p className="text-sm font-medium">Quick actions</p>
              <p className="mt-1 text-xs text-[#766d72]">
                What would you like to do?
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Link
                href="/send"
                className="group rounded-2xl bg-[#f5e1e5] p-4 transition hover:-translate-y-0.5"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4b3443] text-sm text-white">
                  ↗
                </span>

                <p className="mt-5 text-sm font-semibold text-[#4b3443]">
                  Send money
                </p>

                <p className="mt-1 text-xs text-[#766d72]">
                  Pay someone
                </p>
              </Link>

              <Link
                href="/receive"
                className="group rounded-2xl bg-[#e9e2f1] p-4 transition hover:-translate-y-0.5"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4b3443] text-sm text-white">
                  ↓
                </span>

                <p className="mt-5 text-sm font-semibold text-[#4b3443]">
                  Receive
                </p>

                <p className="mt-1 text-xs text-[#766d72]">
                  Request money
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Activity */}
        <section className="mt-10">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-medium">Recent activity</p>

              <p className="mt-1 text-xs text-[#766d72]">
                Your latest payments and transfers
              </p>
            </div>

            <Link
              href="/transactions"
              className="text-xs font-medium text-[#d98b9a] transition hover:text-[#4b3443]"
            >
              View all
            </Link>
          </div>

          <div className="mt-5 overflow-hidden rounded-[2rem] border border-[#ebe4e1] bg-white">
            {transactions.map((transaction, index) => (
              <div
                key={transaction.name}
                className={`flex items-center justify-between gap-4 px-5 py-5 sm:px-7 ${
                  index !== transactions.length - 1
                    ? "border-b border-[#f0ebe8]"
                    : ""
                }`}
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f8f1ea] text-sm font-semibold text-[#4b3443]">
                    {transaction.name.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {transaction.name}
                    </p>

                    <p className="mt-1 truncate text-xs text-[#766d72]">
                      {transaction.type} · {transaction.date}
                    </p>
                  </div>
                </div>

                <p
                  className={`shrink-0 text-sm font-semibold ${
                    transaction.positive
                      ? "text-[#5f8a6d]"
                      : "text-[#4b3443]"
                  }`}
                >
                  {transaction.amount}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}