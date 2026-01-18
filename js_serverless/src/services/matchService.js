import { pool } from "../db/db.js";


//Insert a new match
export async function submitMatchScore(request) {
  const { matchDate, homeTeam, awayTeam, homeTeamScore, awayTeamScore } = request;

  const winningTeam =
    homeTeamScore > awayTeamScore
      ? homeTeam
      : awayTeamScore > homeTeamScore
      ? awayTeam
      : null;

  const query = `
    INSERT INTO matches (
      entry_created,
      match_date,
      home_team,
      away_team,
      home_team_score,
      away_team_score,
      winning_team
    )
    VALUES (CURRENT_DATE, $1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [matchDate, homeTeam, awayTeam, homeTeamScore, awayTeamScore, winningTeam];

  const { rows } = await pool.query(query, values);
  return rows[0];
}

// Get all matches ordered by match_date
export async function getAllMatches() {
  const { rows } = await pool.query("SELECT * FROM matches ORDER BY match_date DESC");
  return rows;
}


//Search all matches by team
export async function findMatchesByTeam(team) {
  const { rows } = await pool.query(
    `SELECT * FROM matches
     WHERE home_team ILIKE $1 OR away_team ILIKE $1
     ORDER BY match_date DESC`,
    [`%${team}%`] // For case insensitive
  );
  return rows;
}