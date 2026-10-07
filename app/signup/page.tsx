"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import FlowPayLogo from "@/components/flowpay-logo";

export default function SignupPage() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(
      formData.get("confirm-password") ?? "",
    );

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      router.push("/login?signup=success");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fdfbf9] text-[#241f23]">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-6">
        <FlowPayLogo href="/" />

        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-md">
            <div className="text-center">
              <p className="text-sm font-medium text-[#d98b9a]">
                Get started
              </p>

              <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
                Create your FlowPay account
              </h1>

              <p className="mt-3 text-sm leading-6 text-[#766d72]">
                A simple way to send, receive and keep track of your money.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-5"
            >
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium"
                >
                  Full name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                  className="mt-2 w-full rounded-2xl border border-[#ebe4e1] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#aaa1a5] focus:border-[#d98b9a]"
                />
              </div>

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
                  required
                  className="mt-2 w-full rounded-2xl border border-[#ebe4e1] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#aaa1a5] focus:border-[#d98b9a]"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium"
                >
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  required
                  minLength={8}
                  className="mt-2 w-full rounded-2xl border border-[#ebe4e1] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#aaa1a5] focus:border-[#d98b9a]"
                />
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="text-sm font-medium"
                >
                  Confirm password
                </label>

                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  placeholder="Enter your password again"
                  required
                  minLength={8}
                  className="mt-2 w-full rounded-2xl border border-[#ebe4e1] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#aaa1a5] focus:border-[#d98b9a]"
                />
              </div>

              {error && (
                <p
                  role="alert"
                  className="text-sm text-red-600"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#4b3443] px-6 py-3.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#3d2936] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-[#766d72]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-[#4b3443] hover:text-[#d98b9a]"
              >
                Log in
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