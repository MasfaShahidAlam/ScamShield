"use client";

import { useState } from "react";

type Analysis = {
  riskScore: number;
  riskLevel: "Safe" | "Suspicious" | "High Risk";
  category: string;
  redFlags: {
    phrase: string;
    reason: string;
  }[];
  explanation: string;
  recommendedActions: string[];
};
function highlightPhrases(text: string, phrases: string[]) {
  const uniquePhrases = [...new Set(phrases)]
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);

  if (uniquePhrases.length === 0) {
    return text;
  }

  const pattern = new RegExp(
    `(${uniquePhrases
      .map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|")})`,
    "gi",
  );

  return text.split(pattern).map((part, index) => {
    const isMatch = uniquePhrases.some(
      (phrase) => phrase.toLowerCase() === part.toLowerCase(),
    );

    return isMatch ? (
      <mark
        key={index}
        className="rounded bg-danger/20 px-1 font-medium text-danger"
      >
        {part}
      </mark>
    ) : (
      <span key={index}>{part}</span>
    );
  });
}
export default function MessageInput() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Analysis | null>(null);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    if (!message.trim()) {
      return;
    }

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed.");
      }

      setResult(data);
    } catch (error) {
      console.error("Analysis failed:", error);
      setError(
  error instanceof Error
    ? error.message
    : "Something went wrong. Please try again."
);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <label
        htmlFor="message"
        className="mb-2 block text-sm font-medium text-foreground"
      >
        Paste a suspicious message
      </label>

      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Paste an SMS, email, WhatsApp message, job offer, prize message..."
        className="min-h-40 w-full resize-none rounded-xl border border-border bg-surface p-4 text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
      />

      <button
        type="button"
        onClick={handleAnalyze}
        disabled={loading || !message.trim()}
        className="mt-4 w-full rounded-xl bg-accent px-5 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
       {loading ? "Analyzing your message..." : "Analyze Message"}
      </button>

      {error && (
        <p className="mt-4 rounded-lg border border-danger/30 bg-danger/10 p-3 text-sm text-danger">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-8 space-y-5">
          <div className="rounded-xl border border-border bg-surface p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Message Analysis
            </h2>

            <p className="mt-4 whitespace-pre-wrap leading-7 text-muted">
              {highlightPhrases(
                message,
                result.redFlags.map((flag) => flag.phrase),
              )}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6">
  <p className="text-sm font-medium text-muted">
    Risk Score
  </p>

  <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
    <div>
      <span className="font-display text-5xl font-bold text-foreground">
        {result.riskScore}
      </span>

      <span className="ml-1 text-muted">/100</span>
    </div>

    <span
      className={`rounded-full px-4 py-2 text-sm font-semibold ${
        result.riskLevel === "Safe"
          ? "bg-safe/10 text-safe"
          : result.riskLevel === "Suspicious"
            ? "bg-warning/10 text-warning"
            : "bg-danger/10 text-danger"
      }`}
    >
      {result.riskLevel}
    </span>
  </div>

  <div className="mt-5 h-3 overflow-hidden rounded-full bg-border">
    <div
      className={`h-full rounded-full transition-all ${
        result.riskLevel === "Safe"
          ? "bg-safe"
          : result.riskLevel === "Suspicious"
            ? "bg-warning"
            : "bg-danger"
      }`}
      style={{ width: `${result.riskScore}%` }}
    />
  </div>

  <p className="mt-3 text-sm text-muted">
    Category:{" "}
    <span className="font-medium text-foreground">
      {result.category}
    </span>
  </p>
</div>

          <div className="rounded-xl border border-border bg-surface p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Why this looks suspicious
            </h2>

            <p className="mt-3 leading-7 text-muted">{result.explanation}</p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Red Flags
            </h2>

            <div className="mt-4 space-y-4">
              {result.redFlags.map((flag, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-border p-4"
                >
                  <p className="font-medium text-danger">
                    &quot;{flag.phrase}&quot;
                  </p>

                  <p className="mt-1 text-sm leading-6 text-muted">
                    {flag.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">
              What you should do
            </h2>

            <ul className="mt-4 space-y-3">
              {result.recommendedActions.map((action, index) => (
                <li
                  key={index}
                  className="flex gap-3 text-sm leading-6 text-muted"
                >
                  <span className="text-accent">•</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
