# Mobile route optimizer (React Native + Node.js)

Cette base de code propose une architecture prête pour une app mobile Expo/React Native connectée à un back-end Node.js/Express écrit en TypeScript.

## Architecture
- **backend/** : API REST Express modulaire (auth, OCR, listings, emails). Prisma + PostgreSQL, JWT, géocodage Google, export Excel, envoi d'e-mails via SMTP.
- **mobile/** : app Expo (TypeScript) avec React Navigation, Zustand, appels API via Axios, écrans pour auth, création de listing par OCR, optimisation de tournée, affichage cartographique et envoi d'e-mail.
- **prisma/** : schéma et migration initiale PostgreSQL.

Configurez les variables d'environnement (`JWT_SECRET`, `DATABASE_URL`, `GOOGLE_VISION_KEY`, `GOOGLE_MAPS_KEY`, `SMTP_URL`, etc.) avant de démarrer.

### Variables d'environnement (backend)

- Créez un fichier `backend/.env` en vous basant sur `backend/.env.example` et **ne stockez pas les valeurs sensibles dans le code TypeScript**.
- Format attendu : des lignes `CLE=valeur` (ex. `GOOGLE_MAPS_KEY=xxx`), chargées automatiquement par `dotenv`.
- Évitez d'écrire `PORT=4000` ou des clés API directement dans `backend/src/config/env.ts` : ce fichier doit uniquement lire `process.env`.

## Configuration Google Maps (mobile)

- Un exemple d'environnement `mobile/.env.example` est fourni avec une clé Google Maps de test pour débloquer immédiatement l'affichage. Copiez-le en `mobile/.env` ou définissez `GOOGLE_MAPS_KEY` dans vos variables shell / secrets EAS pour utiliser votre propre clé.
- L'app charge automatiquement `.env` (via `dotenv/config`) et, à défaut, retombe sur la clé de secours intégrée. Fournissez votre propre clé en production.
- L'écran **MapTest** (tableau de bord) affiche l'état de la clé et du provider. Sans clé ou depuis Expo Go, il bascule sur le provider par défaut et indique comment injecter la clé.
- Expo Go ne peut pas charger le provider Google même avec la clé. Utilisez un Dev Client ou un build EAS pour vérifier l'affichage des tuiles Google. Les écrans qui importent `react-native-maps` peuvent afficher une erreur de compilation JS dans Expo Go faute du module natif ; relancez l'app dans un Dev Client pour valider la carte.
- Pour vérifier statiquement le code mobile : `cd mobile && npm run typecheck` (équivalent `npx tsc --noEmit`).

## Dépannage Windows : `npm`/`npx` non reconnus

L'erreur affichée sur la capture (commande `npm`/`npx` non reconnue) signifie que Node.js n'est pas installé ou pas ajouté au `PATH`.

- Installez Node.js LTS (18.x ou 20.x) depuis https://nodejs.org et cochez l'option « Ajouter au PATH » pendant l'installation.
- Fermez puis rouvrez le terminal pour rafraîchir les variables d'environnement.
- Vérifiez que les binaires sont accessibles : `node -v` et `npm -v` doivent répondre avec une version.
- Depuis le dossier `mobile/`, exécutez `npm install` puis `npm run start` ou `npm run typecheck` selon le besoin.
