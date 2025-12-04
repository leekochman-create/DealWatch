"use client";

import { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [country, setCountry] = useState<string>("?");
  const [loading, setLoading] = useState(false);

  async function searchNow() {
    if (!query) return;

    setLoading(true);

    const res = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();

    setCountry(data.country || "?");
    setResults(data.results || []);
    setLoading(false);
  }

  return (
    <div style={{ padding: "30px", maxWidth: "850px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "20px" }}>
        🔍 DealWatch Search
      </h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="לדוגמה: JBL Tune 510BT"
          style={{
            flex: 1,
            padding: "12px",
            fontSize: "18px",
            borderRadius: "8px",
            border: "1px solid #bbb",
          }}
        />

        <button
          onClick={searchNow}
          style={{
            background: "black",
            color: "white",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          חפש
        </button>
      </div>

      {loading && <p>מחפש נתונים…</p>}

      {country !== "?" && !loading && (
        <p style={{ marginBottom: "20px", fontSize: "18px" }}>
          🌍 זוהתה מדינה: <b>{country}</b>
        </p>
      )}

      {results.length > 0 && (
        <table
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid #ddd", background: "#f8f8f8" }}>
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
                <td><b>${r.final?.toFixed(2)}</b></td>
                <td>
                  <a
                    href={r.link}
                    target="_blank"
                    style={{ color: "blue", fontWeight: "bold" }}
                  >
                    Buy →
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
