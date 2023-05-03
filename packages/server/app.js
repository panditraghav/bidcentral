const express = require("express");
const cors = require("cors");
const app = express();

const userRouter = require("./routes/userRoutes");
app.use(cors());
app.use(express.json());
// Define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.use("/api/users", userRouter);

module.exports = app;
