'use strict';
module.exports = function(app) {
  var parkingController = require('./controllers/parkingController');

  app.route('/mall/:mall_id/checkprice')
    .get(parkingController.checkprice);

  app.route('/mall/:mall_id/checkin')
    .post(parkingController.checkin);
};
