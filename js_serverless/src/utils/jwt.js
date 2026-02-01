import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN || "1h"; // default 1 hour token

// Fail fast if secret is missing
if (!secret) {
  console.error("❌ JWT_SECRET is not set! Please set it in your environment variables.");
  process.exit(1); // stop the app immediately
}

/**
 * Generate a JWT token for a user
 */
export function generateToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    secret,
    { expiresIn },
  );
}

/**
 * Verify a JWT token and return the payload
 */
export function verifyToken(token) {
  return jwt.verify(token, secret);
}
