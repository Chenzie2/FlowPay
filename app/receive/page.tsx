"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/page-header";

type AccountDetails = {
  name: string;
  email: string;
  balance: number;
  currency: string;
  accountReference: string;
};

type ReceiveStep = "details" | "amount" | "success";

export default function ReceiveMoneyPage() {
  const [accountDetails, setAccountDetails] =
    useState<AccountDetails | null>(null);
  const [step, setStep] = useState<ReceiveStep>("details");
  const [senderName, setSenderName] = useState("");
  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [loadingAccount, setLoadingAccount] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAccount() {
      try {
        const response = await fetch("/api/account");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Unable to load account details.");
        }

        setAccountDetails(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load account details.",
        );
      } finally {
        setLoadingAccount(false);
      }
    }

    loadAccount();
  }, []);

  function handleCopy(value: string, label: string) {
    navigator.clipboard.writeText(value);
    setCopied(label);

    window.setTimeout(() => {
      setCopied(null);
    }, 1800);
  }

  function handleContinue() {
    setError("");

    if (!senderName.trim()) {
      setError("Please enter the sender's name.");
      return;
    }

    setStep("amount");
  }

  async function handleReceive() {
    setError("");

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (!Number.isInteger(numericAmount)) {
      setError("Amount must be a whole number.");
      return;
    }

    setSending(true);

    try {
      const response = await fetch("/api/receive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderName: senderName.trim(),
          amount: numericAmount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setAccountDetails((current) =>
        current
          ? {
              ...current,
              balance: data.balance,
            }
          : current,
      );

      setStep("success");
    } catch {
      setError("Something went wrong while receiving the payment.");
    } finally {
      setSending(false);
    }
  }

  function resetFlow() {
    setSenderName("");
    setAmount("");
    setError("");
    setStep("details");
  }

  if (loadingAccount) {
    return (
      <main className="min-h-screen bg-[#fdfbf9] text-[#241f23]">
        <PageHeader />

        <div className="mx-auto max-w-2xl px-6 py-12 lg:py-16">
          <div className="rounded-[2rem] border border-[#ebe4e1] bg-white p-10 text-center">
            <p className="text-sm text-[#766d72]">
              Loading your FlowPay account...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (step === "success") {
    return (
      <main className="min-h-screen bg-[#fdfbf9] text-[#241f23]">
        <PageHeader />

        <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-2xl items-center px-6 py-12">
          <div className="w-full rounded-[2rem] border border-[#ebe4e1] bg-white p-8 text-center sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f5e1e5] text-2xl text-[#4b3443]">
              ✓
            </div>

            <p className="mt-7 text-sm font-medium text-[#d98b9a]">
              Payment received
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
              Money found its way to you.
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#766d72]">
              KSh {Number(amount).toLocaleString()} was received from{" "}
              {senderName}.
            </p>

            <div className="mt-8 rounded-2xl bg-[#f8f1ea] p-5">
              <p className="text-xs text-[#766d72]">New balance</p>

              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
                {accountDetails?.currency ?? "KES"}{" "}
                {accountDetails?.balance.toLocaleString() ?? "0"}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/dashboard"
                className="rounded-full bg-[#4b3443] px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#3d2936]"
              >
                View dashboard
              </Link>

              <button
                onClick={resetFlow}
                className="rounded-full border border-[#ebe4e1] px-6 py-3 text-sm font-medium text-[#4b3443] transition hover:border-[#d9d0cd] hover:bg-[#fdfbf9]"
              >
                Receive another payment
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fdfbf9] text-[#241f23]">
      <PageHeader />

      <div className="mx-auto max-w-2xl px-6 py-12 lg:py-16">
        <div>
          <p className="text-sm font-medium text-[#d98b9a]">Receive money</p>

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Let money find you.
          </h1>

          <p className="mt-2 max-w-lg text-sm leading-6 text-[#766d72]">
            Share your FlowPay details with someone and they can send money
            directly to your account.
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-[#e6c9cf] bg-[#fdf0f2] px-5 py-4 text-sm text-[#7a3f4b]">
            {error}
          </div>
        )}

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-[#ebe4e1] bg-white">
          <div className="p-7 sm:p-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#766d72]">
                  Your FlowPay
                </p>

                <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em]">
                  {accountDetails?.name ?? "FlowPay user"}
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f5e1e5] text-sm font-semibold text-[#4b3443]">
                {accountDetails?.name?.charAt(0).toUpperCase() ?? "F"}
              </div>
            </div>

            <div className="my-8 h-px bg-[#ebe4e1]" />

            <div className="space-y-6">
              <div>
                <p className="text-xs text-[#766d72]">Email address</p>

                <div className="mt-2 flex items-center justify-between gap-4">
                  <p className="break-all text-sm font-medium">
                    {accountDetails?.email ?? "—"}
                  </p>

                  {accountDetails?.email && (
                    <button
                      onClick={() =>
                        handleCopy(accountDetails.email, "email")
                      }
                      className="shrink-0 text-xs font-medium text-[#4b3443] transition hover:text-[#d98b9a]"
                    >
                      {copied === "email" ? "Copied" : "Copy"}
                    </button>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs text-[#766d72]">FlowPay account</p>

                <div className="mt-2 flex items-center justify-between gap-4">
                  <p className="text-sm font-medium">
                    {accountDetails?.accountReference ?? "—"}
                  </p>

                  {accountDetails?.accountReference && (
                    <button
                      onClick={() =>
                        handleCopy(
                          accountDetails.accountReference,
                          "account",
                        )
                      }
                      className="shrink-0 text-xs font-medium text-[#4b3443] transition hover:text-[#d98b9a]"
                    >
                      {copied === "account" ? "Copied" : "Copy"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#ebe4e1] bg-[#f8f1ea] px-7 py-5 sm:px-10">
            <p className="text-xs leading-5 text-[#766d72]">
              Only share these details with people you trust. FlowPay will
              never ask you to share your password or security code.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-[2rem] border border-[#ebe4e1] bg-[#e9e2f1] p-7 sm:p-10">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-40 w-40 items-center justify-center rounded-3xl border border-[#d9d0e3] bg-white p-5 shadow-sm">
              <div className="grid grid-cols-5 gap-1">
                {[
                  1, 1, 1, 0, 1,
                  1, 0, 1, 1, 0,
                  1, 1, 0, 1, 1,
                  0, 1, 1, 1, 0,
                  1, 0, 1, 1, 1,
                ].map((filled, index) => (
                  <span
                    key={index}
                    className={`h-4 w-4 rounded-[2px] ${
                      filled ? "bg-[#4b3443]" : "bg-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>

            <h2 className="mt-7 text-lg font-semibold tracking-[-0.02em]">
              Your payment code
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-[#766d72]">
              Show this code to someone using FlowPay and they can use it to
              find your account.
            </p>

            <button
              onClick={() =>
                accountDetails?.accountReference &&
                handleCopy(accountDetails.accountReference, "qr")
              }
              className="mt-6 rounded-full bg-[#4b3443] px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#3d2936]"
            >
              {copied === "qr" ? "Account copied" : "Copy account details"}
            </button>
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border border-[#ebe4e1] bg-white p-7 sm:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#766d72]">
            Demo payment
          </p>

          <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em]">
            Record an incoming payment
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#766d72]">
            This simulates another person sending money to your FlowPay
            account. In a production payment system, this would normally be
            triggered by another account or a payment provider.
          </p>

          {step === "details" && (
            <div className="mt-7">
              <label
                htmlFor="sender"
                className="text-sm font-medium text-[#241f23]"
              >
                Sender name
              </label>

              <input
                id="sender"
                type="text"
                value={senderName}
                onChange={(event) => setSenderName(event.target.value)}
                placeholder="e.g. Maya Studio"
                className="mt-2 w-full rounded-2xl border border-[#ebe4e1] bg-[#fdfbf9] px-4 py-3 text-sm outline-none transition placeholder:text-[#aaa1a5] focus:border-[#d98b9a]"
              />

              <button
                onClick={handleContinue}
                className="mt-5 w-full rounded-full bg-[#4b3443] px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#3d2936]"
              >
                Continue
              </button>
            </div>
          )}

          {step === "amount" && (
            <div className="mt-7">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="receive-amount"
                  className="text-sm font-medium text-[#241f23]"
                >
                  Amount
                </label>

                <button
                  onClick={() => {
                    setError("");
                    setStep("details");
                  }}
                  className="text-xs font-medium text-[#766d72] hover:text-[#4b3443]"
                >
                  Back
                </button>
              </div>

              <div className="relative mt-2">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#766d72]">
                  KSh
                </span>

                <input
                  id="receive-amount"
                  type="number"
                  min="1"
                  step="1"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="0"
                  className="w-full rounded-2xl border border-[#ebe4e1] bg-[#fdfbf9] py-4 pl-16 pr-4 text-lg font-semibold outline-none transition placeholder:text-[#c4bbbf] focus:border-[#d98b9a]"
                />
              </div>

              <div className="mt-4 rounded-2xl bg-[#f8f1ea] px-4 py-3 text-sm text-[#766d72]">
                Receiving from{" "}
                <span className="font-medium text-[#241f23]">
                  {senderName}
                </span>
              </div>

              <button
                onClick={handleReceive}
                disabled={sending}
                className="mt-5 w-full rounded-full bg-[#4b3443] px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#3d2936] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? "Receiving..." : "Record payment"}
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-center">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-[#766d72] transition hover:text-[#4b3443]"
          >
            Return to dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}