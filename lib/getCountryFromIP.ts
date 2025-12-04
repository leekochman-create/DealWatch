export async function getCountryFromIP(ip: string) {
  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await res.json();

    return data.country || "US"; // fallback
  } catch (err) {
    console.error("IP lookup failed:", err);
    return "US";
  }
}
