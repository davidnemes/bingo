# Deploy — bingo.davidnemes.hu

A bingo külön Docker stackben fut a Hetzner VPS-en, az ottapont meglévő
Caddy reverse proxy-ja mögött. A bingo container csak a `127.0.0.1:3001`
portra köt ki — a Caddy ezen keresztül éri el.

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

## 3. Build + indítás

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

Ellenőrzés:

```bash
docker compose -f docker-compose.prod.yml ps
curl -I http://127.0.0.1:3001/
```

## 4. Ottapont Caddy bővítése

Az **ottapont repo** `docker/Caddyfile` végéhez add hozzá:

```caddy
bingo.davidnemes.hu {
    encode gzip
    reverse_proxy host.docker.internal:3001
}
```

Az ottapont `docker-compose.prod.yml`-ben a `caddy` service-hez vedd fel
(hogy Linux alatt is működjön a `host.docker.internal`):

```yaml
caddy:
  # ...
  extra_hosts:
    - "host.docker.internal:host-gateway"
```

Majd az ottapont könyvtárban:

```bash
docker compose -f docker-compose.prod.yml up -d caddy
```

A Caddy automatikusan kér Let's Encrypt cert-et a `bingo.davidnemes.hu`-ra
(a már beállított `SSL_EMAIL` alapján).

## 5. Frissítés (új deploy)

```bash
cd /opt/bingo
git pull
docker compose -f docker-compose.prod.yml up -d --build
docker image prune -f
```

## Tűzfal

A 3001-es port csak a `127.0.0.1`-re van mappelve, kívülről nem érhető el —
nem kell tűzfalszabály hozzá. Csak a 80/443 marad nyitva (az ottapont
Caddy kezeli).
