"use strict";
var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var chatting = new Schema({

    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    roomId: { type: Schema.Types.ObjectId, ref: 'room' },
    message: { type: String },
    deletedBy: [
        { type: Schema.Types.ObjectId, ref: 'user' }
    ]

}, { timestamps: true });

module.exports = mongoose.model("chatting", chatting);
