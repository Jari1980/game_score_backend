import { pool } from "../db/db.js";
import { PUBLIC_LEAGUE_TEAMS } from "../db/publicLeague.js";

//all teams in public league
export async function getAllPublicLeagueMatches() {
  const placeholders = PUBLIC_LEAGUE_TEAMS.map((_, i) => `$${i + 1}`).join(
    ", ",
  );

  const query = `
    SELECT entry_created, match_date, home_team, away_team, 
           home_team_score, away_team_score, winning_team
    FROM matches
    WHERE (home_team IN (${placeholders}) OR away_team IN (${placeholders}))
    ORDER BY match_date DESC
  `;

  const { rows } = await pool.query(query, [...PUBLIC_LEAGUE_TEAMS]);
  return rows.map(mapToMatchResponse);
}

//select teams in public league
export async function getPublicLeagueMatchesByTeams(teams) {
  const filterTeams = Array.isArray(teams)
    ? teams.filter((t) => PUBLIC_LEAGUE_TEAMS.includes(t))
    : [];

  if (filterTeams.length === 0) {
    throw new Error("No valid teams provided");
  }

  const placeholders = filterTeams.map((_, i) => `$${i + 1}`).join(", ");

  const query = `
    SELECT entry_created, match_date, home_team, away_team, 
           home_team_score, away_team_score, winning_team
    FROM matches
    WHERE (home_team IN (${placeholders}) OR away_team IN (${placeholders}))
    ORDER BY match_date DESC
  `;

  const { rows } = await pool.query(query, [...filterTeams]);
  return rows.map(mapToMatchResponse);
}

function mapToMatchResponse(row) {
  return {
    league: "public-league",
    createdAt: row.entry_created,
    matchDate: row.match_date,
    homeTeam: row.home_team,
    awayTeam: row.away_team,
    homeScore: row.home_team_score,
    awayScore: row.away_team_score,
    winningTeam: row.winning_team,
  };
}
