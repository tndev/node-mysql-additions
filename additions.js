var Connection = require('mysql/lib/Connection'),
    SqlString  = require('mysql/lib/protocol/SqlString'),
    PoolConnection = require('mysql/lib/PoolConnection'),
    Pool = require('mysql/lib/Pool'),
    mysql = require('mysql'),
    Promise = require('bluebird');



Pool.prototype.getConnectionDisposer = function() {
  return this.getConnectionAsync()
    .disposer(function(connection, promise) {
      console.log('release')
      connection.release();
    });
};


require('./lib/connection/insert');
require('./lib/connection/update');
require('./lib/connection/delete');
require('./lib/connection/use');
require('./lib/promisify');


exports.enableExperimentalFeatures = function() {
  require('./experimental');
};


