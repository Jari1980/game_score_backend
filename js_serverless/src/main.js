import app from "./app/app.js";
import { seedSuperAdmin } from "./db/seedSuperAdmin.js";

// Start Express server locally
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Seed SuperAdmin first
    await seedSuperAdmin();

    // Then start the Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1); // exit with error code
  }
}

// Run the server
startServer();
