"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "800px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "40px", fontWeight: "bold", marginBottom: "20px" }}>
        🌍 DealWatch
      </h1>

      <p style={{ fontSize: "20px", marginBottom: "30px", color: "#444" }}>
        השוואת מחירים בינלאומית בזמן אמת<br />
        מחיר + משלוח + מע״מ לפי המדינה שלך
      </p>

      <button
        onClick={() => router.push("/search")}
        style={{
          background: "black",
          color: "white",
          padding: "15px 30px",
          fontSize: "20px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        🔍 התחל חיפוש
      </button>
    </div>
  );
}
