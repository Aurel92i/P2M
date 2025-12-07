# Mobile route optimizer (React Native + Node.js)

Cette base de code propose une architecture prête pour une app mobile Expo/React Native connectée à un back-end Node.js/Express écrit en TypeScript.

## Architecture
- **backend/** : API REST Express modulaire (auth, OCR, listings, emails). Prisma + PostgreSQL, JWT, géocodage Google, export Excel, envoi d'e-mails via SMTP.
- **mobile/** : app Expo (TypeScript) avec React Navigation, Zustand, appels API via Axios, écrans pour auth, création de listing par OCR, optimisation de tournée, affichage cartographique et envoi d'e-mail.
- **prisma/** : schéma et migration initiale PostgreSQL.

Configurez les variables d'environnement (`JWT_SECRET`, `DATABASE_URL`, `GOOGLE_VISION_KEY`, `GOOGLE_MAPS_KEY`, `SMTP_URL`, etc.) avant de démarrer.
