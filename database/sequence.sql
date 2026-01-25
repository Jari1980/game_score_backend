-- create sequence and set default
CREATE SEQUENCE IF NOT EXISTS matches_matchid_seq 
OWNED BY matches.matchid;

ALTER TABLE matches 
ALTER COLUMN matchid 
SET DEFAULT nextval('matches_matchid_seq');

-- count off
SELECT setval('matches_matchid_seq', 
COALESCE((SELECT MAX(matchid) + 1 FROM matches), 1));
