import http from "http";
import app from "./app/app.js";
import { seedSuperAdmin } from "./db/seedSuperAdmin.js";
import { initWebSocket } from "./websocket.js";

// Start Express server locally
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Seed SuperAdmin first
    await seedSuperAdmin();

    /**
     * Create an HTTP server from Express app.
     * This is required for WebSocket support.
     */
    const server = http.createServer(app);

    // Attach WebSocket with path /ws
    initWebSocket(server);

    // Then start the HTTP + WebSocket server
    server.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1); // exit with error code
  }
}

// Run the server
startServer();
