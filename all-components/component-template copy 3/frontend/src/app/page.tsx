"use client";

import { useComponent } from "@/hooks/useComponent";

export default function Home() {
  const { data, isLoading, execute } = useComponent();

  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Component Demo</h1>

      <div style={{ marginTop: "2rem" }}>
        <button
          onClick={execute}
          disabled={isLoading}
          style={{
            padding: "0.5rem 1rem",
            background: isLoading ? "#ccc" : "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Loading..." : "Execute"}
        </button>
      </div>

      {data && (
        <pre
          style={{
            marginTop: "1rem",
            padding: "1rem",
            background: "#f5f5f5",
            borderRadius: "4px",
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </main>
  );
}
