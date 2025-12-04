export async function fetchAliExpress(query: string) {
  try {
    const url = `https://api.aliexpress.com/v1/products/search?keyword=${encodeURIComponent(
      query
    )}&app_key=${process.env.ALX_KEY}`;

    const data = await fetch(url).then((r) => r.json());

    const item = data.result?.products?.[0];
    if (!item) return null;

    return {
      price: parseFloat(item.sale_price),
      shipping: parseFloat(item.logistics_cost || 0),
      link: item.product_url,
    };
  } catch (err) {
    console.error("AliExpress fetch error:", err);
    return null;
  }
}
