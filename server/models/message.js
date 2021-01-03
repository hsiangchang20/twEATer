const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const MessageSchema = new Schema({
	sender: {
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
	receiver: {
		type: String,
		required: [true, 'receiver field is required.']
	}
})

// Creating a table within database with the defined schema
const Message = mongoose.model('message', MessageSchema)

// Exporting table for querying and mutating
module.exports = Message 
