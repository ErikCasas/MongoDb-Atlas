const express = require("express");
const route = require("./routes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/api", route);

module.exports = app;
