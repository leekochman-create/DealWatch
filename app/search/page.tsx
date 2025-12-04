"use client";

import { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [country, setCountry] = useState<string>("?");
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!query) return;

    setLoading(true);

    const res = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({ query }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
    setResults(data.results || []);
    setCountry(data.country || "?");

    setLoading(false);
  }

  return (
    <div style={{ padding: "30px", maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>
        🔍 DealWatch — Price Comparison
      </h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Enter product name…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "18px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />
      </div>

      <button
        onClick={handleSearch}
        style={{
          background: "black",
          color: "white",
          padding: "12px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "18px"
        }}
      >
        Search
      </button>

      {loading && <p style={{ marginTop: "20px" }}>Searching…</p>}

      {country !== "?" && (
        <p style={{ marginTop: "20px", fontSize: "16px" }}>
          🌍 Detected Country: <b>{country}</b>
        </p>
      )}

      {results.length > 0 && (
        <table
          style={{
            width: "100%",
            marginTop: "30px",
            borderCollapse: "collapse"
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid #ddd" }}>
              <th style={{ textAlign: "left", padding: "10px" }}>Store</th>
              <th>Base</th> 
              <th>Ship</th> 
              <th>VAT</th>
              <th>Final</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px" }}>{r.store}</td>
                <td>${r.price?.toFixed(2)}</td>
                <td>${r.shipping?.toFixed(2)}</td>
                <td>${r.vatAmount?.toFixed(2)}</td>
                <td>
                  <b>${r.final?.toFixed(2)}</b>
                </td>
                <td>
                  <a
                    href={r.link}
                    target="_blank"
                    style={{ color: "blue", fontWeight: "bold" }}
                  >
                    Buy
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
