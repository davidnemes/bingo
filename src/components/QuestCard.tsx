"use client";

import type { Quest } from "@/lib/quests";

type Props = {
  quest: Quest;
  index: number;
  value: string;
  onChange: (value: string) => void;
};

export default function QuestCard({ quest, index, value, onChange }: Props) {
  const completed = value.trim().length > 0;

  return (
    <div
      className={`rounded-2xl border p-4 shadow-sm transition ${
        completed
          ? "border-emerald-400 bg-emerald-50"
          : "border-stone-200 bg-white"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden
          className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
            completed
              ? "bg-emerald-600 text-white"
              : "bg-stone-100 text-stone-500"
          }`}
        >
          {completed ? "✓" : index + 1}
        </span>
        <p className="flex-1 text-base leading-snug text-stone-800">
          {quest.text}
        </p>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Kit találtál?"
        autoComplete="off"
        className="mt-3 w-full rounded-xl border border-stone-300 bg-white px-3 py-3 text-base outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
      />
    </div>
  );
}
