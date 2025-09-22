"use client";

import { useMemo } from "react";

type StatPoint = { label: string; value: number };

export default function StatisticsPage(): JSX.Element {
  const expenses: StatPoint[] = useMemo(
    () => [
      { label: "Rent", value: 1600 },
      { label: "Food", value: 420 },
      { label: "Transport", value: 120 },
      { label: "Utilities", value: 180 },
      { label: "Leisure", value: 200 },
    ],
    []
  );

  const income: StatPoint[] = useMemo(
    () => [
      { label: "Salary", value: 4500 },
      { label: "Investments", value: 200 },
    ],
    []
  );

  const maxExpense = Math.max(...expenses.map((e) => e.value), 1);
  const maxIncome = Math.max(...income.map((i) => i.value), 1);

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Expense Breakdown</h2>
          <div className="space-y-3">
            {expenses.map((e) => (
              <div key={e.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{e.label}</span>
                  <span>${e.value.toFixed(2)}</span>
                </div>
                <div className="h-2 rounded bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  <div
                    className="h-2 bg-rose-500"
                    style={{ width: `${(e.value / maxExpense) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Income Sources</h2>
          <div className="space-y-3">
            {income.map((i) => (
              <div key={i.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{i.label}</span>
                  <span>${i.value.toFixed(2)}</span>
                </div>
                <div className="h-2 rounded bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  <div
                    className="h-2 bg-emerald-500"
                    style={{ width: `${(i.value / maxIncome) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold">Monthly Trend</h2>
        <div className="mt-4 grid grid-cols-12 gap-2 items-end h-40">
          {Array.from({ length: 12 }).map((_, idx) => {
            const expenseValue = Math.random() * 2000 + 500;
            const height = (expenseValue / 2500) * 100;
            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="w-5 bg-indigo-500 rounded-md" style={{ height: `${height}%` }} />
                <div className="text-xs text-gray-500">{idx + 1}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
