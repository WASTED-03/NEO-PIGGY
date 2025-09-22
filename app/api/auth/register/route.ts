import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type RegisterBody = {
  email: string;
  password: string;
  name?: string;
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  const supabase = await createClient();
  const body = (await req.json()) as RegisterBody;

  if (!body?.email || !body?.password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const { data, error } = await supabase.auth.signUp({
    email: body.email,
    password: body.password,
    options: {
      data: { name: body.name ?? "" },
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({
    user: {
      id: data.user?.id,
      email: data.user?.email,
    },
    message: "Registration successful. Please check your email if confirmation is required.",
  });
}
