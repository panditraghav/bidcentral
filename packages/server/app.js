const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const userRouter = require("./routes/userRoutes");
const assetRouter = require("./routes/assetRoutes");

app.use(cors());
app.use(express.json());

// Development loggin
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.use("/api/users", userRouter);
app.use("/api/assets", assetRouter);

module.exports = app;
