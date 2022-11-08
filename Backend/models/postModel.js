var mongoose = require('mongoose')
const PostSchema = mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    body:{
        type:String,
        required: true,
    },
    autor:{
        type:String,
        required: true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('posts',PostSchema)