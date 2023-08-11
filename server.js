const express = require('express');
const autheticate = require('./middleware/authentication');
const app = express();
require("dotenv").config();
const authRoute = require("./routes/auth");
const movieRoute = require("./routes/movie");
const changeRoute = require("./routes/account");
require("./config/db");
app.use(express.json())


app.use("/movies", autheticate, movieRoute);
app.use("/user", autheticate, changeRoute);
app.use("/auth", authRoute);

app.get("/", (req, res) => {
    res.send({ msg: "yes server is running" })
})


app.listen(process.env.PORT, () => {
    console.log(`server running on ${process.env.PORT} port`)
})