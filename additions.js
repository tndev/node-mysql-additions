var Connection = require('mysql/lib/Connection'),
    SqlString  = require('mysql/lib/protocol/SqlString'),
    PoolConnection = require('mysql/lib/PoolConnection'),
    Pool = require('mysql/lib/Pool'),
    mysql = require('mysql'),
    Promise = require('bluebird'),
    deprecate = require('depd')('mysql-additions');



Pool.prototype.getConnectionDisposer = function() {
  return this.getConnectionAsync()
    .disposer(function(connection, promise) {
      console.log('release')
      connection.release();
    });
};

//TODO warn about auto features
require('./lib/connection/insert');
require('./lib/connection/update');
require('./lib/connection/delete');
require('./lib/connection/use');

var legacyPromiseDefault = true;

require('./lib/promisify').promisify({
  autoWarn : true,
  legacyPromise: legacyPromiseDefault
});

exports.enableExperimentalFeatures = deprecate.function(function() {
  require('./experimental');
},'use require(\'mysql-additions\').enable({experimental:true}) instead');



exports.enable = function(options) {
  options = options||{};
  if( options.experimental ) {
    require('./experimental');
  }
  
  
  if( options.legacyPromise === undefined ) {
    deprecate('setting options.legacyPromise is required for transition');
    options.legacyPromise = legacyPromiseDefault;
  } 
  
  if( options.legacyPromise !== false ) {
    options.legacyPromise = true;
  }
  
  require('./lib/promisify').promisify({
    legacyPromise: options.legacyPromise
  });
};

//TODO it should be possible to detect legacy promise

