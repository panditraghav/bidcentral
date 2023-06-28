const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

const userRouter = require("./routes/userRoutes");
const assetRouter = require("./routes/assetRoutes");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// app.set("view engine", "pug");
// app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Development loggin
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use("/api/users", userRouter);
app.use("/api/assets", assetRouter);
// app.use("/", viewRouter);


module.exports = app;
// Remove logs from the project.
