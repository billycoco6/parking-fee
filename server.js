var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	http = require('http');

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
            }]
          }));

var parkingfees = mongoose.model('parkingfees');
parkingfees.find({mall_id: 2}, function(err, data) { console.log(err, data, data.length); });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/parkingFeeRoutes');
routes(app);

app.listen(port);

console.log('The API server started on: ' + port);