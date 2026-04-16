require("dotenv").config();
const { dbConnect } = require("./db/db.connect");
const { app } = require("./app");

const PORT = process.env.PORT || 3000;
(async () => {
  await dbConnect();

  app.listen(PORT, () => {
    console.log("Server listening on port : ", PORT);
  });
})();
