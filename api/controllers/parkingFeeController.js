'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

exports.test = function(req, res) {
	var parkingfees = mongoose.model('parkingfees');
	// parkingfees.find({}, function(err, data) { console.log(err, data, data.length); });
  	db.collection(parkingfees).find({}).toArray(function(err, docs) {
   		if (err) {
     		handleError(res, err.message, "Failed to get docs.");
    	} else {
      		res.status(200).json(docs);
    	}
  	});
};

exports.checkin = function(req, res) {
	var mall_id = request.params.mall_id;
	res.json("hello");
};

exports.checkprice = function(req, res) {
	var mall_id = request.params.mall_id;
};