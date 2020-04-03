"use strict";
var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var cacheSchema = new Schema({
  key: String,
  value: {},
  expireTime: { type: Date }
});

module.exports = mongoose.model("cache", cacheSchema);
