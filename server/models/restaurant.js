const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const RestaurantSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name field is required.']
	},
	address: {
		type: String,
		required: [true, 'Address field is required.']
	},
	Addtime: {
        type: Date,
        default: Date.now
    },
	Openhours: {
		type: String,
		required: [true, 'Openhours field is required.']
    },
    tele: {
        type: String,
        require: [true]
    },
    type: {
        type: String,
        required: [true]
    },
    menu: {
        type: String,
        required: [false]
    },
    thumb: {
        type: Number,
        require: [false]
    },
    time: {
        type: String,
        required: [false]
    },
    cost: {
        type: String,
        required: [false]
    },
    staple: {
        type: String,
        required: [false]
    },
    location: {
        type: String,
        required: [false]
    },
    Star:{
        type: String,
        require: [false]
    },
})

// Creating a table within database with the defined schema
const restaurant = mongoose.model('restaurant', RestaurantSchema)

// Exporting table for querying and mutating
module.exports = restaurant
 