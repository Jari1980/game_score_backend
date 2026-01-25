# Serverless version

Build locally with non-serverless (express). Copy functions with minor adjustments depending on serverless provider.

## Setup

1. Install Node https://nodejs.org/en
2. Install PostgreSQL<br>
   Create the database:<br>
   `CREATE DATABASE game_score;`<br>
   Create the matches table:<br>
   `CREATE TABLE IF NOT EXISTS game_score.matches (`<br>
   `  matchid BIGINT PRIMARY KEY,`<br>
   `  entry_created DATE DEFAULT CURRENT_DATE,`<br>
   `  match_date DATE NOT NULL,`<br>
   `  home_team VARCHAR(255) NOT NULL,`<br>
   `  away_team VARCHAR(255) NOT NULL,`<br>
   `  home_team_score INT,`<br>
   `  away_team_score INT,`<br>
   `  winning_team VARCHAR(255)`<br>
   `);`<br>
3. Create a ".env" file under js_serverless, this should also be in gitignore.<br>
   In .env you need a connection string to PostgreSQL<br>
   \# PostgreSQL connection string<br>
   \# Format: `postgres://USER:PASSWORD@HOST:PORT/DATABASE`<br>
   Local with default PostgreSQL port should be something like:<br>
   `DATABASE_URL=postgres://{your username}:{your password}@localhost5432/game_score`<br>
   \# Optional: local server port (used only for local Express dev)
   `PORT=3000<br>`<br>
   \# Development Environment<br>
   `NODE_ENV=development`<br>
   `CORS_ORIGIN=\*`<br>
   \# Production Environment - Not yet tested, the idea is that we can toggle between dev and prod in this file<br>
   \# NODE_ENV=production<br>
   \# CORS_ORIGINS=?<br>
4. run server with `cd js_serverless && npm run dev`

## Tests

Manual tests for now

Options

1. command line (curl is installed by default on all OS) `sh ./js_serverless/tests/post_test.sh`
2. a GUI like postman or thunder client
   - https://www.postman.com/downloads/
   - https://www.thunderclient.com/
