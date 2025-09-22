import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type SendBody = {
  subject: string;
  content: string;
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  const supabase = await createClient();
  const body = (await req.json()) as SendBody;

  if (!body?.subject || !body?.content) {
    return NextResponse.json({ error: "subject and content are required" }, { status: 400 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // For local development, we log the email payload.
  // In a future step we can integrate SMTP or MailHog via environment config.
  console.log("[NotificationService] Send email", {
    to: user.email,
    subject: body.subject,
    content: body.content,
  });

  return NextResponse.json({ success: true });
}
