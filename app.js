//jshint esversion:6

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require("./routes/auth");

const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(authRoutes);

app.use((req, res) => {
  res.send("<h1>Welcome to my app</h1>");
});

mongoose
  .connect(
    "mongodb+srv://admin-babslaw:babalola1996@cluster0-hthp7.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(result => {
    console.log("Database connected");
    app.listen(3000);
  })
  .catch(err => console.log(err));
