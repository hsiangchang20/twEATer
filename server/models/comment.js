const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const CommentSchema = new Schema({
    _id: {
        type: String,
        required: [true, 'id is required.']
    },
    PostID: {
        type: String,
        require: [true, 'PostID is required']
    },
    body: {
		type: String,
		required: [true, 'Body field is required.']
    },
    Author: {
        type: String,
        required: [true, 'author is required']
    },
    authorID: {
        type: String,
        required: [true, 'author field is required.']
    },
    time: {
        type: Date,
        default: Date.now
    },
})

// Creating a table within database with the defined schema
const Comment = mongoose.model('comment', CommentSchema)

// Exporting table for querying and mutating
module.exports = Comment