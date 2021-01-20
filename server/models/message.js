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
		require: [true, 'Restaurant is required']
	},
	date: {
		type: String,
		require: [true, 'date is required']
	},
	follower: {
		type: [String] 
	},
	followerName: {
		type: [String]
	}
})

// Creating a table within database with the defined schema
const Message = mongoose.model('message', MessageSchema)

// Exporting table for querying and mutating
module.exports = Message 
