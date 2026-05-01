export type AppState = {
  userName: string;
  questIds: number[];
  answers: Record<number, string>;
};

const STORAGE_KEY = "tegezifi-bingo-state";

export function loadState(): AppState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AppState;
    if (
      typeof parsed?.userName !== "string" ||
      !Array.isArray(parsed?.questIds) ||
      typeof parsed?.answers !== "object" ||
      parsed.answers === null
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveState(state: AppState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearState(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
