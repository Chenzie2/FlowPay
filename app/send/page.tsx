"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Recipient = {
  name: string;
  phone: string;
};

const recipients: Recipient[] = [
  {
    name: "Maya Studio",
    phone: "+254 712 345 678",
  },
  {
    name: "Amani Designs",
    phone: "+254 723 456 789",
  },
  {
    name: "Kofi Market",
    phone: "+254 734 567 890",
  },
];

export default function SendMoneyPage() {
  const [recipient, setRecipient] = useState<Recipient | null>(null);
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState<number | null>(null);
  const [step, setStep] = useState<
    "recipient" | "amount" | "review" | "success"
  >("recipient");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  const numericAmount = Number(amount);

  useEffect(() => {
    async function loadBalance() {
      try {
        const response = await fetch("/api/account");

        if (!response.ok) {
          return;
        }

        const data = await response.json();
        setBalance(data.balance);
      } catch {
        // The send API will perform the authoritative balance check.
      }
    }

    loadBalance();
  }, []);

  function handleContinue() {
    setError("");

    if (step === "recipient" && recipient) {
      setStep("amount");
      return;
    }

    if (
      step === "amount" &&
      Number.isInteger(numericAmount) &&
      numericAmount > 0
    ) {
      if (balance !== null && numericAmount > balance) {
        setError("That amount is more than your available balance.");
        return;
      }

      setStep("review");
    }
  }

  async function handleSend() {
    if (!recipient || !Number.isInteger(numericAmount) || numericAmount <= 0) {
      return;
    }

    setIsSending(true);
    setError("");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipientName: recipient.name,
          amount: numericAmount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Unable to send payment.");
        setIsSending(false);
        return;
      }

      setBalance(data.balance);
      setStep("success");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fdfbf9] text-[#241f23]">
      <header className="border-b border-[#ebe4e1]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4b3443] text-sm font-semibold text-white">
              F
            </div>

            <span className="text-xl font-semibold tracking-[-0.03em]">
              flowpay
            </span>
          </Link>

          <Link
            href="/dashboard"
            className="text-sm text-[#766d72] transition hover:text-[#4b3443]"
          >
            Back to dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-6 py-12 lg:py-16">
        {step !== "success" && (
          <>
            <div>
              <p className="text-sm font-medium text-[#d98b9a]">
                Send money
              </p>

              <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                {step === "recipient" && "Who are you paying?"}
                {step === "amount" && "How much are you sending?"}
                {step === "review" && "Review your payment"}
              </h1>

              <p className="mt-2 text-sm leading-6 text-[#766d72]">
                {step === "recipient" &&
                  "Choose someone from your recent recipients."}

                {step === "amount" &&
                  `Sending money to ${recipient?.name}.`}

                {step === "review" &&
                  "Take a moment to make sure everything looks right."}
              </p>
            </div>

            <div className="mt-10">
              {step === "recipient" && (
                <div className="space-y-3">
                  {recipients.map((item) => {
                    const selected = recipient?.name === item.name;

                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => {
                          setRecipient(item);
                          setError("");
                        }}
                        className={`flex w-full items-center justify-between rounded-2xl border p-5 text-left transition ${
                          selected
                            ? "border-[#d98b9a] bg-[#f5e1e5]"
                            : "border-[#ebe4e1] bg-white hover:border-[#d98b9a]"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f8f1ea] text-sm font-semibold text-[#4b3443]">
                            {item.name.charAt(0)}
                          </div>

                          <div>
                            <p className="text-sm font-medium">
                              {item.name}
                            </p>

                            <p className="mt-1 text-xs text-[#766d72]">
                              {item.phone}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                            selected
                              ? "border-[#4b3443] bg-[#4b3443]"
                              : "border-[#d9d1ce]"
                          }`}
                        >
                          {selected && (
                            <span className="h-2 w-2 rounded-full bg-white" />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {step === "amount" && (
                <div className="rounded-[2rem] border border-[#ebe4e1] bg-white p-7 sm:p-10">
                  <label
                    htmlFor="amount"
                    className="text-sm font-medium text-[#766d72]"
                  >
                    Amount
                  </label>

                  <div className="mt-5 flex items-center border-b border-[#ebe4e1] pb-4">
                    <span className="mr-3 text-2xl font-medium text-[#766d72]">
                      KSh
                    </span>

                    <input
                      id="amount"
                      type="number"
                      min="1"
                      step="1"
                      value={amount}
                      onChange={(event) => {
                        setAmount(event.target.value);
                        setError("");
                      }}
                      placeholder="0"
                      autoFocus
                      className="w-full bg-transparent text-5xl font-semibold tracking-[-0.05em] outline-none placeholder:text-[#d9d1ce]"
                    />
                  </div>

                  <p className="mt-4 text-xs text-[#766d72]">
                    Available balance:{" "}
                    {balance !== null
                      ? `KSh ${balance.toLocaleString()}`
                      : "Loading..."}
                  </p>
                </div>
              )}

              {step === "review" && (
                <div className="overflow-hidden rounded-[2rem] border border-[#ebe4e1] bg-white">
                  <div className="p-7 sm:p-10">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f5e1e5] text-lg font-semibold text-[#4b3443]">
                        {recipient?.name.charAt(0)}
                      </div>

                      <div>
                        <p className="text-sm text-[#766d72]">
                          Sending to
                        </p>

                        <p className="mt-1 font-semibold">
                          {recipient?.name}
                        </p>

                        <p className="mt-1 text-xs text-[#766d72]">
                          {recipient?.phone}
                        </p>
                      </div>
                    </div>

                    <div className="my-8 h-px bg-[#ebe4e1]" />

                    <div className="flex items-end justify-between">
                      <span className="text-sm text-[#766d72]">
                        Amount
                      </span>

                      <span className="text-3xl font-semibold tracking-[-0.04em]">
                        KSh {numericAmount.toLocaleString()}
                      </span>
                    </div>

                    <div className="mt-5 flex items-center justify-between text-sm">
                      <span className="text-[#766d72]">Fee</span>
                      <span>Free</span>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-sm font-medium">
                      <span>Total</span>
                      <span>
                        KSh {numericAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-[#ebe4e1] bg-[#f8f1ea] p-5">
                    <p className="text-center text-xs leading-5 text-[#766d72]">
                      You are about to send money from your FlowPay balance.
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-5 rounded-2xl border border-[#e8c7ce] bg-[#fdf0f2] px-4 py-3">
                  <p className="text-sm text-[#7a3f4c]">{error}</p>
                </div>
              )}

              <div className="mt-8 flex items-center justify-between">
                {step !== "recipient" ? (
                  <button
                    type="button"
                    onClick={() => {
                      setError("");

                      if (step === "amount") {
                        setStep("recipient");
                      }

                      if (step === "review") {
                        setStep("amount");
                      }
                    }}
                    className="text-sm font-medium text-[#766d72] transition hover:text-[#4b3443]"
                  >
                    ← Back
                  </button>
                ) : (
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium text-[#766d72]"
                  >
                    Cancel
                  </Link>
                )}

                {step === "review" ? (
                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={isSending}
                    className="rounded-full bg-[#4b3443] px-7 py-3.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#3d2936] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSending
                      ? "Sending..."
                      : `Send KSh ${numericAmount.toLocaleString()}`}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleContinue}
                    disabled={
                      (step === "recipient" && !recipient) ||
                      (step === "amount" &&
                        (!Number.isInteger(numericAmount) ||
                          numericAmount <= 0))
                    }
                    className="rounded-full bg-[#4b3443] px-7 py-3.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#3d2936] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Continue
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        {step === "success" && (
          <div className="flex min-h-[65vh] flex-col items-center justify-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f5e1e5] text-3xl text-[#4b3443]">
              ✓
            </div>

            <p className="mt-8 text-sm font-medium text-[#d98b9a]">
              Payment sent
            </p>

            <h1 className="mt-2 text-4xl font-semibold tracking-[-0.045em]">
              You&apos;re all set.
            </h1>

            <p className="mt-4 max-w-md text-sm leading-6 text-[#766d72]">
              KSh {numericAmount.toLocaleString()} has been sent to{" "}
              {recipient?.name}.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="rounded-full bg-[#4b3443] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#3d2936]"
              >
                Back to dashboard
              </Link>

              <button
                type="button"
                onClick={() => {
                  setRecipient(null);
                  setAmount("");
                  setError("");
                  setStep("recipient");
                }}
                className="rounded-full border border-[#ebe4e1] bg-white px-7 py-3.5 text-sm font-medium text-[#4b3443]"
              >
                Send another
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}