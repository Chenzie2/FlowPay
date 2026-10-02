"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/page-header";

type Transaction = {
  id: number;
  name: string;
  description: string;
  date: string;
  amount: number;
  type: "in" | "out";
};

const transactions: Transaction[] = [
  {
    id: 1,
    name: "Maya Studio",
    description: "Payment received",
    date: "Today, 10:42 AM",
    amount: 8500,
    type: "in",
  },
  {
    id: 2,
    name: "Kofi Market",
    description: "Payment sent",
    date: "Today, 8:16 AM",
    amount: 1850,
    type: "out",
  },
  {
    id: 3,
    name: "Amani Designs",
    description: "Payment received",
    date: "Yesterday, 4:32 PM",
    amount: 4200,
    type: "in",
  },
  {
    id: 4,
    name: "Swift Coffee",
    description: "Payment sent",
    date: "Yesterday, 11:08 AM",
    amount: 680,
    type: "out",
  },
  {
    id: 5,
    name: "Maya Studio",
    description: "Payment received",
    date: "28 Sep, 2:15 PM",
    amount: 12500,
    type: "in",
  },
  {
    id: 6,
    name: "Nia Boutique",
    description: "Payment sent",
    date: "27 Sep, 6:40 PM",
    amount: 3200,
    type: "out",
  },
  {
    id: 7,
    name: "Amani Designs",
    description: "Payment received",
    date: "26 Sep, 9:20 AM",
    amount: 7500,
    type: "in",
  },
  {
    id: 8,
    name: "Swift Coffee",
    description: "Payment sent",
    date: "24 Sep, 3:18 PM",
    amount: 950,
    type: "out",
  },
];

type Filter = "all" | "in" | "out";

export default function TransactionsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesFilter =
        filter === "all" || transaction.type === filter;

      const searchTerm = search.toLowerCase().trim();

      const matchesSearch =
        searchTerm === "" ||
        transaction.name.toLowerCase().includes(searchTerm) ||
        transaction.description.toLowerCase().includes(searchTerm);

      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  return (
    <main className="min-h-screen bg-[#fdfbf9] text-[#241f23]">
      <PageHeader />

      <div className="mx-auto max-w-4xl px-6 py-12 lg:py-16">
        <div>
          <p className="text-sm font-medium text-[#d98b9a]">
            Activity
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Your transactions
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#766d72]">
            Keep track of money moving in and out of your FlowPay account.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search transactions"
              className="w-full rounded-full border border-[#ebe4e1] bg-white px-5 py-3.5 text-sm outline-none transition placeholder:text-[#aaa1a5] focus:border-[#d98b9a]"
            />
          </div>

          <div className="flex rounded-full border border-[#ebe4e1] bg-white p-1">
            {[
              { label: "All", value: "all" },
              { label: "Money in", value: "in" },
              { label: "Money out", value: "out" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value as Filter)}
                className={`rounded-full px-4 py-2.5 text-xs font-medium transition ${
                  filter === option.value
                    ? "bg-[#4b3443] text-white"
                    : "text-[#766d72] hover:text-[#4b3443]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-[#ebe4e1] bg-white">
          <div className="border-b border-[#ebe4e1] px-6 py-5 sm:px-8">
            <p className="text-sm font-semibold">
              {filteredTransactions.length}{" "}
              {filteredTransactions.length === 1
                ? "transaction"
                : "transactions"}
            </p>
          </div>

          {filteredTransactions.length > 0 ? (
            <div>
              {filteredTransactions.map((transaction) => (
                <button
                  key={transaction.id}
                  onClick={() => setSelectedTransaction(transaction)}
                  className="flex w-full items-center justify-between gap-4 border-b border-[#f0ebe8] px-6 py-5 text-left transition last:border-b-0 hover:bg-[#fdfbf9] sm:px-8"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f5e1e5] text-sm font-semibold text-[#4b3443]">
                      {transaction.name.charAt(0)}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {transaction.name}
                      </p>

                      <p className="mt-1 truncate text-xs text-[#766d72]">
                        {transaction.description} · {transaction.date}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p
                      className={`text-sm font-semibold ${
                        transaction.type === "in"
                          ? "text-[#4b3443]"
                          : "text-[#241f23]"
                      }`}
                    >
                      {transaction.type === "in" ? "+" : "-"}KSh{" "}
                      {transaction.amount.toLocaleString()}
                    </p>

                    <p className="mt-1 text-xs text-[#766d72]">
                      {transaction.type === "in"
                        ? "Received"
                        : "Sent"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-6 py-16 text-center sm:px-8">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f8f1ea] text-xl text-[#4b3443]">
                ∅
              </div>

              <h2 className="mt-5 text-base font-semibold">
                Nothing found
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#766d72]">
                Try a different search or change the transaction filter.
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-[#766d72] transition hover:text-[#4b3443]"
          >
            Return to dashboard
          </Link>
        </div>
      </div>

      {selectedTransaction && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#241f23]/20 p-4 sm:items-center"
          onClick={() => setSelectedTransaction(null)}
        >
          <div
            className="w-full max-w-md rounded-[2rem] bg-white p-7 shadow-xl sm:p-9"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[#d98b9a]">
                Transaction details
              </p>

              <button
                onClick={() => setSelectedTransaction(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8f1ea] text-sm text-[#766d72]"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="mt-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f5e1e5] text-lg font-semibold text-[#4b3443]">
                {selectedTransaction.name.charAt(0)}
              </div>

              <h2 className="mt-5 text-lg font-semibold">
                {selectedTransaction.name}
              </h2>

              <p className="mt-1 text-sm text-[#766d72]">
                {selectedTransaction.description}
              </p>

              <p className="mt-6 text-3xl font-semibold tracking-[-0.04em]">
                {selectedTransaction.type === "in" ? "+" : "-"}KSh{" "}
                {selectedTransaction.amount.toLocaleString()}
              </p>
            </div>

            <div className="my-7 h-px bg-[#ebe4e1]" />

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-[#766d72]">Status</span>
                <span className="font-medium">Completed</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#766d72]">Date</span>
                <span className="font-medium">
                  {selectedTransaction.date}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#766d72]">Transaction ID</span>
                <span className="font-medium">
                  FP-{selectedTransaction.id.toString().padStart(6, "0")}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedTransaction(null)}
              className="mt-8 w-full rounded-full bg-[#4b3443] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#3d2936]"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </main>
  );
}