

const mongoose = require("mongoose"),
    { responseWrapper } = require("@utils/utilresponse"),
    UserSchema = require("@models/user/User");


/**
* updateUserProfile function use to udpate profile  
* @params 
*/
exports.updateUserProfile = async (req, res, next) => {

    try {
        // const validationResponse = validation(req.body);
        // if (validationResponse.length) {
        //     throw validationResponse;
        // }

        const payload = { ...req.body };

        let query = {
            _id: mongoose.Types.ObjectId(payload.userId)
        }

        let updateObject = {
            paylaod
        }

        let updateUser = await UserSchema.findOneAndUpdate(query, updateObject, { new: true })

        if (updateUser.length > 0) {
            const responseToSend = _responseWrapper(
                `info update`,
            );

            res.status(200).json(responseToSend);

        }

        res.status(200).json(`somthing went wrong`);

    } catch (e) {
        next({ message: e });
    }


}

exports.deleteUserProfileFN = async (req, res, next) => {
    try {

        const payload = { ...req.body };

        let query = {
            _id: mongoose.Types.ObjectId(payload.userId)
        }

        let updateObject = {
            isDeleted: true
        }

        let updateUser = await UserSchema.findOneAndUpdate(query, updateObject, { new: true })

        if (updateUser.length > 0) {
            const responseToSend = _responseWrapper(
                `user delete`,
            );

            res.status(200).json(responseToSend);

        }

    } catch (error) {
        next({ message: e });
    }
}


function validation(body) {
    const errors = [];

    if (!body.firstName) {
        errors.push("First Name is required");
    }

    if (!body.lastName) {
        errors.push("Last Name is required");
    }

    if (!body.phoneNo) {
        errors.push("Phone number is required");
    }
    return errors;
}
