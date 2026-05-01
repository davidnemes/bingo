# Tegez Ifi - Bingo

Mobile-first ifjúsági bingó webalkalmazás keresztény ifjúsági közösségeknek.
A játékosok belépéskor 10 random kisorsolt állítást kapnak, és az a cél, hogy
mindegyik állításhoz találjanak egy olyan embert a közösségben, akire igaz —
egy embert csak egy állításhoz lehet beírni. Aki elsőként mind a 10-et
kitölti, nyer.

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router)
- TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/)
- localStorage az adatok perzisztálásához (refresh után megmarad)

## Funkciók

- **Belépés oldal** (`/`): névmegadás, nagy logó az input felett.
- **Bingo oldal** (`/bingo`): fejléc logóval és kilépés gombbal, 10 quest
  kártya. A kitöltött kártyák zöld háttérrel és pipával jelennek meg.
- **Sorsolás**: belépéskor a 25 előre megírt állításból random 10 kerül
  kiválasztásra. A sorsolt 10 quest + a beírt válaszok refresh után is
  megmaradnak (localStorage).
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

A 25 állítás a [src/lib/quests.ts](src/lib/quests.ts) fájlban található
egy konstans tömbként. Új állítás hozzáadásához egyszerűen vegyél fel egy
újabb objektumot egyedi `id`-vel. Régi állítás módosítható vagy eltávolítható
ugyanitt — a belépéskor kiválasztott 10 quest mindig az aktuális listából
sorsolódik.

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
    ├── quests.ts           (25 állítás konstans)
    ├── storage.ts          (localStorage helperek)
    └── shuffle.ts          (Fisher-Yates shuffle)
public/
└── tegezifi_logo.png
```

## Deploy

A legegyszerűbb deploy a [Vercel](https://vercel.com/)-en keresztül: kösd be a
GitHub repo-t, és automatikusan build-eli + üzemelteti az alkalmazást.
Backend / adatbázis nem szükséges, mert minden adat a böngésző
localStorage-ában tárolódik.
