const { responseWrapper } = require("@utils/utilresponse"),
  UserSchema = require("@models/user/User"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  keys = require("../../config/keys");


  /**
 * resetPasswordFN function use to reset the password incase user want to chnage password
 * @params sting email , string old password , string new password
 */
exports.resetPasswordFN = async (req, res, next) => {
  try {
    const validationResponse = validation(req.body);
    if (validationResponse.length) {
      throw validationResponse;
    }

    let query = {
      email: req.body.email
    };

    let userResult = await UserSchema.findOne(query).select("+password");

    if (!userResult) {
      throw new Error("invalid email or password");
    }
    let passwordIsValid = bcrypt.compareSync(
      req.body.oldPassword,
      userResult.password
    );

    if (!passwordIsValid) {
      throw new Error("invalid old password");
    }

    const salt = await bcrypt.genSalt(keys.SALT);

    req.body.password = await bcrypt.hash(req.body.newPassword, salt);

    userResult.password = await bcrypt.hash(req.body.newPassword, salt);

    userResult.lastPasswordChange = new Date();

    await userResult.save();

    const responseToSend = responseWrapper(`password reset`);

    res.status(200).json(responseToSend);
  } catch (e) {
    next({ message: e });
  }
};
function validation(body) {
  const errors = [];
  if (!body.oldPassword) {
    errors.push("Old Passowrd is required");
  }
  if (!body.newPassword) {
    errors.push("New Password is required");
  }
  return errors;
}
