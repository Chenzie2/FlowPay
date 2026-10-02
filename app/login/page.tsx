"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import FlowPayLogo from "@/components/flowpay-logo";

export default function LoginPage() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("The email or password is incorrect.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#fdfbf9] text-[#241f23]">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-6">
        <FlowPayLogo href="/" />

        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-md">
            <div className="text-center">
              <p className="text-sm font-medium text-[#d98b9a]">
                Welcome back
              </p>

              <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
                Log in to FlowPay
              </h1>

              <p className="mt-3 text-sm leading-6 text-[#766d72]">
                Access your balance, transactions and payments.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-2xl border border-[#ebe4e1] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#aaa1a5] focus:border-[#d98b9a]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-medium text-[#4b3443]"
                  >
                    Forgot password?
                  </button>
                </div>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="mt-2 w-full rounded-2xl border border-[#ebe4e1] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#aaa1a5] focus:border-[#d98b9a]"
                />
              </div>

              {error && (
  <p className="rounded-2xl bg-[#f5e1e5] px-4 py-3 text-sm text-[#4b3443]">
    {error}
  </p>
)}

<button
  type="submit"
  disabled={loading}
  className="w-full rounded-full bg-[#4b3443] px-6 py-3.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#3d2936] disabled:cursor-not-allowed disabled:opacity-60"
>
  {loading ? "Logging in..." : "Log in"}
</button>
            </form>

            <p className="mt-8 text-center text-sm text-[#766d72]">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-[#4b3443] hover:text-[#d98b9a]"
              >
                Create one
              </Link>
            </p>

            <div className="mt-8 flex items-center justify-center">
              <Link
                href="/"
                className="text-xs text-[#766d72] transition hover:text-[#4b3443]"
              >
                ← Back to FlowPay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}