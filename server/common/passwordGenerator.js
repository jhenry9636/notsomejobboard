var crypto = require('crypto');
var bcrypt = require('bcryptjs');

module.exports = function() {
  return {
    generateHash: function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(15), null);
    },
    validPassword: function(currentPassword, savedPassword) {
      return bcrypt.compareSync(currentPassword, savedPassword);
    }
  }
}