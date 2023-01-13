const express = require("express");
const cors = require("cors");
const {user} = require("./routes/userroute.js");
const {connection} = require("./config/db.js");
const {note} = require("./routes/noteroute.js");
const {authenticate} = require("./middlewares/authenticate.js");
require('dotenv').config();
const app = express();
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
//app.use(cors({origin:'*'}));
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