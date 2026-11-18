# Tegez Ifi - Bingo

Mobile-first ifjúsági bingó webalkalmazás keresztény ifjúsági közösségeknek.
Minden játékos a Mélyebbre ifikonfi bingólapjának 16 állítását kapja, a
nyomtatott lappal azonos sorrendben. Mindegyik állításhoz olyan embert kell
találni a közösségben, akire igaz. Egy embert csak egy állításhoz lehet beírni.

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router)
- TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/)
- localStorage az adatok perzisztálásához (refresh után megmarad)

## Funkciók

- **Belépés oldal** (`/`): névmegadás, nagy logó az input felett.
- **Bingo oldal** (`/bingo`): fejléc logóval és kilépés gombbal, 16 állításkártya.
  A kitöltött kártyák zöld háttérrel és pipával jelennek meg.
- **Mentés**: a beírt válaszok frissítés után is megmaradnak (localStorage).
- **Kilépés**: a fejléc jobb oldalán a "Kilépés" gomb üríti a localStorage-ot
  és visszadob a belépés oldalra.
- **Mobile-first design**: minden képernyőméreten kényelmesen használható.

## Helyi futtatás

```bash
npm install
npm run dev
```

Az alkalmazás a [http://localhost:3000](http://localhost:3000) címen érhető el.

## Build

```bash
npm run build
npm start
```

## Állítások szerkesztése

A [src/lib/quests.ts](src/lib/quests.ts) fájlban lévő `QUESTS` tömb adja
az aktuális állításokat és a sorrendjüket. A korábbi állításokat a
`PREVIOUS_QUESTS` tömb őrzi. Új állításhoz adj meg egyedi `id`-t, mert a
böngésző az `id` alapján társítja a mentett válaszokat az állításokhoz.

## Projekt struktúra

```
src/
├── app/
│   ├── layout.tsx          (root layout)
│   ├── page.tsx            (belépés oldal)
│   ├── bingo/page.tsx      (bingo oldal)
│   └── globals.css         (Tailwind + alapszínek)
├── components/
│   ├── LoginForm.tsx
│   ├── Header.tsx
│   └── QuestCard.tsx
└── lib/
    ├── quests.ts           (aktuális és korábbi állítások)
    └── storage.ts          (localStorage helperek)
public/
└── tegezifi_logo.png
```

## Deploy

A legegyszerűbb deploy a [Vercel](https://vercel.com/)-en keresztül: kösd be a
GitHub repo-t, és automatikusan build-eli + üzemelteti az alkalmazást.
Backend / adatbázis nem szükséges, mert minden adat a böngésző
localStorage-ában tárolódik.
