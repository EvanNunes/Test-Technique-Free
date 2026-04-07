# Test Technique Free - Pilotage Réseau Mobile

## Stack technique

|  | Technologie |
|--------|-------------------------------|
| Backend | Symfony |
| Frontend | Next.js, TypeScript, Tailwind CSS |
| Base de données | PostgreSQL |

## Installation

Requis : les ports 80 , 3000 et 5432 libres 
```bash
docker compose up --build
```

Au démarrage, Docker va automatiquement :
1. Lancer PostgreSQL
2. Exécuter les migrations Doctrine
3. Charger les données de test
4. Démarrer le backend Symfony et le frontend Next.js

## Accès

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| API Backend | http://localhost:80 |

## Routes API

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/api/antennas` | Liste toutes les antennes avec leur dernière intervention |
| `GET` | `/api/antennas/{id}` | Retourne une antenne avec l'historique de toutes ses interventions |
| `POST` | `/api/intervention` | Crée une nouvelle intervention liée à une antenne |
| `PATCH` | `/api/intervention/{id}` | Clôture une intervention en cours |

## Tâches supplémentaires réalisées

- Mise en place d'un Docker Compose permettant de tester facilement l'application
- Toasts pour informer l'utilisateur sur les actions qu'il réalise (succès / erreur)
- Route et modal d'historique des interventions par antenne

## Utilisation de l'IA

- Utilisation de Claude comme outil d'assistance pour la réalisation du CSS
- 
