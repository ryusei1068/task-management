const generateToken = require("./token");
const {v4 : uuidv4} = require("uuid");

function issueCookie(id, username) {
  const token = generateToken({username : username});
  const uuid = uuidv4();
  return {"authenticated" : uuid, "token" : token, "indiv" : id};
}

module.exports = issueCookie;
