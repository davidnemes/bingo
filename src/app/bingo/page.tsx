"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import QuestCard from "@/components/QuestCard";
import { QUESTS } from "@/lib/quests";
import { loadState, saveState, type AppState } from "@/lib/storage";

export default function BingoPage() {
  const router = useRouter();
  const [state, setState] = useState<AppState | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const existing = loadState();
    if (!existing) {
      router.replace("/");
      return;
    }
    setState(existing);
    setMounted(true);
  }, [router]);

  const handleAnswerChange = (questId: number, value: string) => {
    setState((prev) => {
      if (!prev) return prev;
      const next: AppState = {
        ...prev,
        answers: { ...prev.answers, [questId]: value },
      };
      saveState(next);
      return next;
    });
  };

  if (!mounted || !state) {
    return <div className="min-h-screen" aria-hidden />;
  }

  const completedCount = QUESTS.filter(({ id }) => state.answers[id]?.trim()).length;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto w-full max-w-md px-4 py-5">
        <div className="mb-5">
          <h1 className="text-xl font-bold text-stone-800">
            Szia, {state.userName}!
          </h1>
          <p className="mt-1 text-sm text-stone-600">
            Találj olyan embert, akire igaz az állítás, és írd be a nevét.
            Egy embert csak egy állításhoz használhatsz!
          </p>
          <p className="mt-2 text-sm font-medium text-emerald-700">
            {completedCount} / {QUESTS.length} kész
          </p>
        </div>

        <div className="flex flex-col gap-3 pb-10">
          {QUESTS.map((quest, index) => (
            <QuestCard
              key={quest.id}
              quest={quest}
              index={index}
              value={state.answers[quest.id] ?? ""}
              onChange={(value) => handleAnswerChange(quest.id, value)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
