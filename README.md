# ÉDIFICE

Application React statique (Babel dans le navigateur). **Un serveur HTTP est obligatoire** — ne pas ouvrir `ÉDIFICE.html` ou `index.html` en double-clic (`file://`), sinon les fichiers `.jsx` sont bloqués par le navigateur.

## Démarrage rapide

```bash
chmod +x start.sh
./start.sh
```

Puis ouvrir : **http://localhost:8080**

## Docker (manuel)

```bash
docker compose up --build
# ou
docker build -t edifice .
docker run --rm -p 8080:80 edifice
```

## Sans Docker

```bash
python3 -m http.server 8080
```

Puis : **http://localhost:8080** (fichier `index.html` à la racine).
