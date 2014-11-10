var Connection = require('mysql/lib/Connection'),
    SqlString  = require('mysql/lib/protocol/SqlString');
    
Connection.prototype.use = function(database, cb) {
  this.query('USE ' + SqlString.escapeId(database), cb);
};
