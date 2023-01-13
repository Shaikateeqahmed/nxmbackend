const express = require("express");
const cors = require("cors");
const {user} = require("./routes/userroute.js");
const {connection} = require("./config/db.js");
const {note} = require("./routes/noteroute.js");
//const {authenticate} = require("./middlewares/authenticate.js");
require('dotenv').config();
const app = express();
var corsOptions = {
    origin: 'http://example.com"https://puce-zealous-caiman.cyclic.app/"',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  console.log(cors);
app.use(cors({origin:'*'}));
app.use(express.json());
app.use("/user",user);
app.use(authenticate);
app.use("/note",note);
app.get("/",(req,res)=>{
    res.send("home page");
})

app.listen(process.env.port,async()=>{
    await connection;
    console.log(`server is running on 3500`);
})