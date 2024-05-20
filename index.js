const express = require("express");
const port = 5000;
const mongoose = require("mongoose");
const accountRouter = require("./routes/accountRouter");

const app = express();

const connect = mongoose.connect(
  "mongodb+srv://ductaikhua:ductaikhua@cluster0.amqjyng.mongodb.net/Cramata?retryWrites=true&w=majority"
);
connect.then(
  (db) => {
    console.log("Database connected correctly to server");
  },
  (err) => {
    console.log(err);
  }
);

app.use(express.json());

app.use("/auth", accountRouter);

app.listen(port, () => {
  console.log("Server is running.");
});
