'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

exports.test = function(req, res) {
	parkingfees.find({}).exec(function(err, result) {
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