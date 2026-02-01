import express from "express";
import { pool } from "../../db/db.js";
import { verifyToken } from "../../utils/jwt.js";
import {
  listUsers,
  updateUserRole,
  deleteUser,
} from "../../services/userService.js";

const router = express.Router();

router.get("/users", async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return res.status(401).end();

  const token = auth.split(" ")[1];
  try {
    const payload = verifyToken(token);
    if (payload.role !== "admin")
      return res.status(403).json({ error: "Forbidden" });

    const users = await listUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/users/:id/role", async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return res.status(401).end();

  const token = auth.split(" ")[1];
  const { id } = req.params;
  const { role } = req.body;

  if (!["user", "admin"].includes(role))
    return res.status(400).json({ error: "Role must be 'user' or 'admin'" });

  try {
    const payload = verifyToken(token);
    if (payload.role !== "admin")
      return res.status(403).json({ error: "Forbidden" });
    if (payload.id === parseInt(id, 10))
      return res
        .status(400)
        .json({ error: "Admins cannot change their own role" });

    const user = await updateUserRole(id, role);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ message: "Role updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/users/:id", async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return res.status(401).end();

  const token = auth.split(" ")[1];
  const { id } = req.params;

  try {
    const payload = verifyToken(token);
    if (payload.role !== "admin")
      return res.status(403).json({ error: "Forbidden" });
    if (payload.id === parseInt(id, 10))
      return res.status(400).json({ error: "Admins cannot delete themselves" });

    const user = await deleteUser(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User deleted successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
