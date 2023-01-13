const jwt = require("jsonwebtoken");
require("dotenv").config();
const authenticate = (req,res,next)=>{
const token = req.headers.authorization;
//console.log(token);
   jwt.verify(token,process.env.key,(err,decode)=>{
    console.log(decode);
    const userID=decode.userID;
    req.body.userID=userID;
    if(decode){
        next();
    }else{
        res.send("please login first");
    }
   });
}

module.exports={authenticate};