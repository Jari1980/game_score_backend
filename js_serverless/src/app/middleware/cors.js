// Headers to allow cross-origin requests
export default function corsMiddleware(req, res, next) {

  //Development allow all Origins and "GET, POST, OPTIONS" headers
  //Production allow Origin from .env CORS_ORIGINS and "GET, POST, OPTIONS" headers
  
  res.setHeader(
    "Access-Control-Allow-Origin",
    process.env.CORS_ORIGIN
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS"
  )

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  
  next(); // continue to next middleware/route
}