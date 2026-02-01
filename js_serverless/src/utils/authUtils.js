import bcrypt from "bcryptjs";

/**
 * Hash a plain-text password before storing in DB
 */
export async function hashPassword(password) {
  return await bcrypt.hash(password, 12);
}

/**
 * Verify a plain-text password against hashed password from DB
 */
export async function verifyPassword(password, hashed) {
  return await bcrypt.compare(password, hashed);
}
