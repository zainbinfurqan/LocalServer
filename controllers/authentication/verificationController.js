const { _responseWrapper } = require("@utils/utilresponse");
const VerificationSchema = require("@models/authentication/Verification");
const randomstring = require("randomstring");
const keys = require("../../config/keys");
const { sendMailFN } = require("../../utils/nodemailer");
// const client = require('twilio')(keys.ACCOUNTSID, keys.AUTHTOKEN);

// this function not in use currently//
exports.sendVerificationEmail = async (req, res, next) => {
  try {
    const validationResponse = validation(req.body);
    if (validationResponse.length) {
      throw validationResponse;
    }
    req.body.code = randomstring.generate(8);
    let response = await sendMailFN(req.body.email, req.body.code);
    // const verificationResponse = new UserSchema(req.body);

    // await user.save();

    const responseToSend = _responseWrapper(` code send successfully`);
    res.status(200).json(responseToSend);
  } catch (e) {
    next({ message: e });
  }
};

/**
 * sendVerificationCodeEmail function use to send system generated code to user input email for verify authentiate email,
 * @params sting email
 */
exports.sendVerificationCodeEmail = async (email, next) => {
  try {
    // let code = randomstring.generate(8);
    let code = Math.round(Math.random() * 1000000);

    let query = {
      code
    };


    let sendMailResponse = await sendMailFN(email, code, next);

    if (!sendMailResponse) {
      throw new Error("error ");
    }

    let codeIsValid = await VerificationSchema.findOne(query);

    if (!codeIsValid) {
      let expireTime = new Date();

      expireTime.setHours(expireTime.getHours() + 2);

      let payload = {
        code,
        expireTime,
        sourceType: "email"
      };
      let verificationCode = new VerificationSchema(payload);

      await verificationCode.save();

      return true;
    }
    sendVerificationCode();
  } catch (e) {
    next({ message: e });
  }
};

exports.sendVerificationCodeNumber = async (phoneNo, next) => {
  try {

  } catch (error) {

  }
  let smsResponse = await client.messages
    .create({
      body: `HCSM number verification code ${req.body.code}`,
      from: '+14154633870',
      to: `+${phoneNo}`
    });
}

exports.verifyEmailFN = async (req, res, next) => {
  try {
    console.log(req.body)

    let query = {
      // $match: {
      expireTime: { $lte: req.body.date },
      code: req.body.code
      // }
    }
    console.log(query)

    let verifyResult = await VerificationSchema.findOne(query).select("+code");
    console.log(verifyResult)
    res.status(200).json('');

  } catch (e) {
    next({ message: e });
  }
}

function validation(body) {
  const errors = [];
  if (!body.email) {
    errors.push("Email is required");
  }
  return errors;
}
