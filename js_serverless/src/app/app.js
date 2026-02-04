import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import corsMiddleware from "./middleware/cors.js";
import matchRoutes from "./routes/matchRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import publicLeagueRoutes from "./routes/publicLeagueRoutes.js";

import swaggerJsDoc from "swagger-jsdoc";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Game Score API",
      version: "1.0.0",
      description: "Serverless JS API for learning purpose",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/app/routes/*.js"],
};
const specs = swaggerJsDoc(options);

const app = express();

// __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json()); // parse JSON request bodies
app.use(corsMiddleware); // allow cross-origin requests

// Root route - JSON message
app.get("/", (_req, res) => {
  res.send(`
    <h1>Welcome to Match App!</h1>
    <p>This page will be reworked</p>
    <p>API endpoint: <a href="/api/v1/match">/api/v1/match</a></p>
    <p>OpenAPI spec: <a href="/openapi.json">/openapi.json</a></p>
    <p>index.html: <a href="/page">/page</a></p>
    <p>Use the API to submit or query match scores.</p>
  `);
});

// API routes
//public league, hard-coded teams
app.use("/api/v1/public-league", publicLeagueRoutes);

// Match endpoints
app.use("/api/v1/match", matchRoutes);

//Auth endpoints (register, login, me)
app.use("/api/v1/auth", authRoutes);

// Admin endpoints (list users, future role management)
app.use("/api/v1/admin", adminRoutes);

//Swagger
app.get("/openapi.json", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(specs);
});

// Serve static files from js_serverless/public
app.use(express.static(path.resolve(__dirname, "../../public")));

// /page route serves index.html
app.get("/page", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "../../public/index.html"));
});

export default app;
