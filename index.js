const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
})

const userRoute = require('./routes/user');
const playlistRoute = require('./routes/playlist');

app.use("/app/user", userRoute);
app.use("/app/playlist", playlistRoute);

const port = process.env.PORT || 1500;
app.listen(port);