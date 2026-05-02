export type Quest = {
  id: number;
  text: string;
};

export const QUESTS: Quest[] = [
  { id: 1, text: "Több mint három éve jár ifire." },
  { id: 2, text: "Szereti a spenótot." },
  { id: 3, text: "Nem szereti a csokoládét." },
  { id: 4, text: "Tud vakon, tíz ujjal gépelni." },
  { id: 5, text: "Soha nem tört még csontja." },
  { id: 6, text: "Tud valamilyen fúvós hangszeren játszani." },
  { id: 7, text: "Fehér zokni van rajta most." },
  { id: 8, text: "Van olyan nap a héten, amikor 5 előtt kel." },
  { id: 9, text: "Tud zsonglőrködni legalább három tárggyal." },
  { id: 10, text: "Saját - papíralapú - Bibliája van itt nála most." },
  { id: 11, text: "Tud gulyást főzni." },
  { id: 12, text: "Legalább 4 testvére van." },
  { id: 13, text: "Tud biciklizni kéz nélkül (nullakezezni)." },
  { id: 14, text: "Járt már másik kontinensen." },
  { id: 15, text: "Körbetekerte már a Balatont." },
  { id: 16, text: "Ki tudja rakni a Rubik-kockát." },
  { id: 17, text: "Végigolvasta már a Bibliát legalább egyszer." },
  { id: 18, text: "Vezetett már traktort vagy más mezőgazdasági gépet." },
  { id: 19, text: "Kedvenc színe a lila." },
  { id: 20, text: "Volt már, hogy egész éjszaka fent maradt." },
  { id: 21, text: "Elaludt már film közben." },
];

export function getQuestById(id: number): Quest | undefined {
  return QUESTS.find((q) => q.id === id);
}
