var Connection = require('mysql/lib/Connection'),
    SqlString  = require('mysql/lib/protocol/SqlString'),
    PoolConnection = require('mysql/lib/PoolConnection'),
    Pool = require('mysql/lib/Pool'),
    mysql = require('mysql'),
    Promise = require('bluebird');

Pool.prototype.getConnectionAsync = Promise.promisify(Pool.prototype.getConnection);

Pool.prototype.getConnectionDisposer = function() {
  return this.getConnectionAsync()
    .disposer(function(connection, promise) {
      console.log('release')
      connection.release();
    });
};


Connection.prototype.insert = function( table, values, cb ) {
  var query = 'INSERT INTO ' + SqlString.escapeId(table) + ' SET ';

  var insertList = [],
      keys = Object.keys(values);
  
  keys.forEach(function(key) {
    insertList.push(SqlString.escapeId(key) + '=' + SqlString.escape(values[key]));
  });
  
  query += insertList.join(', ');
  
  return this.query(query, cb);
};


Connection.prototype.update = function( table, values, where, whereValues, cb ) {
  var query = 'UPDATE ' + SqlString.escapeId(table) + ' SET ';
  
  if( typeof where !== 'string' ) {
    cb = where;
    where = null;
    whereValues = null;
  } else if( typeof whereValues === 'function' ) {
    cb = whereValues;
    whereValues = null;
  }
  
  var list = [];
  for (var key in values) {
    if (Object.hasOwnProperty.call(values, key)) {
      list.push(SqlString.escapeId(key) + '=' + SqlString.escape(values[key]));
    }
  }

  query += list.join(', ');
  
  if( where ) {
    query += ' WHERE '+this.format(where, whereValues || []);;
  }
  
  return this.query(query, cb);
};


Connection.prototype.delete = function(table, where, whereValues, cb ) {
  var query = 'DELETE FROM ' + SqlString.escapeId(table) + ' ';
  
  if( typeof where !== 'string' ) {
    cb = where;
    where = null;
    whereValues = null;
  } else if( typeof whereValues === 'function' ) {
    cb = whereValues;
    whereValues = null;
  }
  
  if( where ) {
    query += ' WHERE '+this.format(where, whereValues || []);;
  }
  
  return this.query(query, cb);
}

Connection.prototype.use = function( database, cb ) {
  this.query('USE `'+SqlString.escapeId(database)+'`',cb);
}


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


exports.enableExperimentalFeatures = function() {
  require('./experimental');
};


