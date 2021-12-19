const express = require("express");
const app = express.Router();
const mongoose = require("mongoose");
const { User } = require("../models/user");

const mongoUri =
  "mongodb+srv://hatersluver:Gupta007@cluster0.paynn.mongodb.net/mobtube?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/signup/", (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    movieData: [],
  });

  user.save((err, doc) => {
    if (err) {
      res.status(400).send({
        result: false,
        message: "This Email is already taken",
      });
    } else {
      res.status(200).send({
        result: true,
        email: doc.email,
        movieData: doc.movieData,
        uid: doc._id,
      });
    }
  });
});

app.post("/login/", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err;
    else if (!user)
      res.json({
        result: false,
        message: "User not found",
      });
    else {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) {
          throw err;
        } else if (!isMatch) {
          res.status(400).json({
            result: false,
            message: "Invalid Criteria",
          });
        } else
          user.generateToken((err, user) => {
            if (err) {
              res.status(400).send(err);
            } else {
              res.cookie("auth", user.token).send({
                result: true,
                email: user.email,
                movieData: user.movieData,
                uid: user._id,
              });
            }
          });
      });
    }
  });
});

module.exports = app;
