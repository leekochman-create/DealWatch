import { NextResponse } from "next/server";
import { getCountryFromIP } from "../../../lib/getCountryFromIP";

export async function GET(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "8.8.8.8";
  const country = await getCountryFromIP(ip);

  return NextResponse.json({ country });
}
