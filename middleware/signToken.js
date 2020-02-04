const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config/secret.js');

module.exports = function(user) {
    const payload = {
      id: user.id,
      first_name: user.first_name,
      email: user.email
    };
  
    const options = {
      expiresIn: '12h'
    }
  
    return jwt.sign(payload, jwtSecret, options);
  }