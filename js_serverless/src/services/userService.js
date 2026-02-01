import { pool } from "../db/db.js";

/**
 * Find a user by username
 */
export async function findUserByUsername(username) {
  const { rows } = await pool.query(
    "SELECT id, username, password_hashed, role FROM users WHERE username=$1",
    [username],
  );
  return rows[0] || null;
}

/**
 * Find a user by id
 */
export async function findUserById(id) {
  const { rows } = await pool.query(
    "SELECT id, username, first_name, last_name, role FROM users WHERE id=$1",
    [id],
  );
  return rows[0] || null;
}

/**
 * Create a new user
 */
export async function createUser(
  firstName,
  lastName,
  username,
  password_hashed,
) {
  const { rows } = await pool.query(
    `INSERT INTO users (first_name, last_name, username, password_hashed)
     VALUES ($1,$2,$3,$4)
     RETURNING id, username, role`,
    [firstName, lastName, username, password_hashed],
  );
  return rows[0];
}

/**
 * List all users
 */
export async function listUsers() {
  const { rows } = await pool.query(
    "SELECT id, first_name, last_name, username, role, entry_created FROM users ORDER BY id",
  );
  return rows;
}

/**
 * Update a user's role
 */
export async function updateUserRole(id, role) {
  const { rows } = await pool.query(
    "UPDATE users SET role=$1 WHERE id=$2 RETURNING id, username, role",
    [role, id],
  );
  return rows[0] || null;
}

/**
 * Delete a user
 */
export async function deleteUser(id) {
  const { rows } = await pool.query(
    "DELETE FROM users WHERE id=$1 RETURNING id, username",
    [id],
  );
  return rows[0] || null;
}
