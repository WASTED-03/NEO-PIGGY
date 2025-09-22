import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type LoginBody = {
  email: string;
  password: string;
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  const supabase = await createClient();
  const body = (await req.json()) as LoginBody;

  if (!body?.email || !body?.password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: body.email,
    password: body.password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  return NextResponse.json({
    user: { id: data.user?.id, email: data.user?.email },
  });
}
