var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	http = require('http');

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://billy:1234@ds111489.mlab.com:11489/heroku_0jk9k8r3');

var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://billy:1234@ds111489.mlab.com';

var theport = process.env.PORT || 5000;

mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });
mongoose.model('parkingfees',
          new Schema({
            mall_id: Number,
            mall_name: String,
            rounding_time: Number,
            fee_period: Number,
            long_hour_fee: Number,
            rate: [{
              duration: Number,
              cost: Number
            }]
          }), 'parkingfees');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/parkingFeeRoutes');
routes(app);

app.listen(port);

console.log('The API server started on: ' + port);