import { broadcastNewMatch } from "../../websocket.js";
import express from "express";
import {
  submitMatchScore,
  getAllMatches,
  findMatchesByTeam,
} from "../../services/matchService.js";
import validateMatch from "../../utils/validateMatch.js";
import { verifyToken } from "../../utils/jwt.js";

const router = express.Router();

/**
 * Middleware to verify token and optionally check role
 */
function auth(requiredRole) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const payload = verifyToken(token);

      // Check role if required
      if (requiredRole && payload.role !== requiredRole) {
        return res.status(403).json({ error: "Forbidden" });
      }

      // Attach payload to request for downstream use
      req.user = payload;
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
}

/**
 * @swagger
 * /api/v1/match:
 *   post:
 *     tags: [Match] 
 *     summary: Submit a new match score (admin only)
 *     description: > 
 *       Requires a valid JWT with role `admin`.
 *       When a match is successfully created, a **WebSocket notification** is broadcast
 *       to all connected clients on `/ws`.
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       403:
 *         description: Forbidden (not an admin)
 */

// POST /api/v1/match -> create a new match
// Only admins can add matches
router.post("/", auth("admin"), async (req, res) => {
  try {
    // Validating input
    validateMatch(req.body);
    const match = await submitMatchScore(req.body);

    //Notify all connected users instantly
    broadcastNewMatch(match);

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
 *     tags: [Match] 
 *     summary: Get all matches
 *     description: Any authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of matches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GetAllMatches'
 *       401:
 *         description: Unauthorized
 */

// GET /api/v1/match -> get all matches
// Any user logged in
router.get("/", auth(), async (_req, res) => {
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
 *     tags: [Match] 
 *     summary: Find matches by team name
 *     description: Any authenticated user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: team
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of matches
 *       401:
 *         description: Unauthorized
 */

// GET /api/v1/match/search?team=XYZ -> search by team
// Any user logged in
router.get("/search", auth(), async (req, res) => {
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
