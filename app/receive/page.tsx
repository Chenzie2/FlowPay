"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/page-header";

const accountDetails = {
  name: "Zawadi",
  phone: "+254 700 123 456",
  account: "FP-0248-7193",
};

export default function ReceiveMoneyPage() {
  const [copied, setCopied] = useState<string | null>(null);

  function handleCopy(value: string, label: string) {
    navigator.clipboard.writeText(value);
    setCopied(label);

    window.setTimeout(() => {
      setCopied(null);
    }, 1800);
  }

  return (
    <main className="min-h-screen bg-[#fdfbf9] text-[#241f23]">
      <PageHeader />

      <div className="mx-auto max-w-2xl px-6 py-12 lg:py-16">
        <div>
          <p className="text-sm font-medium text-[#d98b9a]">
            Receive money
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Let money find you.
          </h1>

          <p className="mt-2 max-w-lg text-sm leading-6 text-[#766d72]">
            Share your FlowPay details with someone and they can send money
            directly to your account.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-[#ebe4e1] bg-white">
          <div className="p-7 sm:p-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#766d72]">
                  Your FlowPay
                </p>

                <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em]">
                  {accountDetails.name}
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f5e1e5] text-sm font-semibold text-[#4b3443]">
                Z
              </div>
            </div>

            <div className="my-8 h-px bg-[#ebe4e1]" />

            <div className="space-y-6">
              <div>
                <p className="text-xs text-[#766d72]">Phone number</p>

                <div className="mt-2 flex items-center justify-between gap-4">
                  <p className="text-sm font-medium">
                    {accountDetails.phone}
                  </p>

                  <button
                    onClick={() =>
                      handleCopy(accountDetails.phone, "phone")
                    }
                    className="shrink-0 text-xs font-medium text-[#4b3443] transition hover:text-[#d98b9a]"
                  >
                    {copied === "phone" ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs text-[#766d72]">FlowPay account</p>

                <div className="mt-2 flex items-center justify-between gap-4">
                  <p className="text-sm font-medium">
                    {accountDetails.account}
                  </p>

                  <button
                    onClick={() =>
                      handleCopy(accountDetails.account, "account")
                    }
                    className="shrink-0 text-xs font-medium text-[#4b3443] transition hover:text-[#d98b9a]"
                  >
                    {copied === "account" ? "Copied" : "Copy"}
                  </button>
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
                handleCopy(accountDetails.account, "qr")
              }
              className="mt-6 rounded-full bg-[#4b3443] px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#3d2936]"
            >
              {copied === "qr" ? "Account copied" : "Copy account details"}
            </button>
          </div>
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