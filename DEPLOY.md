# Deploy — bingo.davidnemes.hu

> ## ⚡ Gyors deploy (kód módosítás után)
>
> ```bash
> # lokálisan
> git push
>
> # VPS-en
> cd /opt/bingo
> git pull
> docker compose -f docker-compose.prod.yml up -d --build
> ```

---

A bingo külön Docker stackben fut a Hetzner VPS-en, az ottapont meglévő
Caddy reverse proxy-ja mögött. A két stack egy közös `web` Docker
network-ön keresztül kommunikál — a bingo nem publikál portot a host felé.

## 1. DNS

Hetzner / domain regisztrátor felületén:

- `A` rekord: `bingo.davidnemes.hu` → VPS publikus IPv4
- (Opcionális) `AAAA` rekord IPv6-ra

## 2. Kód a VPS-re

```bash
ssh <vps>
cd /opt   # vagy ahova szeretnéd
git clone https://github.com/davidnemes/bingo.git
cd bingo
```

## 3. Közös Docker network (egyszer kell)

A bingo és az ottapont Caddy egy megosztott `web` network-ön kommunikálnak:

```bash
docker network create web
```

## 4. Build + indítás

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

Ellenőrzés:

```bash
docker compose -f docker-compose.prod.yml ps
docker exec bingo wget -qO- http://localhost:3000/ | head -5
```

## 5. Ottapont oldali konfig

Az ottapont repo-ban a `caddy` service is rá van kötve a `web` network-re,
és a Caddyfile `reverse_proxy bingo:3000`-on éri el ezt a containert.
Ezeket a változásokat az ottapont repo tartalmazza — a VPS-en csak újra
kell indítani:

```bash
cd <ottapont-dir>
git pull
docker compose -f docker-compose.prod.yml up -d caddy
```

A Caddy automatikusan kér Let's Encrypt cert-et a `bingo.davidnemes.hu`-ra
(a már beállított `SSL_EMAIL` alapján).

## 6. Frissítés (új deploy)

Lásd a fájl tetején a "Gyors deploy" blokkot. Időnként érdemes a régi
image-eket is takarítani:

```bash
docker image prune -f
```

Hasznos parancsok:

```bash
# Logok élőben
docker compose -f docker-compose.prod.yml logs -f bingo

# Teljes újraindítás (ha valami "elromlott")
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d --build
```

## Tűzfal

A bingo container nem publikál portot a host felé — csak a `web` Docker
network-en keresztül érhető el. Kívülről csak a 80/443 marad nyitva (az
ottapont Caddy kezeli).
