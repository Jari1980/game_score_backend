import { pool } from "./db.js";
import bcrypt from "bcryptjs";

const SUPERADMIN_USERNAME = "superadmin";
const SUPERADMIN_PASSWORD = "SuperAdmin123";
const SUPERADMIN_FIRST_NAME = "Super";
const SUPERADMIN_LAST_NAME = "Admin";
const SUPERADMIN_ROLE = "admin";

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
