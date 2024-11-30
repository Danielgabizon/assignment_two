const express = require("express");
const app = express();
const dotevn = require("dotenv").config();

const mongoose = require("mongoose");
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log("Successfully connected to the database");
  } catch (err) {
    console.error("Error connecting to the database", err);
  }
};
connectToDatabase();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const posts_routes = require("./routes/posts_routes");
const comments_routes = require("./routes/comments_routes");
app.use("/posts", posts_routes);
app.use("/comments", comments_routes);

module.exports = app;
