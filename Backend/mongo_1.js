var  express  = require('express')
var Mongo = require('mongodb').MongoClient
var { ObjectId } = require('mongodb')
var url = 'mongodb://localhost:27017'
var app = express()
var port = 369
//======================Make port for localhost in page================================
app.listen(port,()=>{
    console.log(port+" Port is Ready")
})
app.get('/',(req,res)=>{
    res.send("<center><h1>We are in Home page</h1></center>")
})
//======================Retriving Data by Arry Method=================================
app.get('/blogs',(req,res)=>{
    Mongo.connect(url,(err,db)=>{
        if(err) throw err;
        var dbo = db.db('SecondDay')
        dbo.collection("Blog").find({},{projection:{_id:0 ,name:1 ,age:1}}).toArray((err,result)=>{
            if(err)throw err;
            res.json(result)
            db.close()
        })
    })
})
//======================Retriving Data by ForEach Method==============================
app.get('/bblogs',(req,res)=>{
    Mongo.connect(url,(err,db)=>{
        if(err) throw err;
        var dbo = db.db('SecondDay')
        var posts =[]
        dbo.collection('Blog').find()
        .forEach(post => posts.push(post))
        .then(()=>{
            res.status(200).json(posts)
        })
    })
})
//======================Retriving Data by ForEach Method and pagenation==============================
app.get('/pageBlogs',(req,res)=>{
    Mongo.connect(url,(err,db)=>{
        if(err) throw err;
        var dbo = db.db('SecondDay')
        var posts =[] 
        const page = req.query.p || 0
        const postPerPage = 2
        dbo.collection('Blog').find().sort({name:-1}).skip(page*postPerPage).limit(postPerPage)
        .forEach(post => posts.push(post))
        .then(()=>{
            res.status(200).json(posts)
        })
        .catch(()=>{
            res.status(500).json({err:"something went wrong"})
        })
    })
})
//======================Retriving single document by findOne Method and pagenation==============================
app.get('/blogs/:id',(req,res)=>{
    Mongo.connect(url,(err,db)=>{
        if(err) throw err;
        var dbo = db.db('SecondDay')
        var myObj = {_id:ObjectId(req.params.id)}
        dbo.collection("Blog").findOne(myObj,(err,result)=>{
            if(err)throw err;
            res.json(result)
            db.close()
        })
    })
})
//======================Post data to data base ==============================
app.post('/blog',(req,res)=>{
    Mongo.connect(url,(err,db)=>{
        if(err)throw err;
        var dbo = db.db('SecondDay')
        // const obj= {
        //     title:"This is title",
        //     body:"this is the body of title"
        // }
        const objPostMan = req.params.body
        dbo.collection('Blog').insertOne(objPostMan,(err,result)=>{
            if(err)throw err;
            res.json(result)
            db.close()
        })
    })
})
//======================Delete data to data base ==============================
app.delete('/blog/:id',(req,res)=>{
    Mongo.connect(url,(err,db)=>{
        if(err)throw err;
        var dbo = db.db('SecondDay')
        const objPostMan = {_id: ObjectId(req.params.id)}
        dbo.collection('Blog').deleteOne(objPostMan,(err,result)=>{
            if(err)throw err;
            res.json(result)
            console.log("document deleted")
            db.close()
        })
    })
})
//======================Update data to data base ==============================
app.patch('/blog/:id',(req,res)=>{
    Mongo.connect(url,(err,db)=>{
        if(err)throw err;
        var dbo = db.db('SecondDay')

        var oldData = {_id:ObjectId(req.params.id)}
        var newData = {$set:{name:"Ghoooooooooooooooooolam"}}
        dbo.collection('Blog').updateOne(oldData,newData,(err,result)=>{
            if(err)throw err;
            res.json(result)
            console.log("document updated")
            db.close()
        })
    })
})
//======================Update data to data base ==============================
app.patch('/blog/:id',(req,res)=>{
   if(ObjectId.isValid(req.params.id)){
    Mongo.connect(url,(err,db)=>{
        if(err)throw err;
        var dbo = db.db('SecondDay')

        var oldData = {_id:ObjectId(req.params.id)}
        var newData = {$set:{name:"Ghoooooooooooooooooolam"}}
        dbo.collection('Blog').updateOne(oldData,newData,(err,result)=>{
            if(err)throw err;
            res.json(result)
            console.log("document updated")
            db.close()
        })
    })
   }
   else{
    res.json({error:"Invalid Data ....."})
   }
})
// post do not show data in url  
// get show the data in url