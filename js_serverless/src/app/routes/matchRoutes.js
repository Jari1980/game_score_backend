import express from "express";
import {
  submitMatchScore,
  getAllMatches,
  findMatchesByTeam,
} from "../../services/matchService.js";

const router = express.Router();

//TODO later: add req.body checks (fields are not null, strip non A-z 0-9 characters)
// POST /api/v1/match -> create a new match
router.post("/", async (req, res) => {
  try {
    const match = await submitMatchScore(req.body);
    res.status(201).json(match); // return created match
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

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