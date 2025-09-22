import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type SummaryResponse = {
  month: string;
  income: number;
  expenses: number;
  net: number;
  topCategories: Array<{ category: string; amount: number }>;
};

export async function GET(): Promise<NextResponse> {
  const supabase = await createClient();

  // Try querying real data; if fails (e.g., schema not applied), fallback to sample
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      // unauthenticated -> sample
      return NextResponse.json(sampleSummary(), { status: 200 });
    }

    // Fetch transactions for current month (if table exists)
    const start = new Date();
    start.setDate(1);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    const { data: tx, error } = await supabase
      .from("transactions")
      .select("type, amount, category, occurred_on")
      .eq("user_id", user.id)
      .gte("occurred_on", start.toISOString().slice(0, 10))
      .lt("occurred_on", end.toISOString().slice(0, 10));

    if (error || !tx) {
      return NextResponse.json(sampleSummary(), { status: 200 });
    }

    let income = 0;
    let expenses = 0;
    const catTotals = new Map<string, number>();

    tx.forEach((t) => {
      const amt = Number(t.amount);
      if (t.type === "income") {
        income += Math.abs(amt);
      } else {
        expenses += Math.abs(amt);
        if (t.category) {
          catTotals.set(t.category, (catTotals.get(t.category) ?? 0) + Math.abs(amt));
        }
      }
    });

    const topCategories = [...catTotals.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([category, amount]) => ({ category, amount }));

    const resp: SummaryResponse = {
      month: start.toLocaleString("default", { month: "long", year: "numeric" }),
      income,
      expenses,
      net: income - expenses,
      topCategories,
    };

    return NextResponse.json(resp, { status: 200 });
  } catch {
    return NextResponse.json(sampleSummary(), { status: 200 });
  }
}

function sampleSummary(): SummaryResponse {
  return {
    month: new Date().toLocaleString("default", { month: "long", year: "numeric" }),
    income: 4700,
    expenses: 2150,
    net: 2550,
    topCategories: [
      { category: "Rent", amount: 1600 },
      { category: "Food", amount: 420 },
      { category: "Leisure", amount: 130 },
    ],
  };
}
