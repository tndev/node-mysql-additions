var Connection = require('mysql/lib/Connection'),
    SqlString  = require('mysql/lib/protocol/SqlString');
    
Connection.prototype.update = function(table, values, where, whereValues, cb) {
  var key,
      list = [],
      query = 'UPDATE ' + SqlString.escapeId(table) + ' SET ';

  if (typeof where !== 'string') {
    cb = where;
    where = null;
    whereValues = null;
  } else if (typeof whereValues === 'function') {
    cb = whereValues;
    whereValues = null;
  }

  for (key in values) {
    if (Object.hasOwnProperty.call(values, key)) {
      list.push(SqlString.escapeId(key) + '=' + SqlString.escape(values[key]));
    }
  }

  query += list.join(', ');

  if (where) {
    query += ' WHERE ' + this.format(where, whereValues || []);;
  }

  return this.query(query, cb);
};