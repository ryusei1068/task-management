function updateCookies(req, res, next) {
  const {token, indiv, authenticated} = req.cookies;
  if (token === null || indiv === null || authenticated === null)
    return res.sendStatus(401);
  const oneHour = 60 * 60 * 1000;
  const keys = Object.keys(req.cookies);
  keys.forEach(key => {res.cookie(key, req.cookies[key], {
                 httpOnly : key === "authenticated" ? false : true,
                 maxAge : oneHour,
                 secure : true,
                 sameSite : "lax"
               })});
  next();
}

module.exports = updateCookies;
