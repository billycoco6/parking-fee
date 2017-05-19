'use strict';

var mongoose = require('mongoose'),
	ParkingFee = mongoose.model('ParkingFee');

exports.checkin = function(req, res) {
	res.json('hello');
};

exports.checkprice = function(req, res) {
	res.json('good bye');
};