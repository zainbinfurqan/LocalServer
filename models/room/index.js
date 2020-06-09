"use strict";
var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var room = new Schema({

    users: [
        { type: Schema.Types.ObjectId, ref: 'user' }
    ],
    deletedBy: [
        { type: Schema.Types.ObjectId, ref: 'user' }
    ]

}, { timestamps: true });

module.exports = mongoose.model("room", room);
