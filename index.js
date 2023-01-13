const express = require("express");
const cors = require("cors");
const {user} = require("./routes/userroute.js");
const {connection} = require("./config/db.js");
const {note} = require("./routes/noteroute.js");
const {authenticate} = require("./middlewares/authenticate.js");
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/user",user);
app.use(authenticate);
app.use("/note",note);


app.listen(process.env.port,async()=>{
    await connection;
    console.log(`server is running on 3500`);
})