var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://billy:1234@ds111489.mlab.com:11489/heroku_0jk9k8r3');
mongoose.connect('mongodb://localhost/Parkingdb');
require('./api/models/parkingModel');

var routes = require('./api/routes');
routes(app);

app.listen(port);

console.log('The API server started on: ' + port);
