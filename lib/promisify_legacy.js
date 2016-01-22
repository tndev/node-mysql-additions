var Promise = require('bluebird');

function promisify_mysql_legacy(func) {

  return function() {
    var args = Array.prototype.splice.call(arguments,0);

    return new Promise( (resolve, reject ) => {
      args.push(function(err, res, info) {
        if( err ) {
          reject(err);
        } else {
          var args = res;
          if( info ) {
            //mimic the behaviour of bluebird 3.x library
            resolve([res, info]);
          } else {
            resolve(args);
          }
          
        }
      });
  
      func.apply(this, args);
    });
  }
}


module.exports = promisify_mysql_legacy;