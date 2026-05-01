"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { QUESTS } from "@/lib/quests";
import { pickRandom } from "@/lib/shuffle";
import { loadState, saveState } from "@/lib/storage";

export default function LoginForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const existing = loadState();
    if (existing) {
      router.replace("/bingo");
      return;
    }
    setMounted(true);
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    const ids = QUESTS.map((q) => q.id);
    const questIds = pickRandom(ids, 10);
    saveState({ userName: trimmed, questIds, answers: {} });
    router.push("/bingo");
  };

  if (!mounted) {
    return <div className="min-h-screen" aria-hidden />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-10">
      <div className="flex w-full max-w-sm flex-col items-center gap-8">
        <Image
          src="/tegezifi_logo.png"
          alt="Tegez Ifi"
          width={512}
          height={512}
          priority
          className="h-auto w-[70vw] max-w-[280px]"
        />
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <label htmlFor="name" className="text-sm font-medium text-stone-700">
            Add meg a neved
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Pl. Anna"
            autoComplete="given-name"
            className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-base shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            Belépés
          </button>
        </form>
      </div>
    </main>
  );
}
