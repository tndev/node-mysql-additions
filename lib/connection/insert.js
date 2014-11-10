var Connection = require('mysql/lib/Connection'),
    SqlString  = require('mysql/lib/protocol/SqlString');

Connection.prototype.insert = function( table, values, cb ) {
  var query = 'INSERT INTO ' + SqlString.escapeId(table) + ' SET ',
      insertList = [],
      keys = Object.keys(values);
  
  keys.forEach(function(key) {
    insertList.push(SqlString.escapeId(key) + '=' + SqlString.escape(values[key]));
  });
  
  query += insertList.join(', ');
  
  return this.query(query, cb);
};