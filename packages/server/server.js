const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

// Making the Database link
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
// console.log(DB);

// Connect to the database
mongoose.connect(DB).then(() => console.log("DB connection successfull"));

const app = require("./app");

const port = 3300;

app.listen(port, () => {
  console.log(`App running on port ${port} `);
});
