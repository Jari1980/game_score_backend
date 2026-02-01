import express from "express";
import {
  getAllPublicLeagueMatches,
  getPublicLeagueMatchesByTeams,
} from "../../services/publicLeagueService.js";
import { PUBLIC_LEAGUE_TEAMS } from "../../db/publicLeague.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/public-league:
 *   get:
 *     tags: [Public League]
 *     summary: Get public league info
 *     responses:
 *       200:
 *         description: Public league basic info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: Public League
 *                 description:
 *                   type: string
 *                   example: Read-only public league with visible matches.
 *                 teams:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Team A", "Team B", "Team C"]
 */
router.get("/", (_req, res) => {
  res.json({
    name: "Public League",
    description: "Read-only public league with visible matches.",
    teams: PUBLIC_LEAGUE_TEAMS,
  });
});

/**
 * @swagger
 * /api/v1/public-league/matches:
 *   get:
 *     tags: [Public League]
 *     summary: Get ALL public league matches
 *     responses:
 *       200:
 *         description: All public league matches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   matchId:
 *                     type: integer
 *                     description: Match ID
 *                   homeTeam:
 *                     type: string
 *                     description: Name of the home team
 *                   awayTeam:
 *                     type: string
 *                     description: Name of the away team
 *                   homeTeamScore:
 *                     type: integer
 *                     description: Score of the home team
 *                   awayTeamScore:
 *                     type: integer
 *                     description: Score of the away team
 *                   matchDate:
 *                     type: string
 *                     format: date
 *                     description: Date of the match
 *                   entryCreated:
 *                     type: string
 *                     format: date
 *                     description: Date when the match was entered into the system
 *                   winningTeam:
 *                     type: string
 *                     description: Name of the winning team
 */
router.get("/matches", async (_req, res) => {
  try {
    const matches = await getAllPublicLeagueMatches();
    res.json(matches);
  } catch (err) {
    console.error("Error fetching all matches:", err);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});

/**
 * @swagger
 * /api/v1/public-league/matches/filter:
 *   post:
 *     tags: [Public League]
 *     summary: Filter public league matches by teams
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teams:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Team C", "Team D"]
 *     responses:
 *       200:
 *         description: Filtered matches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   matchId:
 *                     type: integer
 *                     description: Match ID
 *                   homeTeam:
 *                     type: string
 *                   awayTeam:
 *                     type: string
 *                   homeTeamScore:
 *                     type: integer
 *                   awayTeamScore:
 *                     type: integer
 *                   matchDate:
 *                     type: string
 *                     format: date
 *                   entryCreated:
 *                     type: string
 *                     format: date
 *                   winningTeam:
 *                     type: string
 *       400:
 *         description: Invalid teams provided
 *       500:
 *         description: Server error
 */
router.post("/matches/filter", async (req, res) => {
  try {
    const { teams } = req.body;

    const filterTeams = Array.isArray(teams)
      ? teams.map((t) => String(t).trim()).filter(Boolean)
      : [];

    const invalidTeams = filterTeams.filter(
      (t) => !PUBLIC_LEAGUE_TEAMS.includes(t),
    );

    if (invalidTeams.length > 0) {
      return res.status(400).json({
        error: "Invalid team(s)",
        invalidTeams,
        allowedTeams: PUBLIC_LEAGUE_TEAMS,
      });
    }

    if (filterTeams.length === 0) {
      return res.status(400).json({
        error: "No teams provided for filtering",
      });
    }

    const matches = await getPublicLeagueMatchesByTeams(filterTeams);
    res.json(matches);
  } catch (err) {
    console.error("Error filtering matches:", err);
    res.status(500).json({ error: "Failed to filter matches" });
  }
});

export default router;
