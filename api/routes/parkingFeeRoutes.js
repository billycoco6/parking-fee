'use strict';

module.exports = function(app) {
	var parkingFee = require('../controllers/parkingFeeController');

	app.route('/')
		.get(parkingFee.test);

	app.route('/mall/:mall_id/checkin')
		.post(parkingFee.checkin);

	app.route('/mall/:mall_id/checkprice')
		.get(parkingFee.checkprice);
}