const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth.js");
const PostRoute = require("./routes/post.js");
const userRoute = require("./routes/user.js");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// local url -- mongodb://localhost:27017/blogDB
mongoose.connect(process.env.MONGO_URL, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Database is connected");
  }
});

app.use("/api/auth", authRoute);
app.use("/api/posts", PostRoute);
app.use("/api/user", userRoute);

app.listen(5000, function () {
  console.log("server is running...");
});
