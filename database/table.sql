-- ignore if using hosted provider
CREATE DATABASE game_score;

CREATE TABLE IF NOT EXISTS matches (
    matchid BIGINT PRIMARY KEY, -- auto increment, see sequence.sql
    entry_created DATE DEFAULT CURRENT_DATE,
    match_date DATE NOT NULL,
    home_team VARCHAR(255) NOT NULL,
    away_team VARCHAR(255) NOT NULL,
    home_team_score INT,
    away_team_score INT,
    winning_team VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hashed VARCHAR(255) NOT NULL,
    role VARCHAR(10) NOT NULL DEFAULT 'user'
        CHECK (role IN ('user', 'admin')),
    entry_created DATE DEFAULT CURRENT_DATE
);