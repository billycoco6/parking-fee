var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	http = require('http'),
  moment = require('moment');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://billy:1234@ds111489.mlab.com:11489/heroku_0jk9k8r3');
// mongoose.connect('mongodb://localhost/Parkingdb')

mongoose.model('parkingfees',
          new mongoose.Schema({
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
          }));

var parkingfees = mongoose.model('parkingfees');

var router = express.Router();

router.use(function(req, res, next) {
    next();
});

router.get('/', function(req, res) {
  parkingfees.find({}, function(err, data) { 
    if (err)
      res.send(err);
    res.json(data);
  });
});

router.get('/mall/:mall_id/checkprice', function(req, res) {
  parkingfees.find({mall_id: req.params.mall_id}, function(err, data) {
    if (err)
      res.send(err);
    
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
      res.json("Current fee = " + current_fee);
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
      res.json("Current fee = " + current_fee);
    }
    else {
      for (var each_rate of data[0].rate) {
        console.log(each_rate.duration);
        if (parking_time <= each_rate.duration) {
          res.json("Current fee = " + each_rate.cost);
          break;
        }
      }
    }
  });
});


router.post('/mall/:mall_id/checkin', function(req, res) {
  parkingfees.find({mall_id: req.params.mall_id}, function(err, data) {
    if (err)
      res.send(err);
    data[0].entry_time = new Date(req.body.entryTime);

    data[0].save(function(err) {
      if (err)
        res.send(err);

      res.json("Checkin completed");
    });
  });
});


app.use(router);
app.listen(port);

console.log('The API server started on: ' + port);