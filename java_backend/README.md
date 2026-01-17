# <img src="https://raw.githubusercontent.com/k10xp/game_score_frontend/refs/heads/main/public/sportz-scores-logo.svg" alt="Project logo" width="50"> # SomeName Inc. Game Score (backend)

Fullstack web application (clean frontend backend split) to log sports game results. Design document at [frontend repo](https://github.com/k10xp/game_score_frontend/blob/main/design/base.md).

User can

- enter a game score (date, home team, away team, final score)
- view all game score (winning team highlight in green, losing team in red)

## Backend Design

Backend is a REST API, created with Java Spring connecting to either MySQL or PostgreSQL.

Project uses one entity, Match which is given table name "matches" in database.

Controller have the following endpoints:

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

MatchRepository extends JpaRepository and all logic in MatchService is done with object relational mapping using Jpa. Data transfer objects (DTO's) are used to pass data.

## Instructions

Backend is build with Java and application is configured to run with either MySQL or PostgreSQL, this can be toggled in application.properties file.

Username and password need to be set as environment variable for either MySQL or PostgreSQL, this can be done by

> "Run -> Edit Configuration -> Select SportApplication and add local credentials for MySQL or PostgreSQL

<img width="889" height="642" alt="image" src="https://github.com/user-attachments/assets/0974c472-9acd-4b10-bf61-5bac4efc3113" />

Configuration done is with default ports and the application will run on local port 8080, connecting to either MySQL on 3306 or PostgreSQL 5432. If running MySQL schema "game_score" with table "matches" will be populated when the application starts, for PostgreSQL the scema "game_score" needs to be manually created before start.

The project is built using Lombok in order to skip boilerplate code. A common first run issue using Lombok is that "Processor path" is checked by default in Annotation Processors, while the "Obtain processors from project classpath" should be checked. This can be verified by

> "File" -> "Settings" -> "Build, Execution, Deployment" -> "Compiler" -> "Annotation Processors"

<img width="1229" height="559" alt="image" src="https://github.com/user-attachments/assets/5d27b21c-0ded-4f46-8830-cfc993ecf43b" />
