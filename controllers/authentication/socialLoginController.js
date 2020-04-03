const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const { responseWrapper } = require("@utils/utilresponse");
const UserSchema = require("@models/user/User");
const keys = require("../../config/keys");


/**
 * facebookLoginFN function use to register user with facebook info 
 * @params sting access token , number user id , string full name
 */
exports.facebookLoginFN = async (req, res, next) => {
  try {
    const validationResponse = validation(req.body);
    if (validationResponse.length) {
      throw validationResponse;
    }

    let userResult = await fetch(
      `https://graph.facebook.com/v6.0/${req.body.userId}?fields=id,name,email,gender&access_token=${req.body.accessToken}`
    ).then(res => res.json());
    req.body.email = userResult.email;
    // req.body.firstName = userResult.name;
    req.body.firstName = name[0];
    req.body.lastName = name[1];
    req.body.gender = userResult.gender;
    req.body.emailVerified = true

    const payload = { ...req.body };

    console.log(payload);

    const user = new UserSchema(payload);

    await user.save();
    const tokenObj = {
      _id: user._id
    };

    const token = await jwt.sign(tokenObj, keys.JWT_SECRET);

    const response = {
      ...user.getPublicProfile(),
      token
    };

    const responseToSend = responseWrapper(
      `${req.body.role} register successfully`,
      response
    );

    res.status(200).json(responseToSend);
  } catch (e) {
    next({ message: e });
  }
};

exports.googleLoginFN = async (req, res, next) => {
  try {
    const validationResponse = validation(req.body);
    if (validationResponse.length) {
      throw validationResponse;
    }
  } catch (e) {
    next({ message: e });
  }
};

function validation(body) {
  const errors = [];
  if (!body.accessToken) {
    errors.push("Access Token is required");
  }
  if (!body.userId) {
    errors.push("User ID is required");
  }
  return errors;
}
