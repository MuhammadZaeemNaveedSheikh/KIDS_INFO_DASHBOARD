const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

// set up express

const app = express();
app.use(express.json());
app.use(cors());




// set up routes

app.use("/users", require("./routes/users"));
app.use("/todos", require("./routes/todo"));
app.use(express.static(__dirname+"./public/"))

// set up mongoose

mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);


app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));