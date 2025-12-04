import { NextResponse } from "next/server";

import { getCountryFromIP } from "@/lib/getCountryFromIP";
import { calculateFinalPrice } from "@/lib/calculateFinalPrice";

// כאן מביאים רק את אמזון ואלי אקספרס
import { fetchAmazon } from "@/lib/fetchers/amazon";
import { fetchAliExpress } from "@/lib/fetchers/aliexpress";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ error: "Missing query" }, { status: 400 });
    }

    // IP → Country
    const ip = req.headers.get("x-forwarded-for") || "8.8.8.8";
    const country = await getCountryFromIP(ip);

    const results: any[] = [];

    // AMAZON
    const amazon = await fetchAmazon(query);
    if (amazon) {
      const calc = calculateFinalPrice(amazon.price, amazon.shipping, country);
      results.push({ store: "Amazon", ...amazon, ...calc });
    }

    // ALIEXPRESS
    const ali = await fetchAliExpress(query);
    if (ali) {
      const calc = calculateFinalPrice(ali.price, ali.shipping, country);
      results.push({ store: "AliExpress", ...ali, ...calc });
    }

    return NextResponse.json({ country, results });
  } catch (err) {
    console.error("SEARCH API ERROR:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
