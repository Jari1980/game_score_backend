import { pool } from "../db/db.js";

//Insert a new match
export async function submitMatchScore(request) {
  const { matchDate, homeTeam, awayTeam, homeTeamScore, awayTeamScore } =
    request;

  //if/else instead of ternary
  let winningTeam = "DRAW";
  if (homeTeamScore > awayTeamScore) {
    winningTeam = homeTeam;
  } else if (homeTeamScore < awayTeamScore) {
    winningTeam = awayTeam;
  }

  const query = `
    INSERT INTO matches (
      matchid,
      entry_created,
      match_date,
      home_team,
      away_team,
      home_team_score,
      away_team_score,
      winning_team
    )
    VALUES (DEFAULT, CURRENT_DATE, $1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [
    matchDate,
    homeTeam,
    awayTeam,
    homeTeamScore,
    awayTeamScore,
    winningTeam,
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
}

// Get all matches ordered by match_date
//Replaced * with all column heads, incase we want to customize
export async function getAllMatches() {
  const { rows } = await pool.query(`
    SELECT
    matchid,
    entry_created,
    match_date,
    home_team,
    away_team,
    home_team_score,
    away_team_score,
    winning_team
    
    FROM matches 
    ORDER BY match_date DESC
    `);
  return rows;
}

//Search all matches by team, yes this is fancy AI
export async function findMatchesByTeam(team) {
  const { rows } = await pool.query(
    `SELECT * FROM matches
     WHERE home_team ILIKE $1 OR away_team ILIKE $1
     ORDER BY match_date DESC`,
    [`%${team}%`], // For case insensitive
  );
  return rows;
}

// Get match score statistics
export async function getMatchStatistics() {
  const { rows } = await pool.query(`
    SELECT
      AVG(home_team_score) AS avg_home_score,
      AVG(away_team_score) AS avg_away_score,

      MIN(home_team_score) AS min_home_score,
      MAX(home_team_score) AS max_home_score,

      MIN(away_team_score) AS min_away_score,
      MAX(away_team_score) AS max_away_score
    FROM matches
  `);

  return rows[0];
}
