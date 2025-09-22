"use client";

import { useMemo, useState } from "react";

type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
};

export default function AccountsPage(): JSX.Element {
  const [filter, setFilter] = useState<string>("all");

  const sample: Transaction[] = useMemo(
    () => [
      { id: "1", date: "2025-03-01", description: "Salary", amount: 4500, type: "income", category: "Salary" },
      { id: "2", date: "2025-03-05", description: "Groceries", amount: -120, type: "expense", category: "Food" },
      { id: "3", date: "2025-03-10", description: "Rent", amount: -1600, type: "expense", category: "Housing" },
      { id: "4", date: "2025-03-12", description: "Stocks", amount: 200, type: "income", category: "Investments" },
    ],
    []
  );

  const filtered = sample.filter((t) => (filter === "all" ? true : t.type === filter));

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <div className="text-sm uppercase tracking-wider text-gray-500">Balance</div>
          <div className="mt-2 text-3xl font-bold">$ 8,430.25</div>
          <p className="mt-2 text-sm text-gray-500">Across 3 accounts</p>
        </div>
        <div className="card">
          <div className="text-sm uppercase tracking-wider text-gray-500">This month</div>
          <div className="mt-2 text-3xl font-bold text-emerald-500">+$ 4,700</div>
          <p className="mt-2 text-sm text-gray-500">Income</p>
        </div>
        <div className="card">
          <div className="text-sm uppercase tracking-wider text-gray-500">This month</div>
          <div className="mt-2 text-3xl font-bold text-rose-500">-$ 2,150</div>
          <p className="mt-2 text-sm text-gray-500">Expenses</p>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Transactions</h2>
          <div className="flex items-center gap-2">
            <button onClick={() => setFilter("all")} className={`btn ${filter === "all" ? "btn-primary" : "btn-outline"}`}>All</button>
            <button onClick={() => setFilter("income")} className={`btn ${filter === "income" ? "btn-primary" : "btn-outline"}`}>Income</button>
            <button onClick={() => setFilter("expense")} className={`btn ${filter === "expense" ? "btn-primary" : "btn-outline"}`}>Expenses</button>
          </div>
        </div>
        <div className="mt-5 divide-y divide-gray-200/70 dark:divide-gray-800">
          {filtered.map((t) => (
            <div key={t.id} className="py-3 flex items-center justify-between">
              <div className="min-w-0">
                <div className="font-medium">{t.description}</div>
                <div className="text-sm text-gray-500">{t.date} · {t.category}</div>
              </div>
              <div className={`font-semibold ${t.type === "income" ? "text-emerald-600" : "text-rose-600"}`}>
                {t.type === "income" ? "+" : "-"}${Math.abs(t.amount).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold">Add Transaction</h3>
          <form className="mt-4 grid gap-3" onSubmit={(e) => e.preventDefault()}>
            <input className="input" placeholder="Description" />
            <div className="grid grid-cols-2 gap-3">
              <input className="input" placeholder="Amount" />
              <select className="input">
                <option>Expense</option>
                <option>Income</option>
              </select>
            </div>
            <input className="input" placeholder="Category" />
            <button className="btn btn-primary" type="submit">Add</button>
          </form>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold">Savings Goal</h3>
          <form className="mt-4 grid gap-3" onSubmit={(e) => e.preventDefault()}>
            <input className="input" placeholder="Goal name" />
            <div className="grid grid-cols-2 gap-3">
              <input className="input" placeholder="Target amount" />
              <input className="input" placeholder="Current amount" />
            </div>
            <button className="btn btn-outline" type="submit">Create Goal</button>
          </form>
        </div>
      </div>
    </div>
  );
}
