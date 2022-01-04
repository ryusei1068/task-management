function updateCookies(req, res, next) {
  const {token, authenticated, indiv} = req.cookies;
  const keys = Object.keys(req.cookies);
  if (token === "" || authenticated === "" || indiv === "") {
    keys.forEach(key => { res.cookie(key, "", {maxAge : 0}); });
    return res.sendStatus(401);
  }
  const oneHour = 60 * 60 * 1000;
  keys.forEach(key => {
    res.cookie(
      key, 
      req.cookies[key], 
      {
        httpOnly : key === "authenticated" ? false : true,
        maxAge : oneHour,
        secure : true,
        sameSite : "lax"
      }
    )
  });
  next();
}

module.exports = updateCookies;
