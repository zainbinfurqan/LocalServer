"use strict";
var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var VerificationSchema = new Schema({

    // email: {
    //     type: String,
    //     required: [true, "Email is required"],
    //     unique: true,
    //     lowercase: true
    // },
    code: {
        type: Number,
        required: true
        // required: [true, "Password is required"],
        // select: false
    },
    expireTime: {
        type: Date,
        required: true
    },
    sourceType: {
        type: String,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model("VerificationSchema", VerificationSchema);
