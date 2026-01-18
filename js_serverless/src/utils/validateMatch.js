export function validateMatch(match) {
  if (!match.matchDate || !match.homeTeam || !match.awayTeam) {
    throw new Error("Missing required fields");
  }
  if (typeof match.homeTeamScore !== "number" || typeof match.awayTeamScore !== "number") {
    throw new Error("Scores must be numbers");
  }
  return true;
}