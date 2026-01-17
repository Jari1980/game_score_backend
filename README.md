# <img src="https://raw.githubusercontent.com/k10xp/game_score_frontend/refs/heads/main/public/sportz-scores-logo.svg" alt="Project logo" width="50"> # SomeName Inc. Game Score (backend)

Fullstack web application (clean frontend backend split) to log sports game results. Design document at [frontend repo](https://github.com/k10xp/game_score_frontend/blob/main/design/base.md).

User can

- enter a game score (date, home team, away team, final score)
- view all game score (winning team highlight in green, losing team in red)

## Repo structure

- java_backend: Java + Spring Boot

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
