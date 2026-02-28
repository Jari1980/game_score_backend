import { WebSocketServer } from "ws";

//Set of connected WebSocket clients
const clients = new Set();

//WebSocket server instance
let wss;

//Initialize WebSocket server
export function initWebSocket(server) {
  // Attach WebSocket server to existing HTTP server using separate path
  wss = new WebSocketServer({ server, path: "/ws" });

  wss.on("connection", (ws) => {
    console.log("New WebSocket client connected");
    // Add client to active connections
    clients.add(ws);
    // Remove client when connection closes
    ws.on("close", () => {
      console.log("WebSocket client disconnected");
      clients.delete(ws);
    });
    // Optional: handle incoming messages from client
    ws.on("message", (message) => {
      console.log("Received message from client:", message.toString());
    });
  });
}

//Broadcast a new match to all connected clients
export function broadcastNewMatch(match) {
  const message = JSON.stringify({
    type: "NEW_MATCH",
    payload: match,
  });

  for (const client of clients) {
    // 1 = OPEN state
    if (client.readyState === 1) {
      client.send(message);
    }
  }
}