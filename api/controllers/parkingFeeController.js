'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

exports.test = function(req, res) {
	mongoose.model('parkingfees',
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
          }));
	
	var parkingfees = mongoose.model('parkingfees');
	parkingfees.find({}, function(err, data) { 
		res.json(err, data, data.length); 
	});
};

exports.checkin = function(req, res) {
	var mall_id = request.params.mall_id;
	res.json("hello");
};

exports.checkprice = function(req, res) {
	var mall_id = request.params.mall_id;
};