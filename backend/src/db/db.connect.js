const mongoose = require("mongoose");

const mongoUri = process.env.MONGODB;
if (!mongoUri) {
  console.log("Error: no mongo uri connection string set");
  process.exit(1);
}

const dbConnect = async () => {
  await mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("connected to mongo db");
    })
    .catch((error) => {
      console.log("Could not connect to mongo db ", error);
      process.exit(1);
    });
};

module.exports = {
  dbConnect,
};
