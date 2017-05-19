'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParkingSchema = new Schema({
	id: {
		type: Number,
		require: true,
		unique: true,
	},
	name: {
		type: String,
		require: true,
		unique: true,
	},
	rate: {
		type: [RateSchema],
		require: true,
	},
	pricingPolicy: {
		type: Number,
	}
})

var RateSchema = new Schema({
	hour: Number,
	fee: Number,
})

module.exports = mongoose.model('ParkingFee', ParkingSchema);