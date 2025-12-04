import vatData from "@/data/vat.json";

export function calculateFinalPrice(base: number, shipping: number, country: string) {
  const vatRate = vatData[country] || 0;
  const vatAmount = base * vatRate;

  return {
    vatRate,
    vatAmount,
    final: base + shipping + vatAmount
  };
}
