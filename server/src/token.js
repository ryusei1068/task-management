const jwt = require('jsonwebtoken');

function generateAccessToken(username) {
  return jwt.sign(username, "CZUxPwaQupWkiUzKELZ49eM7oW");
}

module.exports = generateAccessToken;
