const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const {token} = req.cookies;
  if (token === null) 
    return res.sendStatus(401);

  jwt.verify(token, "CZUxPwaQupWkiUzKELZ49eM7oW", (err, docoded) => {
    if (err) return res.sendStatus(403);

    next()
  })
}

module.exports = authenticateToken;
