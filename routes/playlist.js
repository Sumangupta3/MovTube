const express = require("express");
const app = express.Router();
const mongoose = require('mongoose');
const { User } = require("../models/user");


const mongoUri =
  "mongodb+srv://hatersluver:Gupta007@cluster0.paynn.mongodb.net/mobtube?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/", (req, res) => {
    User.findOneAndUpdate({ email: req.body.email },{movieData: req.body.movieData}, (err, user) => {
        if(err){
            res.send(err);
        }else{
            res.send({
                status: true,
                movieData: movieData
            });
        }
      });
});

module.exports = app;
