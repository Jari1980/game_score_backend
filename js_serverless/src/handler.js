import serverless from "serverless-http";
import app from "./app/app.js";

// Wrap Express app for serverless deployment
export const handler = serverless(app);