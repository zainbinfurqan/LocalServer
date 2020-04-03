const jwt = require("jsonwebtoken");
const mongodb = require("mongodb")
const { responseWrapper } = require("@utils/utilresponse");
const UserSchema = require("@models/user/User");
const CacheSchema = require("@models/cache");
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const consts = require('../../config/constants')



/**
 * signUpFN function use to signup 
 * @params string(first and last name , email, password, phone )
 */
exports.signUpFN = async (req, res, next) => {
  try {
    const validationResponse = validation(req.body);

    if (validationResponse.length) {
      throw validationResponse;
    }

    const payload = { ...req.body };

    const salt = await bcrypt.genSalt(keys.SALT);

    payload.password = await bcrypt.hash(payload.password, salt);

    const user = new UserSchema(payload);

    await user.save();

    const tokenObj = { _id: user._id };

    const token = await jwt.sign(tokenObj, keys.JWT_SECRET, { expiresIn: consts.JWT_EXPIRATION_TIME });

    const response = {
      ...user.getPublicProfile(),
      token
    };

    let expireTime = new Date();

    expireTime.setHours(expireTime.getHours() + 2);

    let obj = {
      key: token,
      expireTime,
      value: user._id
    }


    let cache = new CacheSchema(obj);

    await cache.save();

    const responseToSend = responseWrapper(
      `${req.body.role} register successfully`,
      response
    );

    res.status(200).json(responseToSend);
  } catch (e) {
    next({ message: e });
  }
};

function validation(body) {
  const errors = [];

  if (!body.firstName) {
    errors.push("First Name is required");
  }

  if (!body.lastName) {
    errors.push("Last Name is required");
  }

  if (!body.password) {
    errors.push("Password is required");
  }

  if (!body.phoneNo) {
    errors.push("Phone number is required");
  }

  if (!body.email) {
    errors.push("email is required");
  }



  return errors;
}
