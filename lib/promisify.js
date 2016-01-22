var Connection = require('mysql/lib/Connection'),
    Pool = require('mysql/lib/Pool'),
    Promise = require('bluebird');


var promisify_mysql_legacy = require('./promisify_legacy');


Pool.prototype.getConnectionAsync = promisify_mysql_legacy(Pool.prototype.getConnection);

Connection.prototype.queryAsync = promisify_mysql_legacy(Connection.prototype.query);

Connection.prototype.insertAsync = promisify_mysql_legacy(Connection.prototype.insert);
Connection.prototype.updateAsync = promisify_mysql_legacy(Connection.prototype.update);
Connection.prototype.deleteAsync = promisify_mysql_legacy(Connection.prototype.delete);

Connection.prototype.connectAsync = promisify_mysql_legacy(Connection.prototype.connect);

//Connection.prototype.changeUserAsync = promisify_mysql(Connection.prototype.changeUser);
Connection.prototype.useAsync = promisify_mysql_legacy(Connection.prototype.use);

Connection.prototype.beginTransactionAsync = promisify_mysql_legacy(Connection.prototype.beginTransaction);
Connection.prototype.commitAsync = promisify_mysql_legacy(Connection.prototype.commit);
Connection.prototype.rollbackAsync = promisify_mysql_legacy(Connection.prototype.rollback);

Connection.prototype.pingAsync = promisify_mysql_legacy(Connection.prototype.ping);
Connection.prototype.statisticsAsync = promisify_mysql_legacy(Connection.prototype.statistics);
Connection.prototype.endAsync = promisify_mysql_legacy(Connection.prototype.end);