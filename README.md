# ÉDIFICE

Site statique (React + Babel dans le navigateur).

## Coolify — mode Dockerfile (recommandé)

Dans Coolify : **Build Pack → Dockerfile**

- **Port Exposes** : `80`
- Pas besoin de configurer `dist` à la main : le Dockerfile fait `npm run build` puis sert les fichiers

## Coolify — mode Static / Nixpacks (alternative)

**Build Pack → Nixpacks** + **Is it a static site?** → oui

- **Publish Directory** → `dist`
- **Build Command** → `npm run build`
- Garder `nginx.conf` à la racine

## Test en local

```bash
docker build -t edifice .
docker run --rm -p 8080:80 edifice
```

→ http://localhost:8080
