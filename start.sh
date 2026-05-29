#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

if command -v docker >/dev/null 2>&1; then
  echo "→ Démarrage avec Docker sur http://localhost:8080"
  docker compose up --build
else
  echo "→ Docker absent : serveur Python sur http://localhost:8080"
  echo "  (Ne pas ouvrir index.html en double-clic — utiliser cette URL.)"
  exec python3 -m http.server 8080

fi
