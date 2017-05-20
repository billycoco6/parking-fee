'use strict';

var mongoose = require('mongoose'),
	ParkingFee = mongoose.model('ParkingFee',
					new mongoose.Schema({
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
	ParkingFee.find({}).exec(function(err, result) {
      if (!err) {
        // handle result
        res.json("no err");
      } else {
        // error handling
        res.json("err");
      };
    });
};

exports.checkin = function(req, res) {
	var mall_id = request.params.mall_id;
	res.json("hello");
};

exports.checkprice = function(req, res) {
	var mall_id = request.params.mall_id;
};