# <img src="https://raw.githubusercontent.com/k10xp/game_score_frontend/refs/heads/main/public/sportz-scores-logo.svg" alt="Project logo" width="50"> SomeName Inc. Game Score (backend)

Fullstack web application (clean frontend backend split) to log sports game results. Design document at [frontend repo](https://github.com/k10xp/game_score_frontend/blob/main/design/base.md).

# Game Score Backend

Backend for a sports score tracking application.  
Users can view match results, search by team, see statistics and get real-time notification when match is added.  
Admins can submit match scores and manage users.

This repository contains two backend implementations:

- **js_serverless/** – Current backend (Node.js, Express, PostgreSQL)
- **java_backend/**  – Legacy backend (Java, Spring Boot, MySQL/PostgreSQL)

---

# Features

- Add match scores
- View all matches
- Aggregated statistics
- JWT authentication
- Admin user management
- WebSocket notifications for new matches

---

# Repository Structure

.<br>
├── js_serverless<br>
└── java_backend<br>

---

# JS Serverless Backend (Current)

Node.js + Express API with PostgreSQL.

## Install

```bash
cd js_serverless
npm install
```

# Database Setup (Local)

If you are running the backend locally, you need a PostgreSQL database. You can create it manually, for example using **pgAdmin**:

1. Create a database named `game_score`.
2. Create the required tables:

**matches** table:

- `matchid` BIGINT PRIMARY KEY  
- `entry_created` DATE DEFAULT CURRENT_DATE  
- `match_date` DATE NOT NULL  
- `home_team` VARCHAR(255) NOT NULL  
- `away_team` VARCHAR(255) NOT NULL  
- `home_team_score` INT  
- `away_team_score` INT  
- `winning_team` VARCHAR(255)  

**users** table:

- `id` SERIAL PRIMARY KEY  
- `first_name` VARCHAR(255) NOT NULL  
- `last_name` VARCHAR(255) NOT NULL  
- `username` VARCHAR(255) UNIQUE NOT NULL  
- `password_hashed` VARCHAR(255) NOT NULL  
- `role` VARCHAR(10) NOT NULL DEFAULT 'user' (`CHECK (role IN ('user','admin'))`)  
- `entry_created` DATE DEFAULT CURRENT_DATE  


# Environment Variables

Create a .env file in js_serverless root:
```
DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DATABASE

// Local development
PORT=3000
NODE_ENV=development
CORS_ORIGIN=*

# Production example (uncomment in production)
# NODE_ENV=production
# CORS_ORIGINS=https://yourdomain.com

# JWT configuration
JWT_SECRET=your_secret
JWT_EXPIRES_IN=1h

# Default super admin (auto-seeded if users table is empty)
SUPERADMIN_USERNAME=admin
SUPERADMIN_PASSWORD=password
SUPERADMIN_FIRST_NAME=Admin
SUPERADMIN_LAST_NAME=Admin
```
If the users table is empty, a super admin is automatically created on startup. Idea is to create a new user, promote it to admin and delete the superadmin.

# API Endpoints

## Auth
```http
POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/me
```

## Match
```http
POST /api/v1/match            (admin)
GET  /api/v1/match
GET  /api/v1/match/search?team=TeamA
GET  /api/v1/match/statistics
```
Example match request:
```json
{
  "matchDate": "2026-01-01",
  "homeTeam": "Team A",
  "awayTeam": "Team B",
  "homeTeamScore": 2,
  "awayTeamScore": 1
}
```
## Public League
The Public League contains matches for a predefined set of teams.  
These endpoints allow viewing all public league matches or filtering by specific teams.
```http
GET  /api/v1/public-league
GET  /api/v1/public-league/matches
POST /api/v1/public-league/matches/filter
```
## Admin
```http
GET    /api/v1/admin/users
PUT    /api/v1/admin/users/{id}/role
DELETE /api/v1/admin/users/{id}
```
## WebSocket
```http
GET /ws
```
## API Documentation

This backend provide a basic OpenAPI (Swagger) documentation:

- JSON spec available at: [`/openapi.json`](http://localhost:3000/openapi.json)  
- You can import it into **Swagger Editor** or **Postman** to explore the API interactively.  


# Legacy Java backend

User can

- enter a game score (date, home team, away team, final score)
- view all game score (winning team highlight in green, losing team in red)

Check README.md inside folder for install instructions.

## Endpoints

- POST /api/v1/match, Create match with body:

```json
{
  "matchDate": "",
  "homeTeam": "",
  "awayTeam": "",
  "homeTeamScore": 1,
  "awayTeamScore": 1
}
```

- GET /api/v1/match, Get all matches
- GET /api/v1/match/search?team=Team C, search all results for a team with Key "team" and value (here) "Team C"

## Contributions

All contributions and suggestions welcome. See how you can help in [CONTRIBUTING.md](.github/CONTRIBUTING.md)
