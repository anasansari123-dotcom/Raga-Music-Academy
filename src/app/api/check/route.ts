import { NextResponse } from "next/server";
import { isCheckAccessAllowed, runHealthChecks } from "@/lib/health-check";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isCheckAccessAllowed(request)) {
    return NextResponse.json(
      { error: "Unauthorized. Pass ?key=CHECK_SECRET in production." },
      { status: 401 }
    );
  }

  try {
    const report = await runHealthChecks();
    const httpStatus = report.summary.fail > 0 ? 503 : 200;
    return NextResponse.json(report, { status: httpStatus });
  } catch (error) {
    console.error("[check]", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Health check failed.",
      },
      { status: 500 }
    );
  }
}
