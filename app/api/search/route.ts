import { NextResponse } from "next/server";
import { calculateFinalPrice } from "@/lib/calculateFinalPrice";
import { getCountryFromIP } from "@/lib/getCountryFromIP";

// Import fetchers (עוד מעט נוסיף)
import { fetchAmazon } from "@/lib/fetchers/amazon";
import { fetchAliExpress } from "@/lib/fetchers/aliexpress";
import { fetchTemu } from "@/lib/fetchers/temu";

export async function POST(req: Request) {
  const { query } = await req.json();

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  // Detect country automatically
  const ip = req.headers.get("x-forwarded-for") || "8.8.8.8";
  const country = await getCountryFromIP(ip);

  // Fetch prices from platforms
  const results = [];

  const amazon = await fetchAmazon(query);
  if (amazon) {
    const calc = calculateFinalPrice(amazon.price, amazon.shipping, country);
    results.push({ store: "Amazon", ...amazon, ...calc });
  }

  const aliexpress = await fetchAliExpress(query);
  if (aliexpress) {
    const calc = calculateFinalPrice(aliexpress.price, aliexpress.shipping, country);
    results.push({ store: "AliExpress", ...aliexpress, ...calc });
  }

  const temu = await fetchTemu(query);
  if (temu) {
    const calc = calculateFinalPrice(temu.price, temu.shipping, country);
    results.push({ store: "Temu", ...temu, ...calc });
  }

  return NextResponse.json({ country, results });
}
