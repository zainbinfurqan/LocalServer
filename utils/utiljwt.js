// Requiring uuid configuration
const jwt = require("jsonwebtoken"),
  secret = require("../config/keys").JWT_SECRET;

// create JWT
let generateToken = (JWT_object, expiry) => {
  return jwt.sign(JWT_object, secret, {
    expiresIn: expiry,
    issuer: "leMostre"
  });
};

let verifyToken = token => {
  return jwt.verify(token, secret, {}, function(err, decoded) {
    if (err) {
      return false;
    } else {
      return decoded;
    }
  });
};

module.exports = {
  generateToken,
  verifyToken
};
