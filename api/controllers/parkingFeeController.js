'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ParkingFee = mongoose.model('ParkingFee',
					new Schema({
						mall_id: Number,
						mall_name: String,
						rounding_time: Number,
						fee_period: Number,
						long_hour_fee: Number,
						rate: [{
							duration: Number,
							cost: Number
						}]
					}), 'parkingfees');

exports.test = function(req, res) {
	ParkingFee.find({}, function(err, bookings) {
	async.each(parkings, parking, function(parking, next) {
		console.log(util.format('%s', parking.mall_name));
		}, function(err) {
			console.log('done');
		});
	});
};

exports.checkin = function(req, res) {
	var mall_id = request.params.mall_id;
	res.json("hello");
};

exports.checkprice = function(req, res) {
	var mall_id = request.params.mall_id;
};