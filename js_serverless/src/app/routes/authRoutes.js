import express from "express";
import { pool } from "../../db/db.js";
import { hashPassword, verifyPassword } from "../../utils/authUtils.js";
import { generateToken, verifyToken } from "../../utils/jwt.js";
import {
  findUserByUsername,
  findUserById,
  createUser,
} from "../../services/userService.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { firstName, lastName, username, password } = req.body;
  if (!firstName || !lastName || !username || !password)
    return res.status(400).json({ error: "All fields required" });

  try {
    const existing = await findUserByUsername(username);
    if (existing)
      return res.status(400).json({ error: "Username already taken" });

    const password_hashed = await hashPassword(password);
    const user = await createUser(
      firstName,
      lastName,
      username,
      password_hashed,
    );
    const token = generateToken(user);

    res.status(201).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsername(username);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await verifyPassword(password, user.password_hashed);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken(user);

    res.json({
      token,
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/me", async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return res.status(401).end();

  const token = auth.split(" ")[1];

  try {
    const payload = verifyToken(token);
    const user = await findUserById(payload.id);
    if (!user) return res.status(404).end();

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
});

export default router;
