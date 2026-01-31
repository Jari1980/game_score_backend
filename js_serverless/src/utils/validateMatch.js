export default function validateMatch(match) {
  // Check required string fields
  if (!match.homeTeam || !match.awayTeam) {
    throw new Error("homeTeam and awayTeam are required");
  }

  // Check that string only have letters, numbers, spaces
  const stringFields = ["homeTeam", "awayTeam"];
  for (const field of stringFields) {
    if (!/^[A-Za-z0-9\s]+$/.test(match[field])) {
      throw new Error(`${field} contains invalid characters`);
    }
  }

  // Check that matchDate exists and is a valid date
  if (!match.matchDate || isNaN(new Date(match.matchDate).getTime())) {
    throw new Error("matchDate is required and must be a valid date");
  }

  // Check scores
  if (
    typeof match.homeTeamScore !== "number" ||
    typeof match.awayTeamScore !== "number"
  ) {
    throw new Error("Scores must be numbers");
  }

  return true;
}
