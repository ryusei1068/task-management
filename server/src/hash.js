const crypto = require('crypto');

function hashing(password) {
  return crypto.
    createHmac('sha256', password).
    update("I love ice cream").
    digest("hex");
}

module.exports = hashing;
