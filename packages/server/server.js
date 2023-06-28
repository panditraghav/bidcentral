const app = require("./app");
const http = require('http')

const server = http.createServer(app)

require("dotenv").config({ path: "./config.env" })
require('./socket').configureSocket(server)
const mongoose = require("mongoose");


// Making the Database link
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
// console.log(DB);

// Connect to the database
mongoose.connect(DB).then(() => console.log("DB connection successfull")).catch(err=> console.log(err));


const port = 3200;


server.listen(port, () => {
  console.log(`App running on port ${port} `);
});
