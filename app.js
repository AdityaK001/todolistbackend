const express = require('express');
const app = express();
const bodyparser =require("body-parser");
const _ = require("lodash");
var cors = require('cors');
const port = process.env.PORT || 8080;
const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());

mongoose.connect('mongodb+srv://admin-aditya:test123@cluster0.oc1pt0o.mongodb.net/?retryWrites=true&w=majority/todolist',()=>{
  console.log('mongoodb');
});


const contentschema = mongoose.Schema({content:String,status:String},{versionKey: false});

var Note = mongoose.model("Note",contentschema,'notes');



app.get('/', async (req,res)=>{ 
  
  var listitems=[];
 
  
  listitems= await Note.find();
  res.send({list:listitems});
  
});

app.post('/',(req,res)=>{
  
  const newnote = new Note(
    {content:req.body.content,
      status:"incomplete"});
   newnote.save();
});

app.patch('/',async(req,res)=>{
  changestatus = (req.body.status==='incomplete')? "complete":"incomplete";
  listitems= await Note.find({_id:req.body._id});
  
  await Note.findOneAndUpdate({_id:req.body._id},{status:changestatus});
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
