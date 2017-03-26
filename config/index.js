// json obj
var configValues = require('./config');

module.exports = {
  
  getDbConnectionString: function() {
    return 'mongodb://' + configValues.username + ':' + configValues.password + '@ds035740.mlab.com:35740/nodetodosample';
  }
  
}