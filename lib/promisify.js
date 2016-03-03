var Connection = require('mysql/lib/Connection'),
    Pool = require('mysql/lib/Pool'),
    Promise = require('bluebird'),
    deprecate = require('depd')('mysql-additions');


exports.promisify = function(options) {
  
  var promisify_mysql;
  
  if( options.legacyPromise ) {
    promisify_mysql = require('./promisify_legacy');
  } else {
    promisify_mysql = require('./promisify_new');
  }
  
  if( options.autoWarn ) {
    var org_promisify_mysql = promisify_mysql;
    promisify_mysql = function() {
      return deprecate.function(org_promisify_mysql.apply(this,arguments), 'automatic promisification is deprecated, call require(\'mysql-additions\').enable() instead');
    }
  }
  

  Pool.prototype.getConnectionAsync = promisify_mysql(Pool.prototype.getConnection);

  Connection.prototype.queryAsync = promisify_mysql(Connection.prototype.query);

  Connection.prototype.insertAsync = promisify_mysql(Connection.prototype.insert);
  Connection.prototype.updateAsync = promisify_mysql(Connection.prototype.update);
  Connection.prototype.deleteAsync = promisify_mysql(Connection.prototype.delete);

  Connection.prototype.connectAsync = promisify_mysql(Connection.prototype.connect);

  //Connection.prototype.changeUserAsync = promisify_mysql(Connection.prototype.changeUser);
  Connection.prototype.useAsync = promisify_mysql(Connection.prototype.use);

  Connection.prototype.beginTransactionAsync = promisify_mysql(Connection.prototype.beginTransaction);
  Connection.prototype.commitAsync = promisify_mysql(Connection.prototype.commit);
  Connection.prototype.rollbackAsync = promisify_mysql(Connection.prototype.rollback);

  Connection.prototype.pingAsync = promisify_mysql(Connection.prototype.ping);
  Connection.prototype.statisticsAsync = promisify_mysql(Connection.prototype.statistics);
  Connection.prototype.endAsync = promisify_mysql(Connection.prototype.end);
};



