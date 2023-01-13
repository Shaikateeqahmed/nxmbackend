const express = require("express");
const note = express.Router();
const {NoteModel} = require("../models/notemodel.js");
note.get("/",async(req,res)=>{
  try{
    const note = await NoteModel.find();
    res.json(note);
  }catch(err){console.log(err)}
})
note.post("/create",async(req,res)=>{
    const data = req.body;
    try{
      const note = new NoteModel(data);
      await note.save();
     // res.send("note added to db");
     res.json("note added to db");
    }catch(err){console.log(err)}
  })
note.patch("/update/:id",async(req,res)=>{
   try{
    const ID = req.params.id;
    const payload = req.body;
    const note = await NoteModel.findOne({_id:ID});
    const userID_in_note=note.userID;
    const userID_in_req= req.body.userID;
    if(userID_in_note!=userID_in_req){
      res.json("You are not authorised");
    }else{
      await NoteModel.findByIdAndUpdate({_id:ID},payload);
      res.json(`note of a ID ${ID} is updated`);
    }
   
   }catch(err){console.log(err)};
})

note.delete("/delete/:id",async(req,res)=>{
    try{
     const ID = req.params.id;
     const note = await NoteModel.findOne({_id:ID});
     const userID_in_note=note.userID;
     const userID_in_req= req.body.userID;
     if(userID_in_note!=userID_in_req){
       res.json("You are not authorised");
     }else{
      await NoteModel.findByIdAndDelete({_id:ID});
      res.json(`note of a ID ${ID} is deleted`);
     }
     
    }catch(err){console.log(err)};
 })
module.exports={note};