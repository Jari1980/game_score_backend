// Headers to allow cross-origin requests
export default function corsMiddleware(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // allow all origins
  res.header("Access-Control-Allow-Headers", "*"); // allow all headers
  next(); // continue to next middleware/route
}