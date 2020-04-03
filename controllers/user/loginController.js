const
  { responseWrapper } = require("@utils/utilresponse"),
  UserSchema = require("@models/user/User"),
  bcrypt = require("bcryptjs"),
  CacheSchema = require("@models/cache"),
  jwt = require("jsonwebtoken"),
  consts = require('../../config/constants'),
  keys = require("../../config/keys");


/**
 * loginFN function use to login 
 * @params sting email, strinf password
 */
exports.loginFN = async (req, res, next) => {

  try {
    const validationResponse = validation(req.body);

    if (validationResponse.length) {
      throw validationResponse;
    }

    let query = {
      email: req.body.email,
      isBlocked: false, isDeleted: false
    }
    const userResult = await UserSchema.findOne(query).select("+password")

    if (!userResult) {
      throw new Error("invalid email or password")
    }

    let passwordIsValid = bcrypt.compareSync(req.body.password, userResult.password);

    if (!passwordIsValid) {
      throw new Error("invalid email or password")
    }

    const tokenObj = {
      _id: userResult._id
    };

    const token = await jwt.sign(tokenObj, keys.JWT_SECRET, { expiresIn: consts.JWT_EXPIRATION_TIME });

    const response = {
      ...userResult.getPublicProfile(),
      token
    };

    let expireTime = new Date();

    expireTime.setHours(expireTime.getHours() + 2);

    let obj = {
      key: token,
      expireTime,
      value: userResult._id
    }

    let cache = new CacheSchema(obj);

    await cache.save();

    const responseToSend = responseWrapper(
      `${userResult.role} login Successfully`,
      response
    );

    res.status(203).json(responseToSend);

    (203).json(responseToSend);

  } catch (e) {
    next({ message: e });

  }
};


function validation(body) {
  const errors = [];


  if (!body.email) {
    errors.push("Email is required");
  }


  if (!body.password) {
    errors.push("Password is required");
  }

  return errors;
}
