var Connection = require('mysql/lib/Connection'),
    SqlString  = require('mysql/lib/protocol/SqlString');

Connection.prototype.delete = function(table, where, whereValues, cb) {
  var query = 'DELETE FROM ' + SqlString.escapeId(table) + ' ';

  if (typeof where !== 'string') {
    cb = where;
    where = null;
    whereValues = null;
  } else if (typeof whereValues === 'function') {
    cb = whereValues;
    whereValues = null;
  }

  if (where) {
    query += ' WHERE ' + this.format(where, whereValues || []);;
  }

  return this.query(query, cb);
};