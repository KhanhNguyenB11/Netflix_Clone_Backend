//Config
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const users = require("./routes/users");
const movies = require("./routes/movies");
const genre = require("./routes/genres");
const PORT = process.env.PORT;
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors("*"));


//routes
app.use("/auth", auth);
app.use("/users", users);
app.use("/movies", movies);
app.use("/genres", genre);


//Run if dbconnected
mongoose
  .connect(process.env.Mongo_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App running on ${PORT}`);
    });
    console.log("Connect DB sucessfully");
  })
  .catch((error) => console.log(error));
