const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const PostSchema = new Schema({
    _id: {
        type: String,
        required: [true, 'id is required.']
    },
    restaurant: {
        type: String,
        require: [true, 'restaurant is required']
    },
    body: {
		type: String,
		required: [true, 'Body field is required.']
    },
    photo: {
        type: String,
        required: [true, 'photo is required']
    },
    authorID: {
        type: String,
        required: [true, 'author field is required.']
    },
    thumb: {
        type: Number,  
        required: [true, 'thumb field is required.']
    }, 
    time: {
        type: Date,
        default: Date.now
    },
})

// Creating a table within database with the defined schema
const Post = mongoose.model('post', PostSchema)

// Exporting table for querying and mutating
module.exports = Post