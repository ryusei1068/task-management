function updateCookies(req, res, next) {
	const { token, indiv, authenticated } = req.cookies;
	if (token === null || indiv === null || authenticated === null) return res.sendStatus(401);
  const oneHour = 60 * 60 * 1000;
  res.cookie('token', token, { httpOnly: true , maxAge: oneHour, secure: true, sameSite: "lax" });
  res.cookie("indiv", indiv, { httpOnly: true, maxAge: oneHour, secure: true, sameSite: "lax" });
  res.cookie("authenticated", authenticated, { maxAge: oneHour, secure: true, sameSite: "lax" });
	next();
}

module.exports = updateCookies;
