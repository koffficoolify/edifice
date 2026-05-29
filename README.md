# ÉDIFICE

Site statique (React + Babel dans le navigateur).

## Coolify

- Type de build : **Static** (pas de Dockerfile)
- Racine du site : répertoire du repo (`index.html` à la racine)
- Traefik / le proxy Coolify sert les fichiers — rien à ajouter dans le repo

**Port Exposes** : laisser la valeur par défaut Coolify pour un site statique (souvent `80`).

## Test en local

```bash
python3 -m http.server 8080
```

→ http://localhost:8080 (ne pas ouvrir le HTML en `file://`).
