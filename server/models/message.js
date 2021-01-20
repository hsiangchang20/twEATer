const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const MessageSchema = new Schema({
	_id:{
		type: String,
		required: [true, 'ID field is required.']
	},
	author: {
		type: String,
		required: [true, 'Name field is required.']
	},
	body: {
		type: String,
		required: [true, 'Body field is required.']
	},
	time: {
        type: Date,
        default: Date.now
	},
	restaurant: {
		type: String,
		required: [true, 'Restaurant is required'] 
	},
	date: {
		type: String,
		required: [true, 'date is required']
	},
	follower: {
		type: [String] 
	},
	followerName: {
		type: [String]
	},
	limit: {
		type: Number,
		required: [true]
	}
})

// Creating a table within database with the defined schema
const Message = mongoose.model('message', MessageSchema)

// Exporting table for querying and mutating
module.exports = Message 
