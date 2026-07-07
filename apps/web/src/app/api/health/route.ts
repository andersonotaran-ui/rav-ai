import { NextResponse } from "next/server";

// Endpoint interno usado pelo HEALTHCHECK do container (ver apps/web/Dockerfile).
export async function GET() {
  return NextResponse.json({ status: "ok" });
}
