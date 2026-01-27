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