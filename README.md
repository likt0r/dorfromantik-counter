# Dorfromantik Counter (Duel)

Digitale Zählhilfe für das Brettspiel **Dorfromantik – Duell**.  
Diese Web-App bildet das bekannte Punkteblatt nach und ermöglicht das komfortable Erfassen von Punkten für zwei Spieler auf Desktop und Mobilgeräten. Ergebnisse werden lokal gespeichert, und eine Spielehistorie erleichtert das Wechseln zwischen Partien.

## Features
- Zweispaltiges Layout für zwei Spieler mit allen Wertungskategorien (Aufträge/Flags je Kategorie, Längste Strecke/Fluss, Gebiete, Sonderplättchen, Module).
- Automatische Zwischensummen und Gesamtsummen, manuelle Eingabe der Modul-Zwischensummen.
- Responsive Design, Touch/Nummern-Eingabe-freundlich.
- Lokale Speicherung der Partien (localStorage) und schnelle Auswahl über die Action-Bar.
- Docker- und GHCR-Workflow zum Bauen/Veröffentlichen des Images.

## Entwicklung
```bash
npm install
npm run dev
```
Die App läuft anschließend im Vite-Dev-Server (Standard: http://localhost:5173).

## Build & Docker
```bash
npm run build
docker build -t dorfromantik-counter .
```

## Hinweis / Warning
**Dieses Projekt (Code, Texte, Workflow) wurde vollständig durch eine KI erstellt.**  
Bitte prüfe Sicherheit, Genauigkeit und Lizenzkompatibilität eigenständig, bevor du es produktiv nutzt.
