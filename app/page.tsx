import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-[#fdfbf9] text-[#241f23]">
      {/* Navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4b3443] text-sm font-semibold text-white">
            F
          </div>

          <span className="text-xl font-semibold tracking-[-0.03em]">
            flowpay
          </span>
        </div>

        <div className="hidden items-center gap-8 text-sm text-[#766d72] md:flex">
          <a href="#how-it-works" className="transition hover:text-[#4b3443]">
            How it works
          </a>

          <a href="#features" className="transition hover:text-[#4b3443]">
            Features
          </a>

          <a href="#security" className="transition hover:text-[#4b3443]">
            Security
          </a>
        </div>

        <Link
  href="/signup"
  className="rounded-full bg-[#4b3443] px-6 py-3.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#3d2936]"
>
  Start with FlowPay
</Link>
      </nav>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pb-32 lg:pt-24">
        <div>
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.18em] text-[#d98b9a]">
            Payments, made personal
          </p>

          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Move money
            <span className="block text-[#d98b9a]">without the friction.</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-[#766d72]">
            FlowPay gives you a simpler way to send, receive and keep track of
            your money, all from one thoughtful payment experience.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button className="rounded-full bg-[#4b3443] px-7 py-3.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#3d2936]">
              Start with FlowPay
            </button>

            <button className="rounded-full border border-[#ebe4e1] bg-white px-7 py-3.5 text-sm font-medium text-[#4b3443] transition hover:border-[#d98b9a]">
              See how it works
            </button>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm text-[#766d72]">
            <span>✓ Simple payments</span>
            <span>✓ Clear transactions</span>
          </div>
        </div>

        {/* Payment Preview */}
        <div className="relative">
          <div className="absolute -right-4 -top-8 h-32 w-32 rounded-full bg-[#f5e1e5] blur-2xl" />
          <div className="absolute -bottom-8 -left-6 h-36 w-36 rounded-full bg-[#e9e2f1] blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-[#ebe4e1] bg-white p-5 shadow-[0_24px_70px_rgba(75,52,67,0.08)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#766d72]">Available balance</p>
                <p className="mt-1 text-3xl font-semibold tracking-[-0.04em]">
                  KSh 84,250
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f5e1e5] text-[#4b3443]">
                ↗
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-[#4b3443] p-5 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-white/60">Send money</p>
                  <p className="mt-1 text-lg font-medium">
                    Make a payment
                  </p>
                </div>

                <span className="text-lg">✦</span>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-xl bg-white/10 px-4 py-3">
                <span className="text-sm text-white/60">Recipient</span>
                <span className="text-sm">+254 712 345 678</span>
              </div>

              <div className="mt-3 flex items-center justify-between rounded-xl bg-white/10 px-4 py-3">
                <span className="text-sm text-white/60">Amount</span>
                <span className="text-sm font-medium">KSh 2,500</span>
              </div>

              <button className="mt-4 w-full rounded-xl bg-[#f5e1e5] py-3 text-sm font-semibold text-[#4b3443]">
                Send KSh 2,500
              </button>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Recent activity</p>
                <span className="text-xs text-[#d98b9a]">View all</span>
              </div>

              <div className="mt-4 space-y-3">
                <Transaction
                  name="Maya Studio"
                  description="Payment received"
                  amount="+ KSh 8,500"
                  positive
                />

                <Transaction
                  name="Kofi Market"
                  description="Card payment"
                  amount="- KSh 1,850"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro strip */}
      <section
        id="how-it-works"
        className="border-y border-[#ebe4e1] bg-[#f8f1ea]"
      >
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid gap-10 md:grid-cols-3">
            <Feature
              number="01"
              title="Send simply"
              description="Enter who you're paying, choose the amount and let FlowPay handle the rest."
            />

            <Feature
              number="02"
              title="See clearly"
              description="Your money and transactions stay easy to understand at a glance."
            />

            <Feature
              number="03"
              title="Stay in control"
              description="Thoughtful payment tools designed around your everyday financial life."
            />
          </div>
        </div>
      </section>

      {/* Closing section */}
      <section
        id="features"
        className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#d98b9a]">
            Built for everyday money
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            Your payments should feel effortless.
          </h2>

          <p className="mt-5 text-lg leading-8 text-[#766d72]">
            FlowPay brings the things you actually need together without
            making your financial life feel complicated.
          </p>
        </div>
      </section>
    </main>
  );
}

function Transaction({
  name,
  description,
  amount,
  positive = false,
}: {
  name: string;
  description: string;
  amount: string;
  positive?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-[#ebe4e1] px-4 py-3">
      <div>
        <p className="text-sm font-medium">{name}</p>
        <p className="mt-0.5 text-xs text-[#766d72]">{description}</p>
      </div>

      <span
        className={`text-sm font-medium ${
          positive ? "text-[#5f8a6d]" : "text-[#4b3443]"
        }`}
      >
        {amount}
      </span>
    </div>
  );
}

function Feature({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-[#d98b9a]">{number}</p>

      <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em]">
        {title}
      </h3>

      <p className="mt-3 max-w-sm text-sm leading-6 text-[#766d72]">
        {description}
      </p>
    </div>
  );
}