'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

exports.test = function(req, res) {
	var parkingfees = mongoose.model('parkingfees');
	res.json("hello");
};

exports.checkin = function(req, res) {
	var mall_id = request.params.mall_id;
	res.json("hello");
};

exports.checkprice = function(req, res) {
	var mall_id = request.params.mall_id;
};