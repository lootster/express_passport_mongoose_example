const jwt = require("express-jwt");
const secret = require("../config").secret;

function getTokenFromCookie(req) {
  let token = null;
  if (req && req.cookies) token = req.cookies["jwt"];
  return token;
}

module.exports = {
  required: jwt({
    secret: secret,
    userProperty: "jwt",
    getToken: getTokenFromCookie
  }),
  optional: jwt({
    secret: secret,
    userProperty: "jwt",
    credentialsRequired: false,
    getToken: getTokenFromCookie
  })
};
