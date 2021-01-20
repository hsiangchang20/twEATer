const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const UserSchema = new Schema({
    _id: {
        type: String,
        required: [true, 'id is required.']
    },
    fruit: {
		type: Number,
		required: [true, 'fruit field is required.']
    },
    name: {
        type: String,
        required: [true, 'name field is required.']
    },
    email: {
        type: String,
        required: [true, 'email is required.']
    },
    password: {
        type: String,
        required: [true, 'password is required.']
    },
    Like:{
        type: [String]
    }
})

// Creating a table within database with the defined schema
const User = mongoose.model('users', UserSchema)

// Exporting table for querying and mutating
module.exports = User