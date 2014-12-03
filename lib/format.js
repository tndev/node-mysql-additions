var SqlString = require('mysql/lib/protocol/SqlString');

//save the original format function
var formatIndexArray = SqlString.format;

/*
This functiona allows to pass an object as value container

to insert those values into the sql query the following format is used:
::indentifier
:value
*/
var formatNamedObject = function formatNamedObject(sql, values, stringifyObjects, timeZone) {
  values = values || {};

  return sql.replace(/(::?)([a-zA-Z][a-zA-Z0-9_]*)/g, function(match, type, name) {
    /*
    TODO why was this added in the original code of the mysql library?
    
    if (!values.length) {
      return match;
    }
    */
    
    //TODO check if name is in values
    if (type === '::') {
      return SqlString.escapeId(values[name]);
    }
    
    return SqlString.escape(values[name], stringifyObjects, timeZone);
  });
};



SqlString.format = function(sql, values, stringifyObjects, timeZone) {
  if (values instanceof Array) {
    //TODO we have to check if it is array like object.
    //     only array-link or array object will work.
    return formatIndexArray.apply(this, arguments);
  } else {
    return formatNamedObject.apply(this, arguments);
  }
};