'use strict';

module.exports = function(app) {
	var parkingFee = require('../controllers/parkingFeeController');

	app.route('/mall/checkin')
		.post(parkingFee.checkin);

	app.route('/mall/:id/checkprice')
		.get(parkingFee.checkprice);
}