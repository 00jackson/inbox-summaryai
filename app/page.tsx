// app/page.tsx

"use client";

import { useState } from "react";
import EmailInput from "@/components/EmailInput";
import { formatGeminiOutput } from "@/lib/format";
import { summarizeEmails } from "@/lib/ai";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");

  const handleSummarize = async (emailText: string, mode: "daily" | "weekly") => {
    setLoading(true);
    setSummary("");

    try {
      const result = await summarizeEmails(emailText, mode);
      setSummary(result);
    } catch (err) {
      console.error("Failed to summarize:", err);
      setSummary("⚠️ Error generating summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">📬 InboxSummary</h1>
      <EmailInput onSubmit={handleSummarize} />

      {loading && <p className="mt-6 animate-pulse text-muted-foreground">AI is thinking...</p>}

      {summary && (
        <div className="mt-6 p-3 border rounded prose prose-sm dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: formatGeminiOutput(summary) }} />
        </div>
      )}
    </main>
  );
}