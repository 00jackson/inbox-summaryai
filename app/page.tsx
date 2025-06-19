"use client";

import { useState, useEffect } from "react";
import EmailInput from "@/components/EmailInput";
import { formatGeminiOutput } from "@/lib/format";
import { summarizeEmails } from "@/lib/ai";
import { useSummaryHistory } from "@/lib/useSummaryHistory";
import * as Dialog from "@radix-ui/react-dialog";
import { HistoryIcon, CopyIcon, ChevronRight } from "lucide-react";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [welcomeComplete, setWelcomeComplete] = useState(false);
  const { history, saveSummary } = useSummaryHistory();

  useEffect(() => {
    const timer = setTimeout(() => setWelcomeComplete(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  const handleSummarize = async (emailText: string, mode: "daily" | "weekly") => {
    setLoading(true);
    setSummary("");

    try {
      const result = await summarizeEmails(emailText, mode);
      setSummary(result);
      saveSummary(mode, result);
    } catch (err) {
      console.error("Failed to summarize:", err);
      setSummary("⚠️ Error generating summary.");
    } finally {
      setLoading(false);
    }
  };

  if (!welcomeComplete) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center space-y-4 px-4">
          <div className="relative inline-block">
            <div className="text-5xl sm:text-6xl animate-float">📨</div>
            <div className="absolute -bottom-4 left-0 right-0 h-2 bg-blue-200/50 dark:bg-purple-800/30 rounded-full animate-pulse-scale"></div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-light text-blue-800 dark:text-purple-100 animate-fade-in">
            InboxSummary
          </h1>
          <p className="text-blue-600/80 dark:text-purple-200/80 animate-fade-in-delay text-sm sm:text-base">
            Your email digestion assistant
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8 text-center">
        <h1 className="text-xl sm:text-2xl font-light text-blue-800 dark:text-purple-100 mb-1">
          Inbox Summary 📩
        </h1>
        <p className="text-blue-600/80 dark:text-purple-200/80 text-xs sm:text-sm">
          Paste emails to get a clean summary
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8 border border-blue-100 dark:border-gray-700">
        <EmailInput onSubmit={handleSummarize} />
      </div>

      {loading && (
        <div className="flex justify-center my-8 sm:my-12">
          <div className="animate-pulse text-blue-600/80 dark:text-purple-300 flex items-center text-sm sm:text-base">
            <span className="inline-block mr-2 animate-bounce">✍️</span> 
            Crafting your summary...
          </div>
        </div>
      )}

      {summary && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8 border border-blue-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h2 className="font-medium text-blue-800 dark:text-purple-100 text-sm sm:text-base">
              Summary
            </h2>
            <button
              onClick={() => navigator.clipboard.writeText(summary)}
              className="text-xs sm:text-sm text-blue-600/80 dark:text-purple-300 hover:text-blue-800 dark:hover:text-purple-100 flex items-center gap-1"
            >
              <CopyIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Copy</span>
            </button>
          </div>
          <div
            className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 text-xs sm:text-sm"
            dangerouslySetInnerHTML={{ __html: formatGeminiOutput(summary) }}
          />
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-6 sm:mt-8">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs sm:text-sm font-medium text-blue-800/80 dark:text-purple-200/80">
              Previous Summaries
            </h3>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button className="text-xs flex items-center gap-1 text-blue-600/80 dark:text-purple-300 hover:text-blue-800 dark:hover:text-purple-100">
                  <HistoryIcon className="w-3 h-3" />
                  <span className="hidden sm:inline">View all</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </Dialog.Trigger>
              
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md sm:max-w-xl max-h-[80vh] bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 overflow-y-auto border border-blue-100 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-4">
                    <Dialog.Title className="text-base sm:text-lg font-medium text-blue-800 dark:text-purple-100">
                      Summary History
                    </Dialog.Title>
                    <Dialog.Close className="text-blue-600/80 dark:text-purple-300 hover:text-blue-800 dark:hover:text-purple-100">
                      ✕
                    </Dialog.Close>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    {history.map((entry) => (
                      <div key={entry.id} className="border border-blue-100 dark:border-gray-700 rounded-lg p-3 sm:p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100/50 dark:bg-purple-900/30 text-blue-800 dark:text-purple-300">
                              {entry.mode.toUpperCase()}
                            </span>
                            <p className="text-xs text-blue-600/80 dark:text-purple-300 mt-1">
                              {new Date(entry.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <button
                            onClick={() => navigator.clipboard.writeText(entry.content)}
                            className="p-1 text-blue-600/80 dark:text-purple-300 hover:text-blue-800 dark:hover:text-purple-100"
                            title="Copy summary"
                          >
                            <CopyIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                        <div
                          className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap"
                          dangerouslySetInnerHTML={{ __html: formatGeminiOutput(entry.content) }}
                        />
                      </div>
                    ))}
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {history.slice(0, 2).map((entry) => (
              <div
                key={entry.id}
                className="border border-blue-100 dark:border-gray-700 rounded-lg p-3 sm:p-4 hover:bg-blue-50/30 dark:hover:bg-purple-900/10 transition-colors"
              >
                <div className="flex justify-between text-xs text-blue-600/80 dark:text-purple-300 mb-1 sm:mb-2">
                  <span>{entry.mode.toUpperCase()}</span>
                  <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
                </div>
                <div
                  className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: formatGeminiOutput(entry.content) }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}