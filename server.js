var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	http = require('http');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://billy:1234@ds111489.mlab.com:11489/heroku_0jk9k8r3');
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
            }],
            entry_time: { type: Date }
          }));

var parkingfees = mongoose.model('parkingfees');
// parkingfees.find({}, function(err, data) { console.log(err, data, data.length); });

// var routes = require('./api/routes/parkingFeeRoutes');
// routes(app);

var router = express.Router();

router.use(function(req, res, next) {
    console.log('===== Router =====');
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
    res.json(data);
  });
});

router.post('/mall/:mall_id/checkin', function(req, res) {
  parkingfees.find({mall_id: req.params.mall_id}, function(err, data) {
    if (err)
      res.send(err);
    // data.entry_time = req.body.entryTime;

    // data.save(function(err) {
    //   if (err)
    //     res.send(err);

    //   res.json("Checkin completed");
    // });
    res.json("Checkin completed");
  });
});


app.use(router);
app.listen(port);

console.log('The API server started on: ' + port);