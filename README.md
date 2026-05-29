# ÉDIFICE

Site statique (React + Babel dans le navigateur).

## Coolify (build pack Static / Nixpacks)

1. **Is it a static site?** → oui  
2. **Publish Directory** → `dist`  
3. **Build Command** → `npm run build` (défaut si `package.json` présent)  
4. **Install Command** → vide ou `npm install` (aucune dépendance npm)

Le script `build` copie `index.html`, `app/` et `lib/` vers `dist/` — Coolify attend ce dossier.

`nginx.conf` à la racine : config utilisée par l’image nginx générée par Coolify (ne pas supprimer).

## Test en local

```bash
npm run build
python3 -m http.server 8080 --directory dist
```

→ http://localhost:8080
