const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());

const ORIGIN = process.env.ORIGIN;
if (!ORIGIN) {
  console.log("Error : allowed ORIGIN not set");
  process.exit(1);
}
app.use(
  cors({
    origin: ORIGIN,
  }),
);

app.get("/", (req, res) => {
  res.send("Welcome to express server");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server listening on port : ", PORT);
});
