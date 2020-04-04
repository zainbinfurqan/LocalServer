"use strict";
const express = require("express");
const router = express.Router();

// rout file for user e.g login, signup, 
const { signUpFN, } = require("@controllers/user/signUpController"),
  { loginFN, } = require("@controllers/user/LoginController"),
  { updateUserProfile } = require("@controllers/user/userController");

  //for registratio 
router.post("/registration", signUpFN);
router.post("/login", loginFN);
router.put("/", updateUserProfile);
router.delete("/", updateUserProfile);


module.exports = router;
