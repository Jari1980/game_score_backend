import { pool } from "./db.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

//see superadmin.env for template
const SUPERADMIN_USERNAME = process.env.SUPERADMIN_USERNAME;
const SUPERADMIN_PASSWORD = process.env.SUPERADMIN_PASSWORD;
const SUPERADMIN_FIRST_NAME = process.env.SUPERADMIN_FIRST_NAME;
const SUPERADMIN_LAST_NAME = process.env.SUPERADMIN_LAST_NAME;
const SUPERADMIN_ROLE = process.env.SUPERADMIN_ROLE || "admin";

export async function seedSuperAdmin() {
  try {
    const { rows } = await pool.query("SELECT COUNT(*) FROM users");
    const count = parseInt(rows[0].count, 10);

    if (count === 0) {
      const hashedPassword = await bcrypt.hash(SUPERADMIN_PASSWORD, 10);

      await pool.query(
        `INSERT INTO users (first_name, last_name, username, password_hashed, role)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          SUPERADMIN_FIRST_NAME,
          SUPERADMIN_LAST_NAME,
          SUPERADMIN_USERNAME,
          hashedPassword,
          SUPERADMIN_ROLE,
        ],
      );

      console.log("✅ SuperAdmin seeded successfully!");
    } else {
      console.log("ℹ️ Users table is not empty — SuperAdmin seeding skipped.");
    }
  } catch (err) {
    console.error("❌ Error seeding SuperAdmin:", err);
  }
}
