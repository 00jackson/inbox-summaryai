// lib/ai.ts

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function summarizeEmails(emailText: string, mode: "daily" | "weekly") {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are an AI productivity assistant. Given this pasted email thread, generate a ${mode} summary with the following format:
- 🔑 Key Emails (brief summaries)
- 📌 Action Items
- 📅 Follow-Ups

Here is the email text:
---
${emailText}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return text;
}