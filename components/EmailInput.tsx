// components/EmailInput.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "@/components/ui/select";

type EmailInputProps = {
  onSubmit: (emailText: string, mode: "daily" | "weekly") => void;
};

export default function EmailInput({ onSubmit }: EmailInputProps) {
  const [emailText, setEmailText] = useState("");
  const [mode, setMode] = useState<"daily" | "weekly">("daily");

  const handleSubmit = () => {
    if (emailText.trim()) {
      onSubmit(emailText, mode);
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="email-text">Let's Summarise your next thread.</Label>
      <Textarea
        id="email-text"
        rows={10}
        placeholder="Paste your email thread here..."
        value={emailText}
        onChange={(e) => setEmailText(e.target.value)}
        className="my-2"
      />

      <div className="flex items-center gap-4">
        <div>
          <Label>Select Summary Mode</Label>
          <Select value={mode} onValueChange={(val) => setMode(val as "daily" | "weekly")}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Summary Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleSubmit} className="mt-6">Summarize</Button>
      </div>
    </div>
  );
}