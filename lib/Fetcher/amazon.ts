import * as cheerio from "cheerio";

export async function fetchAmazon(query: string) {
  try {
    const url = `https://api.scraperapi.com/?api_key=${process.env.SCRAPER_API_KEY}&url=https://www.amazon.com/s?k=${encodeURIComponent(
      query
    )}`;

    const html = await fetch(url).then((r) => r.text());
    const $ = cheerio.load(html);

    const product = $(".s-result-item").first();

    const priceText =
      product.find(".a-price-whole").text().replace(",", "") || null;

    if (!priceText) return null;

    const price = parseFloat(priceText);
    const relative = product.find("a").attr("href");
    const link = "https://www.amazon.com" + relative;

    return {
      price,
      shipping: 0, // לרוב חינם מעל $35 בארה״ב
      link,
    };
  } catch (err) {
    console.error("Amazon fetch error:", err);
    return null;
  }
}
