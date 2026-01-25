import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import corsMiddleware from "./middleware/cors.js";
import matchRoutes from "./routes/matchRoutes.js";

const app = express();

// __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json()); // parse JSON request bodies
app.use(corsMiddleware); // allow cross-origin requests

// Root route - JSON message
app.get("/", (_req, res) => {
  res.json({
    message:
      "Welcome to Match App! Visit /page for the UI or /api/v1/match for API",
  });
});

// API routes
app.use("/api/v1/match", matchRoutes);

// Serve static files from js_serverless/public
app.use(express.static(path.resolve(__dirname, "../../public")));

// /page route serves index.html
app.get("/page", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "../../public/index.html"));
});

export default app;
