var Promise = require('bluebird');


//this should be the new default behaviour
function promisify_mysql_new(func) {
  return function() {
    var args = Array.prototype.splice.call(arguments,0);

    return new Promise( (resolve, reject ) => {
      
      args.push(function(err, res, info) {
        if( err ) {
          reject(err);
        } else {
          if( info ) {
            res.info = info;
          }
          resolve(res);
        }
      });
  
      func.apply(this, args);
    });
  }
}



module.exports = promisify_mysql_new;