'use strict';
var mongoose = require('mongoose');

var parkingfees = new mongoose.Schema({
                    mall_id: Number,
                    mall_name: String,
                    rounding_time: Number,
                    long_hour_fee: Number,
                    free_duration: Number,
                    rate: [{
                      duration: Number,
                      cost: Number
                    }],
                    entry_time: { type: Date }
                  });

module.exports = mongoose.model('parkingfees', parkingfees);
