"use strict";
var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var ConfigSchema = new Schema({
  isMaintenance: {
    type: Boolean,
    default: false
  },
  categoryLimit: {
    type: Number,
    default: 2
  },
  maxMinuCall: {
    type: String,
    default: '120 min'
  },
  minMinuFreeCall: {
    type: String,
    default: '2 min'
  }
}, { timestamps: true });

module.exports = mongoose.model("ConfigSchema", ConfigSchema);
