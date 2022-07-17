const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config.env" });

app.use(cors());
app.use(cookieParser());
// whatever comes in req.body is in json format
app.use(express.json());

// import routes
app.use(require("./routes/register"));
app.use(require("./routes/login"));
app.use(require("./routes/userList"));

const bookRouter = require("./routes/books");
app.use("/books", bookRouter);

// home page of server
app.get('/', (req, res) => {
    res.send("Haha Vodox");
});

const port = process.env.PORT || 5000;

// connecting to database
mongoose.connect(process.env.ATLAS_URI, {dbName: "BookFlix", useNewUrlParser: true, useUnifiedTopology: true})
  .then( ()=> {
    console.log("Successfully connected to MongoDB.")
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });