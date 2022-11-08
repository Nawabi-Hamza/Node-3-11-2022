var express = require("express")
const { ObjectId } = require("mongodb")
var mongoose = require("mongoose")
var url = 'mongodb://localhost:27017/Mongo'
const postsModel = require('./models/postModel')
var app = express()
// it let us to recive data from browser it So importent for recieving data from browset
app.use(express.json())
mongoose.connect(url)

app.get('/',(req,res)=>{
    res.send("this is home page")
})

// create single post
app.post('/post',async(req,res)=>{
    const {title, body , autor} = req.body;
    try{
        const newPosts = await postsModel.create({title, body, autor})
        res.status(200).json(newPosts)
    }catch(error){
        res.status(400).json({error: error.message})
    }
})
// show all posts
app.get('/posts',async (req,res)=>{
    var po = {title:"this is title"}
    const allPosts = await postsModel.find().sort({createdAt:-1})
    res.status(200).json(allPosts) 
})
// show single data
app.get('/post/:id',async (req,res)=>{
    var postID = req.params.id;
    var po = {title:"this is title"}
    // const apost = await postsModel.find({_id:ObjectId(postID)})
    if(!mongoose.Types.ObjectId.isValid(postID)){
        return res.status(404).json({error:"Indvalid Post Id"})
    }
    const apost = await postsModel.findById(postID)
    if(!apost){
        return res.status(404).json({error:"post not found "})
    }
         res.status(200).json(apost) 
})
// update a data
app.patch('/post/:id',async (req,res)=>{
    var postID = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(postID)){
        return res.status(404).json({error:"Indvalid Post Id"})
    } 
    const apost = await postsModel.findByIdAndUpdate({_id:postID},{...req.body})
    if(!apost){
        return res.status(404).json({error:"post not update "})
    }
    res.status(200).json(apost)
})
// delete a data
app.delete('/post/:id',async (req,res)=>{
    var postID = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(postID)){
        return res.status(404).json({error:"Indvalid Post Id"})
    } 
    const apost = await postsModel.findByIdAndDelete({_id:postID},{...req.body})
    if(!apost){
        return res.status(404).json({error:"post not update "})
    }
    res.status(200).json(apost)
})

app.listen(220,()=>{
    console.log("Backend Server Is on 2000 port")
})