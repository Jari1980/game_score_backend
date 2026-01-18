import app from "./app/app.js";

// Start Express server locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


/*
//Initial rearrenged into folders
import express from "express";
import path from "path";

const app = express();
const port = 3000;

//not supported in older node versions
//I don't know which version, using latest
const __dirname = import.meta.dirname;

app.use(express.json()); //middleware that only parses json

app.get("/", (_req, res) => {
  res.json({
    message: "Hello World!",
    ok: true,
  });
});

//use `tests/post_test.sh` or Postman to test
app.post("/query", (req, res) => {
  console.log(req.body);
  res.send("POST request received\n");
});

//serve files in public folder
//can skip fe/be split if application simple enough
//will work for serverless too
app.use(express.static(path.join(__dirname, "public")));
app.get("/page", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
*/