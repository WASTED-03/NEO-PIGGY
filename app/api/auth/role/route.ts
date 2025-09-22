import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { Enums, Tables } from "@/database.types";

type Role = Enums<"role">;
type Profile = Tables<"user_profiles">;

type RoleBody = {
  userId: string;
  role: Role;
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  const supabase = await createClient();

  // who is calling?
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ensure caller is admin
  const { data: callerProfile } = await supabase
    .from("user_profiles")
    .select("role")
    .eq("user_id", user.id)
    .single<Pick<Profile, "role">>();

  if (callerProfile?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await req.json()) as RoleBody;
  if (!body?.userId || !body?.role) {
    return NextResponse.json({ error: "userId and role are required" }, { status: 400 });
  }

  const { error } = await supabase
    .from("user_profiles")
    .update({ role: body.role })
    .eq("user_id", body.userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
