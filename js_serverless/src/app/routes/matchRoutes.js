import express from "express";
import {
  submitMatchScore,
  getAllMatches,
  findMatchesByTeam,
} from "../../services/matchService.js";
import validateMatch from "../../utils/validateMatch.js";

const router = express.Router();

//Below are two swagger components. GetAllMatches is used in "create new match",
//"Get all matches" and "find matches by team name", Component SubmitMatchScore is
//used in "create new match".

/**
 * @swagger
 * components:
 *   schemas:
 *     SubmitMatchScore:
 *       type: object
 *       required:
 *         - homeTeam
 *         - homeTeamScore
 *         - awayTeam
 *         - awayTeamScore
 *         - matchDate
 *       properties:
 *         homeTeam:
 *           type: string
 *           description: Name of the home team
 *         homeTeamScore:
 *           type: integer
 *           description: Score of the home team
 *         awayTeam:
 *           type: string
 *           description: Name of the away team
 *         awayTeamScore:
 *           type: integer
 *           description: Score of the away team
 *         matchDate:
 *           type: string
 *           format: date
 *           description: Date of the match
 *       example:
 *         homeTeam: Team Broccoli
 *         homeTeamScore: 5
 *         awayTeam: Team Apple
 *         awayTeamScore: 2
 *         matchDate: 2026-01-28
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     GetAllMatches:
 *       type: object
 *       required:
 *         - matchId
 *         - homeTeam
 *         - homeTeamScore
 *         - awayTeam
 *         - awayTeamScore
 *         - entryCreated
 *         - matchDate
 *         - winningTeam
 *       properties:
 *         matchId:
 *           type: integer
 *           format: int64
 *           description: Auto-generated match ID
 *         homeTeam:
 *           type: string
 *         homeTeamScore:
 *           type: integer
 *         awayTeam:
 *           type: string
 *         awayTeamScore:
 *           type: integer
 *         entryCreated:
 *           type: string
 *           format: date
 *         matchDate:
 *           type: string
 *           format: date
 *         winningTeam:
 *           type: string
 *       example:
 *         matchId: 5
 *         homeTeam: Team Broccoli
 *         homeTeamScore: 5
 *         awayTeam: Team Apple
 *         awayTeamScore: 2
 *         entryCreated: 2026-01-27
 *         matchDate: 2026-01-28
 *         winningTeam: Team Broccoli
 */

/**
 * @swagger
 * /api/v1/match:
 *   post:
 *     summary: Submit a new match score
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubmitMatchScore'
 *     responses:
 *       201:
 *         description: Match created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllMatches'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

// POST /api/v1/match -> create a new match
router.post("/", async (req, res) => {
  try {
    // Validating input
    validateMatch(req.body);
    const match = await submitMatchScore(req.body);
    res.status(201).json(match); // return created match
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/v1/match:
 *   get:
 *     summary: Get all matches
 *     responses:
 *       200:
 *         description: List of matches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GetAllMatches'
 */

// GET /api/v1/match -> get all matches
router.get("/", async (_req, res) => {
  try {
    const matches = await getAllMatches();
    res.json(matches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/v1/match/search:
 *   get:
 *     summary: Find matches by team name
 *     parameters:
 *       - in: query
 *         name: team
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the team to search for
 *     responses:
 *       200:
 *         description: List of matches containing the team
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GetAllMatches'
 *       400:
 *         description: Missing query parameter
 *       500:
 *         description: Server error
 */

// GET /api/v1/match/search?team=XYZ -> search by team
router.get("/search", async (req, res) => {
  try {
    const team = req.query.team;
    if (!team) return res.status(400).send("Missing team query parameter");

    const matches = await findMatchesByTeam(team);
    res.json(matches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
