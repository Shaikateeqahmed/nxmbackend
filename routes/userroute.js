const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/usermodel");
const user = express.Router();
require("dotenv").config();
user.get("/",(req,res)=>{
    res.send("user will be hear");
})

user.post("/register",async(req,res)=>{
    try{
        const {name,email,password,age} = req.body;
        console.log(req.body);
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                console.log(err);
            }else{
                const user = new UserModel({name,email,password:hash,age});
                await user.save();
               // res.send("User is added to db");
                res.json("User is added to db");
            }
        })
    }catch(err){console.log(err)}
})

user.post("/login",async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user =await UserModel.find({email});
        console.log(user);
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(err){
                    res.send("Invalid Crediantials");
                }else{
                const token = jwt.sign({userID:user[0]._id},process.env.key);
                //res.send(token);
                res.json(token);
                }
            })
        }
    }catch(err){console.log(err)};
})
module.exports={user};