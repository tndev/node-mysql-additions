var Connection = require('mysql/lib/Connection');
var SqlString  = require('mysql/lib/protocol/SqlString');

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