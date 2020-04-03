const
    { responseWrapper } = require("@utils/utilresponse"),
    UserSchema = require("@models/user/User"),
    bcrypt = require("bcryptjs"),
    keys = require("../../config/keys"),
    { sendVerificationCodeEmail } = require('../../controllers/authentication/verificationController');


/**
 * forgetPasswordFN function use to reset the password in case user forget the password and wan to chnage it
 * function recieve email and after email valid code will be send to email 
 * @params sting email 
 */
exports.forgetPasswordFN = async (req, res, next) => {
    try {
        const validationResponse = validation(req.body);

        if (validationResponse.length) {
            throw validationResponse;
        }

        let query = {
            email: req.body.email
        }

        let userResult = await UserSchema.findOne(query);

        if (!userResult) {
            throw new Error("email invalid")
        }

        // let emailSendCode = sendVerificationCodeEmail(req.body.email)

        // if (!emailSendCode) {
        //     throw new Error("email invalid")
        // }

        const responseToSend = responseWrapper(
            `code has been send to this email`,
        );
        res.status(200).json(responseToSend);



    } catch (e) {
        next({ message: e });
    }
}


exports.resetPasswordFN = async (erq, res, next) => {
    try {
        const validationResponse = validation(req.body);

        if (validationResponse.length) {
            throw validationResponse;
        }

        let query = {
            email: req.body.email
        }

        let userResult = await UserSchema.findOne(query);

        if (!userResult) {
            throw new Error("email invalid")
        }

        const salt = await bcrypt.genSalt(keys.SALT);

        payload.password = await bcrypt.hash(payload.password, salt);

        let query = {
            _id: mongoose.Types.ObjectId(userResult._id)
        }

        let updateObject = {
            password: payload.password
        }

        let updateUser = await UserSchema.findOneAndUpdate(query, updateObject, { new: true })

        if (updateUser.length > 0) {
            const responseToSend = _responseWrapper(
                `password reset `,
            );

            res.status(200).json(responseToSend);

        }

    } catch (e) {
        next({ message: e });
    }
}

function validation(body) {
    const errors = [];
    if (!body.email) {
        errors.push("email is required");
    }
    return errors;
}