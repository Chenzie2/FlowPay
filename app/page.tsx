import Link from "next/link";
import FlowPayLogo from "@/components/flowpay-logo";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fdfbf9] text-[#241f23]">
      {/* Navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <FlowPayLogo href="/" />

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
            <span className="block text-[#d98b9a]">
              without the friction.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-[#766d72]">
            FlowPay gives you a simpler way to send, receive and keep track of
            your money, all from one thoughtful payment experience.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-full bg-[#4b3443] px-7 py-3.5 text-center text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#3d2936]"
            >
              Start with FlowPay
            </Link>

            <a
              href="#how-it-works"
              className="rounded-full border border-[#ebe4e1] bg-white px-7 py-3.5 text-center text-sm font-medium text-[#4b3443] transition hover:border-[#d98b9a]"
            >
              See how it works
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#766d72]">
            <span>✓ Simple payments</span>
            <span>✓ Clear transactions</span>
          </div>
        </div>

        {/* Payment Preview */}
        <div>
          <div className="overflow-hidden rounded-[2rem] border border-[#ebe4e1] bg-white p-5 shadow-[0_24px_70px_rgba(75,52,67,0.08)]">
            <div className="flex items-center justify-between border-b border-[#ebe4e1] pb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-[#766d72]">
                  Send money
                </p>

                <p className="mt-1 text-2xl font-semibold tracking-[-0.04em]">
                  Make a payment
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f5e1e5] text-[#4b3443]">
                ↗
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs text-[#766d72]">Recipient</p>

              <div className="mt-2 flex items-center justify-between rounded-xl border border-[#ebe4e1] px-4 py-3.5">
                <div>
                  <p className="text-sm font-medium">Maya Studio</p>
                  <p className="mt-0.5 text-xs text-[#766d72]">
                    +254 712 345 678
                  </p>
                </div>

                <span className="text-sm text-[#766d72]">›</span>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xs text-[#766d72]">Amount</p>

              <div className="mt-2 flex items-center justify-between rounded-xl border border-[#ebe4e1] px-4 py-4">
                <span className="text-sm text-[#766d72]">KES</span>

                <span className="text-2xl font-semibold tracking-[-0.03em]">
                  2,500
                </span>
              </div>
            </div>

            <button
              type="button"
              className="mt-5 w-full rounded-xl bg-[#4b3443] py-3.5 text-sm font-medium text-white transition hover:bg-[#3d2936]"
            >
              Review payment
            </button>

            <div className="mt-7">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Recent activity</p>

                <Link
                  href="/login"
                  className="text-xs text-[#d98b9a] transition hover:text-[#4b3443]"
                >
                  View all
                </Link>
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
                  description="Payment sent"
                  amount="- KSh 1,850"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="border-y border-[#ebe4e1] bg-[#f8f1ea]"
      >
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#d98b9a]">
              How it works
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Money movement, without the unnecessary steps.
            </h2>

            <p className="mt-4 text-base leading-7 text-[#766d72]">
              FlowPay keeps everyday payments straightforward, from the moment
              you choose a recipient to the moment the transaction is complete.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            <Feature
              number="01"
              title="Send simply"
              description="Enter who you're paying, choose the amount and review the payment before it goes through."
            />

            <Feature
              number="02"
              title="See clearly"
              description="Keep your payments and transaction history organised so you always know where your money went."
            />

            <Feature
              number="03"
              title="Stay in control"
              description="Designed around clear actions, useful information and a payment experience that feels easy to understand."
            />
          </div>
        </div>
      </section>

      {/* Features */}
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

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <div className="border-t border-[#ebe4e1] pt-5">
            <p className="text-sm font-medium">Send</p>

            <p className="mt-3 text-sm leading-6 text-[#766d72]">
              Make payments to people and businesses with a simple,
              straightforward flow.
            </p>
          </div>

          <div className="border-t border-[#ebe4e1] pt-5">
            <p className="text-sm font-medium">Receive</p>

            <p className="mt-3 text-sm leading-6 text-[#766d72]">
              Share your payment details and make it easy for others to send
              money your way.
            </p>
          </div>

          <div className="border-t border-[#ebe4e1] pt-5">
            <p className="text-sm font-medium">Track</p>

            <p className="mt-3 text-sm leading-6 text-[#766d72]">
              Keep your transaction history close so you can understand your
              activity at a glance.
            </p>
          </div>
        </div>
      </section>

      {/* Security */}
      <section
        id="security"
        className="border-t border-[#ebe4e1] bg-[#4b3443] text-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-28">
          <div className="grid gap-12 md:grid-cols-[1fr_0.8fr] md:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#f5e1e5]">
                Security
              </p>

              <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Your money deserves thoughtful protection.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-white/65">
              FlowPay is being built with authentication, protected accounts
              and clear transaction controls at the centre of the experience.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="flex flex-col gap-8 border-t border-[#ebe4e1] pt-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#d98b9a]">
              Ready when you are
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              A simpler way to move money.
            </h2>
          </div>

          <Link
            href="/signup"
            className="inline-flex w-fit rounded-full bg-[#4b3443] px-7 py-3.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#3d2936]"
          >
            Create your account
          </Link>
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

