var Connection = require('mysql/lib/Connection'),
    Pool = require('mysql/lib/Pool'),
    Promise = require('bluebird');


Pool.prototype.getConnectionAsync = Promise.promisify(Pool.prototype.getConnection);

Connection.prototype.queryAsync = Promise.promisify(Connection.prototype.query);

Connection.prototype.insertAsync = Promise.promisify(Connection.prototype.insert);
Connection.prototype.updateAsync = Promise.promisify(Connection.prototype.update);
Connection.prototype.deleteAsync = Promise.promisify(Connection.prototype.delete);

Connection.prototype.connectAsync = Promise.promisify(Connection.prototype.connect);

//Connection.prototype.changeUserAsync = Promise.promisify(Connection.prototype.changeUser);
Connection.prototype.useAsync = Promise.promisify(Connection.prototype.use);

Connection.prototype.beginTransactionAsync = Promise.promisify(Connection.prototype.beginTransaction);
Connection.prototype.commitAsync = Promise.promisify(Connection.prototype.commit);
Connection.prototype.rollbackAsync = Promise.promisify(Connection.prototype.rollback);

Connection.prototype.pingAsync = Promise.promisify(Connection.prototype.ping);
Connection.prototype.statisticsAsync = Promise.promisify(Connection.prototype.statistics);
Connection.prototype.endAsync = Promise.promisify(Connection.prototype.end);