'use strict';
var mongoose = require('mongoose'),
  parkingfees = mongoose.model('parkingfees'),
	http = require('http'),
  moment = require('moment');

  exports.checkprice = function(req, res) {
    parkingfees.find({mall_id: req.params.mall_id}, function(err, data) {
      if (err)
        return res.send(err);

      var current_fee = 0;

      var entry_time = moment(data[0].entry_time);
      var current_time = moment(req.query.currentTime);
      var parking_time = current_time.diff(entry_time, 'minutes');

      var rate_array_length = data[0].rate.length - 1;

      var test = {
        entry_time: entry_time,
        current_time: current_time,
        parking_time: parking_time
      };

      if (parking_time < data[0].free_duration) {
        return res.json("Current fee = " + current_fee);
      }

      // Whether the mins exceed the hour limit
      if (parking_time%60 > data[0].rounding_time) {
        parking_time += 60 - (parking_time%60);
      }
      else {
        parking_time -= parking_time%60;
      }

      if (parking_time > data[0].rate[rate_array_length].duration) {
        var exceed_hour = parking_time - data[0].rate[rate_array_length].duration;
        current_fee += data[0].rate[rate_array_length].cost;
        current_fee += (exceed_hour/60) * data[0].long_hour_fee;
        return res.json("Current fee = " + current_fee);
      }
      else {
        for (var each_rate of data[0].rate) {
          if (parking_time <= each_rate.duration) {
            return res.json("Current fee = " + each_rate.cost);
            break;
          }
        }
      }
    });
  };

  exports.checkin = function(req, res) {
    parkingfees.find({mall_id: req.params.mall_id}, function(err, data) {
      if (err)
        res.send(err);
      data[0].entry_time = new Date(req.body.entryTime);

      data[0].save(function(err) {
        if (err)
          res.send(err);

        return res.json("Checkin completed");
      });
    });
  };
