"use strict";
const express = require("express");
const router = express.Router();


// routes file for authentication e.g resetPasswordFN, forgetPasswordFN, sendVerificationEmail, facebookLoginFN ,googleLoginFN
const
    { forgetPasswordFN } = require("@controllers/authentication/forgetPasswordController"),
    { resetPasswordFN } = require("@controllers/authentication/resetPasswordController"),
    { sendVerificationEmail, verifyEmailFN } = require("@controllers/authentication/verificationController"),
    { facebookLoginFN, googleLoginFN } = require("@controllers/authentication/socialLoginController");

router.post("/resetpassword", resetPasswordFN);
router.post("/forgetpassword", forgetPasswordFN);
router.post("/sendverifyemail", sendVerificationEmail);
router.post("/verifyemail", verifyEmailFN);
router.post("/facebooklogin", facebookLoginFN);
router.post("/googlelogin", googleLoginFN);


module.exports = router;
