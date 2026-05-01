"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { clearState } from "@/lib/storage";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    clearState();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-200 bg-[var(--background)]/95 px-4 py-3 backdrop-blur">
      <Image
        src="/tegezifi_logo.png"
        alt="Tegez Ifi"
        width={120}
        height={120}
        priority
        className="h-10 w-auto"
      />
      <button
        type="button"
        onClick={handleLogout}
        className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 shadow-sm transition hover:bg-stone-50 active:bg-stone-100"
      >
        Kilépés
      </button>
    </header>
  );
}
