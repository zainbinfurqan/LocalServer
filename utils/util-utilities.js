/**
 * Created by saad.sami on 2/26/2019.
 */
const cacheHelper = require("./util-Cache"),
  constants = require("../config/constants"),
  randomstring = require("randomstring"),
  jwtHelper = require("./utiljwt");
  
/**
 * @function @emailAttributerFormatter
 * @description return regex pattern of email attribute
 * @requires emailAttribute(String)
 * */
exports.emailAttributerFormatter = emailAttribute => {
  let regexVariable = "\\$\\$" + emailAttribute + "\\$\\$";
  return new RegExp(regexVariable, "g");
};

/**
 * @function @generateJWTToken
 * @description return jwt token
 * @requires auth(Object)
 * */

exports.generateJWTToken = async auth => {
  var JWT_object = {
    email: auth.email,
    userId: auth.userId,
    _id: auth._id
  };

  var token = jwtHelper.generateToken(
    JWT_object,
    constants.JWT_EXPIRATION_TIME
  );
  var temp_obj = {
    _id: auth.userId
  };

  await cacheHelper.initSession(
    cacheHelper.cacheInstance["session-cache"],
    token,
    temp_obj
  );

  return token;
};

/**
 * @function @queryMulti
 * @params fieldName,obj(body)
 * @description to update nested document, it merge all the body with $set
 * @requires fieldName,obj(body)
 * */
exports.queryMulti = (fieldName, obj) => {
  var updateObj = {
    $set: {}
  };
  for (var param in obj) {
    updateObj.$set[fieldName + ".$." + param] = obj[param];
  }
  return updateObj;
};

//generate 6 digit numeric code.
exports.generateCode = async (obj, type, length, session) => {
  //generate token
  var token = jwtHelper.generateToken(obj, "5m");
  // get code of 6 numeric
  let code = randomstring.generate({
    length: length,
    charset: type
  });
  //cacheSession Created in db and node cache.
  await cacheHelper.initSession(
    cacheHelper.cacheInstance[session],
    code,
    token
  );

  return code;
};
