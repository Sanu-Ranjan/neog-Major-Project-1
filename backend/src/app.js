const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { dbConnect } = require("./db/db.connect");
const category = require("./routes/categories.router");
const product = require("./routes/product.router");
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

app.use("/api/v1/categories", category.router);
app.use("/api/v1/products", product.router);

const PORT = process.env.PORT || 3000;
(async () => {
  await dbConnect();

  app.listen(PORT, () => {
    console.log("Server listening on port : ", PORT);
  });
})();
