const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const posts_routes = require("./routes/posts_routes");
const comments_routes = require("./routes/comments_routes");

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/posts", posts_routes);
app.use("/comments", comments_routes);

const initApp = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await mongoose.connect(process.env.DB_CONNECT);
      console.log("Database connected");
      resolve(app);
    } catch (error) {
      console.error("Database connection failed", error);
      reject(error);
    }
  });
};
module.exports = initApp;
