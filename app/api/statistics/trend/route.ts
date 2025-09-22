import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type TrendPoint = { month: string; income: number; expenses: number };

export async function GET(): Promise<NextResponse> {
  const supabase = await createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return NextResponse.json(sampleTrend(), { status: 200 });

    // Pull last 6 months of transactions
    const end = new Date();
    const start = new Date();
    start.setMonth(end.getMonth() - 6);
    const { data: tx, error } = await supabase
      .from("transactions")
      .select("type, amount, occurred_on")
      .eq("user_id", user.id)
      .gte("occurred_on", start.toISOString().slice(0, 10))
      .lte("occurred_on", end.toISOString().slice(0, 10));

    if (error || !tx) return NextResponse.json(sampleTrend(), { status: 200 });

    const buckets = new Map<string, { income: number; expenses: number }>();
    tx.forEach((t) => {
      const d = new Date(t.occurred_on as string);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const b = buckets.get(key) ?? { income: 0, expenses: 0 };
      if (t.type === "income") b.income += Math.abs(Number(t.amount));
      else b.expenses += Math.abs(Number(t.amount));
      buckets.set(key, b);
    });

    const points: TrendPoint[] = [...buckets.entries()]
      .sort((a, b) => (a[0] < b[0] ? -1 : 1))
      .map(([key, v]) => ({
        month: key,
        income: v.income,
        expenses: v.expenses,
      }));

    return NextResponse.json(points, { status: 200 });
  } catch {
    return NextResponse.json(sampleTrend(), { status: 200 });
  }
}

function sampleTrend(): TrendPoint[] {
  const now = new Date();
  return Array.from({ length: 6 }).map((_, i) => {
    const d = new Date();
    d.setMonth(now.getMonth() - (5 - i));
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    return {
      month: key,
      income: 4500 + Math.round(Math.random() * 300),
      expenses: 1800 + Math.round(Math.random() * 400),
    };
  });
}
