
import express from "express";
import helmet from "helmet";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());


// Example fetch function
export function getData() {
  fetch(`https://itunes.apple.com/search?term=titanic&media=movie&limit=1`)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}



// POST request handler
app.post("/api", (req, res) => {
  const search = req.body.search;
  const media = req.body.select;

  fetch(`https://itunes.apple.com/search?term=${search}&media=${media}&limit=5`)
    .then((response) => response.json())
    .then((result) => res.json(result))
    .catch((err) => {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});



// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
