# Serverless version

Build locally with non-serverless (express). Copy functions with minor adjustments depending on serverless provider.

## Setup

1. Install Node https://nodejs.org/en
2. Install PostgreSQL
   Create the database:
   CREATE DATABASE game_score;
   Create the matches table:
   CREATE TABLE IF NOT EXISTS game_score.matches (
   matchid BIGINT PRIMARY KEY,
   entry_created DATE DEFAULT CURRENT_DATE,
   match_date DATE NOT NULL,
   home_team VARCHAR(255) NOT NULL,
   away_team VARCHAR(255) NOT NULL,
   home_team_score INT,
   away_team_score INT,
   winning_team VARCHAR(255)
   );
3. Create a ".env" file under js_serverless, this should also be in gitignore.
   In .env you need a connection string to PostgreSQL
   # PostgreSQL connection string
   # Format: postgres://USER:PASSWORD@HOST:PORT/DATABASE
   Local with default PostgreSQL port should be something like:
   DATABASE_URL=postgres://{your username}:{your password}@localhost5432/game_score
   # Optional: local server port (used only for local Express dev)
   PORT=3000
   # Development Environment
   NODE_ENV=development
   CORS_ORIGIN=\*
   # Production Environment - Not yet tested, the idea is that we can toggle between dev and prod in this file
   # NODE_ENV=production
   # CORS_ORIGINS=?
4. run server with `cd js_serverless && npm run dev`

## Tests

Manual tests for now

Options

1. command line (curl is installed by default on all OS) `sh ./js_serverless/tests/post_test.sh`
2. a GUI like postman or thunder client
   - https://www.postman.com/downloads/
   - https://www.thunderclient.com/
