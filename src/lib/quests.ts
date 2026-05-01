export type Quest = {
  id: number;
  text: string;
};

export const QUESTS: Quest[] = [
  { id: 1, text: "Volt már külföldön nyári táborban." },
  { id: 2, text: "Játszik valamilyen hangszeren." },
  { id: 3, text: "Tud legalább három nyelven köszönni." },
  { id: 4, text: "Van háziállata." },
  { id: 5, text: "Olvasta már végig az egyik evangéliumot." },
  { id: 6, text: "Volt már színpadon szerepelni." },
  { id: 7, text: "Van idősebb testvére." },
  { id: 8, text: "Tud kerékpározni kéz nélkül." },
  { id: 9, text: "Heti rendszerességgel sportol." },
  { id: 10, text: "Tud fejből egy bibliai verset." },
  { id: 11, text: "Volt már zarándokúton vagy lelkigyakorlaton." },
  { id: 12, text: "Tud főzni egy teljes ebédet." },
  { id: 13, text: "Saját Bibliája van itt nála most." },
  { id: 14, text: "Énekel kórusban vagy dicsőítő csapatban." },
  { id: 15, text: "Nézte már a The Chosen sorozatot." },
  { id: 16, text: "Volt már keresztény ifjúsági fesztiválon." },
  { id: 17, text: "Tud úszni 100 métert megállás nélkül." },
  { id: 18, text: "Tanult vagy tanul hittant." },
  { id: 19, text: "Tavaly is volt ezen az ifin." },
  { id: 20, text: "Más településen lakik, mint az ifi helyszíne." },
  { id: 21, text: "Van olyan nap, amikor 6 előtt kel." },
  { id: 22, text: "Foglalkozott már gyerekekkel (hittan, tábor, foglalkozás)." },
  { id: 23, text: "Tud zsonglőrködni legalább három tárggyal." },
  { id: 24, text: "Volt már keresztszülő vagy bérmaszülő-jelölt." },
  { id: 25, text: "Megtanult kívülről egy zsoltárt vagy imádságot idén." },
];

export function getQuestById(id: number): Quest | undefined {
  return QUESTS.find((q) => q.id === id);
}
